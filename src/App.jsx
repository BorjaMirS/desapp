
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Inici from './pages/inici/inici'
import Login from './pages/login/login'
import Navbar from './components/navbar/Navbar'
import DespesesDetall from './components/despesesDetall/DespesesDetall'
import Register from './pages/register/Register'

//Importam React a la primera linea per emprar fragment
//1. clic event
//2. Estats
// useState és un hook
// Els hooks sempre han d'estar definits al nivell més alt de la funció del component. No poden estar fora de l'hàmbit de la funció

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Inici />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/despesa/:id' element={ <DespesesDetall /> }/>
        <Route path='/registre' element= { <Register />} />
        <Route path='*' element={ <Navigate to="/" replace />} />
      </Routes>
    <Navbar />
    </div>
  )
}

export default App
