import Button from './Button'

const ProductTable = ({ products, onEdit, onDelete }) => {
  if (!products.length) {
    return <p className="empty-state">Todavia no hay cafes registrados.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="product-id">{product.id}</td>
              <td>{product.name}</td>
              <td><span className="category-badge">{product.category || 'Otros'}</span></td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td className="table-actions">
                <Button variant="secondary" onClick={() => onEdit(product)}>
                  <i className="bi bi-pencil-square" aria-hidden="true" />
                  Editar
                </Button>
                <Button variant="danger" onClick={() => onDelete(product.id)}>
                  <i className="bi bi-trash3" aria-hidden="true" />
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
