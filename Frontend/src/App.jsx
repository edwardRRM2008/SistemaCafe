import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import Register from './pages/Register'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Products />} />
          <Route path="categorias" element={<Categories />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
