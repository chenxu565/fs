import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StoreContextProvider } from './StoreContext'
import './index.css'
import { Container } from '@mui/material'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <QueryClientProvider client={queryClient}>
      <Container>
        <App />
      </Container>
    </QueryClientProvider>
  </StoreContextProvider>,
)
