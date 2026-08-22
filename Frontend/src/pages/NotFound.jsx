import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'

const NotFound = () => (
  <PageShell eyebrow="CafeAndino" title="Pagina no encontrada">
    <Link className="helper-link" to="/dashboard">Volver al inicio</Link>
  </PageShell>
)

export default NotFound
