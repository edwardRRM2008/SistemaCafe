import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const router = express.Router()

const createToken = (user) =>
	jwt.sign(
		{ id: user._id.toString(), role: user.role },
		process.env.JWT_SECRET,
		{ expiresIn: '1d' },
	)

const userResponse = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	role: user.role,
})

// Middleware reutilizable para cualquier endpoint privado.
export const authenticate = async (request, response, next) => {
	try {
		const authorization = request.headers.authorization
		const token = authorization?.startsWith('Bearer ')
			? authorization.split(' ')[1]
			: null

		if (!token) {
			return response.status(401).json({ message: 'Token requerido' })
		}

		const payload = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(payload.id)

		if (!user) {
			return response.status(401).json({ message: 'Usuario no encontrado' })
		}

		request.user = user
		next()
	} catch {
		response.status(401).json({ message: 'Token invalido o expirado' })
	}
}

router.post('/register', async (request, response) => {
	try {
		const { name, email, password } = request.body
		if (!name || !email || !password) {
			return response.status(400).json({ message: 'Todos los campos son requeridos' })
		}

		const existingUser = await User.findOne({ email: email.toLowerCase() })
		if (existingUser) {
			return response.status(409).json({ message: 'El correo ya esta registrado' })
		}

		const user = await User.create({ name, email, password })
		response.status(201).json({ token: createToken(user), user: userResponse(user) })
	} catch {
		response.status(500).json({ message: 'No se pudo crear el usuario' })
	}
})

router.post('/login', async (request, response) => {
	try {
		const { email, password } = request.body
		const user = await User.findOne({ email: email?.toLowerCase() }).select('+password')

		if (!user || !(await user.comparePassword(password || ''))) {
			return response.status(401).json({ message: 'Correo o contrasena incorrectos' })
		}

		response.json({ token: createToken(user), user: userResponse(user) })
	} catch {
		response.status(500).json({ message: 'No se pudo iniciar sesion' })
	}
})

router.get('/me', authenticate, (request, response) => {
	response.json({ user: userResponse(request.user) })
})

export default router
