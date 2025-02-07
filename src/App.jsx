import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TaskTest from './features/component/TaskTest'
import MainLayout from './features/component/MainLayout'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <TaskTest />
      </MainLayout>
    </QueryClientProvider>
  )

}

export default App
