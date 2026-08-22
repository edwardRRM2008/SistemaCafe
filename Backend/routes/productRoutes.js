import express from 'express'
import Product from '../models/productModel.js'
import { authenticate } from './userLogin.js'

const router = express.Router()
router.use(authenticate)

const productResponse = (product) => ({
  id: product._id,
  name: product.name,
  price: product.price,
  stock: product.stock,
  category: product.category,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
})

router.get('/', async (request, response) => {
  try {
    const products = await Product.find({ user: request.user._id }).sort({ createdAt: -1 })
    response.json({ products: products.map(productResponse) })
  } catch {
    response.status(500).json({ message: 'No se pudieron cargar los productos' })
  }
})

router.post('/', async (request, response) => {
  try {
    const { name, price, stock, category } = request.body
    const product = await Product.create({ name, price, stock, category, user: request.user._id })
    response.status(201).json({ product: productResponse(product) })
  } catch (error) {
    response.status(400).json({ message: error.message || 'No se pudo crear el producto' })
  }
})

router.put('/:id', async (request, response) => {
  try {
    const { name, price, stock, category } = request.body
    const product = await Product.findOneAndUpdate(
      { _id: request.params.id, user: request.user._id },
      { name, price, stock, category },
      { new: true, runValidators: true },
    )

    if (!product) return response.status(404).json({ message: 'Producto no encontrado' })
    response.json({ product: productResponse(product) })
  } catch (error) {
    response.status(400).json({ message: error.message || 'No se pudo actualizar el producto' })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const product = await Product.findOneAndDelete({ _id: request.params.id, user: request.user._id })
    if (!product) return response.status(404).json({ message: 'Producto no encontrado' })
    response.json({ message: 'Producto eliminado' })
  } catch {
    response.status(500).json({ message: 'No se pudo eliminar el producto' })
  }
})

export default router
