import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TaskTest from './features/component/TaskTest'
import MainLayout from './features/component/MainLayout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage'

import { AuthProvider, useAuthContext } from './context/AuthContext'
import { Toaster } from 'sonner'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position='top-center' richColors/>
          <Routes>
            <Route
              path="/auth"
              element={<AuthPage />}
            />
            <Route
              path='/tasks'
              element={<ProtectedRoute><MainLayout><TaskTest/></MainLayout></ProtectedRoute>}
            />
            <Route
              path="/"
              element={<Navigate to="/auth" />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  if (!isAuthenticated) {
    return <Navigate to="/auth" />
  }
  return children
}
export default App