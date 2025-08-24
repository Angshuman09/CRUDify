import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='max-w-7xl h-screen m-auto'>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<Create/>}/>
    </Routes>
    </div>
  )
}

export default App
