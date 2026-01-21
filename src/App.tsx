import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </>
  )
}

export default App
