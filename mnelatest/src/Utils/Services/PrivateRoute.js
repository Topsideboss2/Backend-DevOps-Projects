import { Outlet, Navigate } from 'react-router-dom'
import { LocalStorage } from '../Hooks/useLocalStorage'

export function PrivateOutlet() {
  const token = LocalStorage("token")
  return token ? <Outlet /> : <Navigate to="/login" />
}

export function PrivateRoute({ children }) {
  const token = LocalStorage("token")
  return token ? children : <Navigate to="/login" />;
}
