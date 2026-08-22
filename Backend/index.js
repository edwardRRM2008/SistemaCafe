import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/userLogin.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000
let mongoConnectionPromise

const connectToDatabase = async () => {
	if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
		throw new Error('Configura MONGO_URI y JWT_SECRET en Backend/.env')
	}

	if (mongoose.connection.readyState === 1) {
		return
	}

	if (!mongoConnectionPromise) {
		mongoConnectionPromise = mongoose.connect(process.env.MONGO_URI).catch((error) => {
			mongoConnectionPromise = undefined
			throw error
		})
	}

	await mongoConnectionPromise
}

app.use(async (_request, _response, next) => {
	try {
		await connectToDatabase()
		next()
	} catch (error) {
		next(error)
	}
})

app.use(cors({ origin: process.env.FRONTEND_URL || 'https://sistema-cafe-liard.vercel.app/' }))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

app.get('/api/health', (_request, response) => {
	response.json({ message: 'CafeAndino API activa' })
})

if (process.env.NODE_ENV !== 'production') {
	connectToDatabase()
		.then(() => {
			app.listen(PORT, () => {
				console.log(`API escuchando en http://localhost:${PORT}`)
			})
		})
		.catch((error) => {
			console.error(`No se pudo iniciar la API: ${error.message}`)
			process.exit(1)
		})
}

export default app
