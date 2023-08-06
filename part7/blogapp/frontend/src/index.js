import ReactDOM from 'react-dom/client'
import App from './App'
import { StoreContextProvider } from './StoreContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>,
)
