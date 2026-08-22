import CatalogCharts from '../components/CatalogCharts'
import ExportPdfButton from '../components/ExportPdfButton'
import StatCard from '../components/StatCard'
import { useOutletContext } from 'react-router-dom'

const Home = () => {
  const { products } = useOutletContext()
  const user = JSON.parse(localStorage.getItem('cafeandino_user') || '{}')
  const totalStock = products.reduce((total, product) => total + product.stock, 0)
  const totalStockValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  )

  return (
    <>
      <p className="eyebrow">Area privada</p>
      <h1>Hola, {user.name || 'cliente'}</h1>
      <p className="page-intro">Este es el resumen de tu catalogo de CafeAndino.</p>
      <div className="home-actions">
        <span>Descarga una copia del catalogo actual.</span>
        <ExportPdfButton products={products} />
      </div>
      <div className="stats-grid">
        <StatCard label="Cafes registrados" value={products.length} detail="Productos en el catalogo" />
        <StatCard label="Stock disponible" value={totalStock} detail="Unidades registradas" />
        <StatCard label="Valor total del stock" value={`$${totalStockValue.toFixed(2)}`} detail="Precio de todas las unidades" />
      </div>
      <CatalogCharts products={products} />
    </>
  )
}

export default Home
