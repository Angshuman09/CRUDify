import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Navbar from './components/Navbar'
import { ThemeProvider } from './Context/ThemeContext'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <ThemeProvider>
      <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<Create/>}/>
    </Routes>
    </ThemeProvider>
  )
}

export default App
