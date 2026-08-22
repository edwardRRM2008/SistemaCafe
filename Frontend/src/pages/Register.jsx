import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormField from '../components/FormField'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      localStorage.setItem('cafeandino_token', data.token)
      localStorage.setItem('cafeandino_user', JSON.stringify(data.user))
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message || 'No se pudo crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <p className="eyebrow">CafeAndino</p>
        <h1>Crea tu cuenta</h1>
        {error && <p className="message">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <FormField label="Nombre" name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required minLength="2" />
          <FormField label="Correo electronico" name="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <FormField label="Contrasena" name="password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength="6" />
          <Button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Registrarme'}</Button>
        </form>
        <Link className="helper-link" to="/login">Ya tengo una cuenta</Link>
      </section>
    </main>
  )
}

export default Register
