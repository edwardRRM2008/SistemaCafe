import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormField from '../components/FormField'

const API_URL = import.meta.env.VITE_API_URL || 'https://sistema-cafe-backend.vercel.app/api'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      localStorage.setItem('cafeandino_token', data.token)
      localStorage.setItem('cafeandino_user', JSON.stringify(data.user))
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message || 'No se pudo iniciar sesion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <p className="eyebrow">CafeAndino</p>
        <h1>Bienvenido de vuelta</h1>
        {error && <p className="message">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <FormField label="Correo electronico" name="email" type="email" value={form.email} onChange={handleChange} required />
          <FormField label="Contrasena" name="password" type="password" value={form.password} onChange={handleChange} required minLength="6" />
          <Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Iniciar sesion'}</Button>
        </form>
        <Link className="helper-link" to="/registro">Crear una cuenta</Link>
      </section>
    </main>
  )
}

export default Login
