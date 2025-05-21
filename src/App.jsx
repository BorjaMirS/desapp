
import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inici from './pages/inici/inici'
import Login from './pages/login/login'
import Navbar from './components/navbar/Navbar'

//Importam React a la primera linea per emprar fragment
//1. clic event
//2. Estats
// useState és un hook
// Els hooks sempre han d'estar definits al nivell més alt de la funció del component. No poden estar fora de l'hàmbit de la funció

function App() {

  // Creació dels primers components dinàmics
  //let titol = "Benvinguts al curs"

    

  //const [despeses, setDespeses] = useState([])

  //console.log(mostrarDespeses)

  //Use effect


  return (
    <div>
      <Routes>
        <Route path='/' element={<Inici />} />
        <Route path='/login' element={ <Login />} />
      </Routes>
    <Navbar />
    </div>
  )
}

export default App
