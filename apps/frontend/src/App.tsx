import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
