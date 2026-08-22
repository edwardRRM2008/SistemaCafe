import { NavLink } from 'react-router-dom'
import Button from './Button'

const Sidebar = ({ user, onLogout }) => (
  <aside className="sidebar">
    <div>
      <p className="brand">CafeAndino</p>
      <p className="sidebar-caption">Panel de gestion</p>
    </div>

    <nav className="sidebar-nav" aria-label="Navegacion principal">
      <NavLink className="sidebar-link" to="/dashboard" end>
        <i className="bi bi-house-door-fill" aria-hidden="true" />
        Inicio
      </NavLink>
      <NavLink className="sidebar-link" to="/dashboard/productos">
        <i className="bi bi-cup-hot-fill" aria-hidden="true" />
        Ver productos
      </NavLink>
      <NavLink className="sidebar-link" to="/dashboard/categorias">
        <i className="bi bi-tags-fill" aria-hidden="true" />
        Categorias
      </NavLink>
    </nav>

    <div className="sidebar-footer">
      <div className="user-summary">
        <strong>{user.name || 'Cliente'}</strong>
        <span>{user.email}</span>
      </div>
      <Button variant="secondary" onClick={onLogout}>
        <i className="bi bi-box-arrow-right" aria-hidden="true" />
        Cerrar sesion
      </Button>
    </div>
  </aside>
)

export default Sidebar
