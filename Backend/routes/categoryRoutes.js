import express from 'express'
import Category from '../models/categoryModel.js'
import Product from '../models/productModel.js'
import { authenticate } from './userLogin.js'

const router = express.Router()
router.use(authenticate)

const categoryResponse = (category) => ({
  id: category._id,
  name: category.name,
})

router.get('/', async (request, response) => {
  try {
    const categories = await Category.find({ user: request.user._id }).sort({ _id: 1 })
    response.json({ categories: categories.map(categoryResponse) })
  } catch {
    response.status(500).json({ message: 'No se pudieron cargar las categorias' })
  }
})

router.post('/', async (request, response) => {
  try {
    const name = request.body.name?.trim()
    if (!name || name.length < 2 || name.length > 20) {
      return response.status(400).json({ message: 'La categoria debe tener entre 2 y 40 caracteres' })
    }

    const category = await Category.create({ name, user: request.user._id })
    response.status(201).json({ category: categoryResponse(category) })
  } catch (error) {
    if (error.code === 11000) return response.status(409).json({ message: 'La categoria ya existe' })
    response.status(400).json({ message: error.message || 'No se pudo crear la categoria' })
  }
})

router.put('/:id', async (request, response) => {
  try {
    const name = request.body.name?.trim()
    if (!name || name.length < 2 || name.length > 40) {
      return response.status(400).json({ message: 'La categoria debe tener entre 2 y 40 caracteres' })
    }

    const category = await Category.findOneAndUpdate(
      { _id: request.params.id, user: request.user._id },
      { name },
      { new: true, runValidators: true },
    )

    if (!category) return response.status(404).json({ message: 'Categoria no encontrada' })

    await Product.updateMany(
      { user: request.user._id, category: request.body.previousName },
      { $set: { category: name } },
    )

    response.json({ category: categoryResponse(category) })
  } catch (error) {
    if (error.code === 11000) return response.status(409).json({ message: 'La categoria ya existe' })
    response.status(400).json({ message: error.message || 'No se pudo actualizar la categoria' })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const category = await Category.findOne({ _id: request.params.id, user: request.user._id })
    if (!category) return response.status(404).json({ message: 'Categoria no encontrada' })

    const productsUsingCategory = await Product.countDocuments({
      user: request.user._id,
      category: category.name,
    })
    if (productsUsingCategory) {
      return response.status(409).json({
        message: 'No puedes eliminar una categoria que tiene productos asociados',
      })
    }

    await category.deleteOne()
    response.json({ message: 'Categoria eliminada' })
  } catch {
    response.status(500).json({ message: 'No se pudo eliminar la categoria' })
  }
})

export default router
