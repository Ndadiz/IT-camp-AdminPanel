import AppRouter from './routers/AppRouter'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@shared/lib/query'
export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </div>
  )
}
