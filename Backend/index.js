import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/userLogin.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

app.get('/api/health', (_request, response) => {
	response.json({ message: 'CafeAndino API activa' })
})

const startServer = async () => {
	if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
		throw new Error('Configura MONGO_URI y JWT_SECRET en Backend/.env')
	}

	await mongoose.connect(process.env.MONGO_URI)
	app.listen(port, () => {
		console.log(`API escuchando en http://localhost:${port}`)
	})
}

startServer().catch((error) => {
	console.error(`No se pudo iniciar la API: ${error.message}`)
	process.exit(1)
})
