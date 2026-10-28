import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('cafeandino_token')
  const user = JSON.parse(localStorage.getItem('cafeandino_user') || '{}')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` }
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_URL}/products`, { headers }),
          fetch(`${API_URL}/categories`, { headers }),
        ])
        const productsData = await productsResponse.json()
        const categoriesData = await categoriesResponse.json()

        if (!productsResponse.ok) throw new Error(productsData.message)
        if (!categoriesResponse.ok) throw new Error(categoriesData.message)

        setProducts(productsData.products)
        setCategories(categoriesData.categories)
      } catch (requestError) {
        setError(requestError.message || 'No se pudieron cargar los datos')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [token])

  const addCategory = async (name) => {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      setCategories((current) => [...current, data.category])
      setError('')
      return true
    } catch (requestError) {
      setError(requestError.message || 'No se pudo agregar la categoria')
      return false
    }
  }

  const updateCategory = async (category, name) => {
    try {
      const response = await fetch(`${API_URL}/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, previousName: category.name }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      setCategories((current) => current.map((item) => item.id === category.id ? data.category : item))
      setProducts((current) => current.map((product) => product.category === category.name
        ? { ...product, category: data.category.name }
        : product))
      setError('')
      return true
    } catch (requestError) {
      setError(requestError.message || 'No se pudo actualizar la categoria')
      return false
    }
  }

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      setCategories((current) => current.filter((category) => category.id !== id))
      setError('')
      return true
    } catch (requestError) {
      setError(requestError.message || 'No se pudo eliminar la categoria')
      return false
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('cafeandino_token')
    localStorage.removeItem('cafeandino_user')
    navigate('/login', { replace: true })
  }

  if (!token) return <Navigate to="/login" replace />

  const saveProduct = async (product, editingId) => {
    try {
      const response = await fetch(`${API_URL}/products${editingId ? `/${editingId}` : ''}`, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      setProducts((current) => editingId
        ? current.map((item) => item.id === editingId ? data.product : item)
        : [data.product, ...current])
      setError('')
      return true
    } catch (requestError) {
      setError(requestError.message || 'No se pudo guardar el producto')
      return false
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      setProducts((current) => current.filter((product) => product.id !== id))
      setError('')
      return true
    } catch (requestError) {
      setError(requestError.message || 'No se pudo eliminar el producto')
      return false
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar user={user} onLogout={handleLogout} />
      <main className="dashboard-main">
        <Outlet context={{ products, categories, addCategory, updateCategory, deleteCategory, saveProduct, deleteProduct, loading, error }} />
      </main>
    </div>
  )
}

export default Dashboard
