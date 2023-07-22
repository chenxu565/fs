import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NoticeProvider } from './NoticeContext'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NoticeProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NoticeProvider>
)