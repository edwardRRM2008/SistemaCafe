import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Button from '../components/Button'

const Categories = () => {
  const { categories, addCategory, updateCategory, deleteCategory, error } = useOutletContext()
  const [categoryName, setCategoryName] = useState('')
  const [editingCategory, setEditingCategory] = useState(null)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const saved = editingCategory
      ? await updateCategory(editingCategory, categoryName)
      : await addCategory(categoryName)
    setMessage(saved
      ? editingCategory ? 'Categoria actualizada correctamente' : 'Categoria agregada correctamente'
      : editingCategory ? 'La categoria ya existe o no se pudo actualizar' : 'La categoria ya existe o no se pudo agregar')
    if (saved) {
      setCategoryName('')
      setEditingCategory(null)
    }
  }

  const handleDelete = async (category) => {
    const deleted = await deleteCategory(category.id)
    setMessage(deleted ? 'Categoria eliminada correctamente' : '')
  }

  const startEditing = (category) => {
    setEditingCategory(category)
    setCategoryName(category.name)
    setMessage('')
  }

  return (
    <>
      <p className="eyebrow">Catalogo</p>
      <h1>Categorias</h1>
      <p className="page-intro">Agrega las categorias que podras seleccionar al registrar un cafe.</p>
      {(error || message) && <p className="message">{error || message}</p>}
      <section className="content-panel">
        <h2>{editingCategory ? 'Actualizar categoria' : 'Agregar categoria'}</h2>
        <form className="category-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Nombre de la categoria</span>
            <input
              type="text"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Ej. Bebidas frias"
              minLength="2"
              maxLength="40"
              required
            />
          </label>
          <Button type="submit">
            <i className={`bi ${editingCategory ? 'bi-check2-circle' : 'bi-tags'}`} aria-hidden="true" />
            {editingCategory ? 'Guardar cambios' : 'Agregar categoria'}
          </Button>
          {editingCategory && (
            <Button variant="secondary" onClick={() => { setEditingCategory(null); setCategoryName('') }}>
              <i className="bi bi-x-circle" aria-hidden="true" />
              Cancelar
            </Button>
          )}
        </form>
      </section>
      <section className="content-panel category-list">
        <div className="section-heading">
          <h2>Categorias registradas</h2>
          <span>{categories.length} categorias</span>
        </div>
        <div className="category-items">
          {categories.map((category) => (
            <div className="category-item" key={category.id}>
              <span className="category-badge">
                <i className="bi bi-tag-fill" aria-hidden="true" />
                {category.name}
              </span>
              <div className="category-actions">
                <Button variant="secondary" onClick={() => startEditing(category)}>
                  <i className="bi bi-pencil-square" aria-hidden="true" />
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(category)}>
                  <i className="bi bi-trash3" aria-hidden="true" />
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Categories
