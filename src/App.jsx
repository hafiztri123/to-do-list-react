import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TaskTest from './features/component/TaskTest'
import MainLayout from './features/component/MainLayout'
import { Children } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from './features/component/RegisterPage'

function App() {
  const queryClient = new QueryClient()
  const isAuthenticated = !!localStorage.getItem('token')

  const ProtectedRoute = ({ Children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/register" />
    }
  }


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        {/*Public route*/}
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/tasks"/>
            ) : (
              <RegisterPage/>
            )
          }
          />
        {/*Protected route*/}
        <Route
        path='/tasks'
        element={
          <ProtectedRoute>
            <MainLayout>
              <TaskTest/>
            </MainLayout>
          </ProtectedRoute>
        }
        />
        <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? '/tasks' : '/register'}/>
        }
        />
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )

}

export default App
