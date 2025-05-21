
import React, { useState, useEffect } from 'react'
import './App.css'
import Titol from './components/titol/Titol'
import Modal from './components/modal/Modal'
import DespesesLlista from './components/despesesllista/despesesllista'
import DespesaForm from './components/despesaForm/DespesaForm'
import { saveDespesa, onGetDespeses, deleteDespesa } from './firebase/firebase'
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
  const [mostrarDespeses, setMostrarDespeses] = useState(true)
  const [mostraModal, setMostraModal] = useState(false)
  const [despeses, setDespeses] = useState(null)

  const [filtrarPerQuantia, setFiltrarPerQuantia] = useState(false)
    

  //const [despeses, setDespeses] = useState([])

  //console.log(mostrarDespeses)
  console.log(mostraModal)

  //Use effect

  const subtitol = "React & Firebase!!"

 useEffect(() => {
     onGetDespeses((querySnapshot) => {
      let resultats = []

      querySnapshot.forEach((doc) => {
        const despesa = doc.data()
        despesa.id = doc.id
        resultats.push({...doc.data(), id: doc.id})
      })

      setDespeses(resultats)
    })
 },[])

  useEffect(() => {
    setDespeses((despesesPrevies) => {
      if (filtrarPerQuantia)
        return despesesPrevies.filter((despesa) => despesa.quantia > 10.00)
      else 
        return despesesPrevies
    })
  }
   , [filtrarPerQuantia]
  )

  const afegirDespesa = (despesa) => {
      setDespeses((despesesPrevies) => {

        saveDespesa(despesa)
         .then((idDespesa) => {
            despesa.id = idDespesa

            if (!despesesPrevies) {
              return [despesa]
            } else {
              return [...despesesPrevies, despesa]
            }
         })

      })

      setMostraModal(false)
  }


  const eliminarDespesa = (id) => {
    setDespeses((despesesPrevies) => {
      deleteDespesa(id).then(() => {

      })
    })

    setMostraModal(false)
}

  const handleClick = (id) => {
    // console.log(id)
    //setDespeses(despeses.filter((despesa) => id !== despesa.id))
    setDespeses((despesesPrevies) => {
      return despesesPrevies.filter((despesa) => id !== despesa.id)
    })
  }

  const handleTancar = () => {
    setMostraModal(false)
  }

  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Inici />} />
        <Route path='/login' element={ <Login />} />
      </Routes>
    <Navbar />
      <Titol titol="Benvinguts al curs!!" subtitol={subtitol} />
     {  !mostrarDespeses && 
       (
          <div>
            <button onClick={ () => setMostrarDespeses(true)}>Mostrar Despeses</button>
          </div>
        )
     } 
     {  mostrarDespeses && 
       (
          <div>
            <button onClick={ () => setMostrarDespeses(false)}>Ocultar Despeses</button>
          </div>
        )
     } 
      { 
      //Index és un atribut per defecte de map
        despeses && <DespesesLlista despeses={despeses} handleClick={handleClick}/>
      }
      { mostraModal && <Modal handleTancar = {handleTancar}>  
          <DespesaForm afegirDespesa={afegirDespesa}/>
      </Modal>  }
      <div>
        <button onClick={ () => setMostraModal(true)}> Afegir despesa </button>
      </div>
      <div>
        <button onClick={() => setFiltrarPerQuantia(true)}>Filtrar</button>
      </div>
    </div>
  )
}

export default App
