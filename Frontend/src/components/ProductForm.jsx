import { useState } from 'react'
import Button from './Button'
import FormField from './FormField'

const emptyProduct = { name: '', price: '', stock: '', category: '' }

const ProductForm = ({ product, categories, onSave, onCancel }) => {
  const [form, setForm] = useState(product || emptyProduct)

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    })
    setForm(emptyProduct)
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="product-form-grid">
        <FormField label="Nombre del cafe" name="name" value={form.name} onChange={handleChange} placeholder="Ej. Americano" required />
        <label className="form-field">
          <span><i className="bi bi-tag" aria-hidden="true" /> Categoria</span>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Selecciona una categoria</option>
            {categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
          </select>
        </label>
        <FormField label="Precio" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" required />
        <FormField label="Stock" name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} placeholder="0" required />
      </div>
      <div className="form-actions">
        <Button type="submit">
          <i className={`bi ${product ? 'bi-check2-circle' : 'bi-plus-circle'}`} aria-hidden="true" />
          {product ? 'Guardar cambios' : 'Agregar cafe'}
        </Button>
        {product && (
          <Button variant="secondary" onClick={onCancel}>
            <i className="bi bi-x-circle" aria-hidden="true" />
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}

export default ProductForm
