import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Programs from './pages/Programs'
import Production from './pages/Production'
import Quality from './pages/Quality'
import SupplyChain from './pages/SupplyChain'
import Service from './pages/Service'
import Analytics from './pages/Analytics'
import Layout from './components/Layout'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="programs" element={<Programs />} />
                <Route path="production" element={<Production />} />
                <Route path="quality" element={<Quality />} />
                <Route path="supply-chain" element={<SupplyChain />} />
                <Route path="service" element={<Service />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
