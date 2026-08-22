import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const token = localStorage.getItem('cafeandino_token')

  return token ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}

export default ProtectedRoute
