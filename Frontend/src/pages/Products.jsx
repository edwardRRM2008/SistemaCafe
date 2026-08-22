import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'

const Products = () => {
  const { products, categories, saveProduct, deleteProduct, loading, error } = useOutletContext()
  const [editingProduct, setEditingProduct] = useState(null)

  const handleSave = async (product) => {
    const saved = await saveProduct(product, editingProduct?.id)
    if (saved) setEditingProduct(null)
  }

  const handleDelete = async (id) => {
    const deleted = await deleteProduct(id)
    if (deleted && editingProduct?.id === id) setEditingProduct(null)
  }

  return (
    <>
      <p className="eyebrow">Catalogo</p>
      <h1>Ver productos</h1>
      <p className="page-intro">Registra y actualiza los cafes disponibles para tu negocio.</p>
      {error && <p className="message">{error}</p>}
      <section className="content-panel">
        <h2>{editingProduct ? 'Editar cafe' : 'Nuevo cafe'}</h2>
        <ProductForm key={editingProduct?.id || 'new'} product={editingProduct} categories={categories} onSave={handleSave} onCancel={() => setEditingProduct(null)} />
      </section>
      <section className="content-panel">
        <div className="section-heading">
          <h2>Listado de cafes</h2>
          <span>{products.length} productos</span>
        </div>
        {loading ? <p className="empty-state">Cargando productos...</p> : <ProductTable products={products} onEdit={setEditingProduct} onDelete={handleDelete} />}
      </section>
    </>
  )
}

export default Products
