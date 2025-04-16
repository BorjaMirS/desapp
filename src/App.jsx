
import { useState } from 'react'
import './App.css'
import Titol from './components/titol/Titol'

//1. clic event
//2. Estats
// useState és un hook
// Els hooks sempre han d'estar definits al nivell més alt de la funció del component. No poden estar fora de l'hàmbit de la funció

function App() {

  // Creació dels primers components dinàmics
  //let titol = "Benvinguts al curs"
  const [mostrarDespeses, setMostrarDespeses] = useState(true)
  const [despeses, setDespeses] = useState([
    {concepte: "dinar", quantia: 50.67, pagatPer:"Pere", id:1},
    {concepte: "sopar", quantia: 33.33, pagatPer:"Toni", id:2},
    {concepte: "excursió", quantia: 150.27, pagatPer:"Anna", id:3}
  ])

  //console.log(mostrarDespeses)

  const subtitol = "React & Firebase!!"

  const handleClick = (id) => {
    // console.log(id)
    //setDespeses(despeses.filter((despesa) => id !== despesa.id))
    setDespeses((despesesPrevies) => {
      return despesesPrevies.filter((despesa) => id !== despesa.id)
    })
  }

  return (
    <div>
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
        mostrarDespeses && despeses.map((despesa, index) => (
            <div key={despesa.id}>
              <h2>{index + 1} - {despesa.concepte} </h2>
              <button onClick={ () => handleClick(despesa.id)}>Eliminar despesa</button>
            </div> 
          )
        )
      }
    </div>
  )
}

export default App
