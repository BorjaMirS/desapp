
import { useState } from 'react'
import './App.css'
import logoReact from './assets/react.svg'

//1. clic event
//2. Estats
// useState és un hook
// Els hooks sempre han d'estar definits al nivell més alt de la funció del component. No poden estar fora de l'hàmbit de la funció

function App() {

  // Creació dels primers components dinàmics
  //let titol = "Benvinguts al curs"
  const [titol, setTitol] = useState("Benvinguts al curs")
  const subtitol = "React & Firebase"
  const web = "https://www.menorca.info"
  const [despeses, setDespeses] = useState([
    {concepte: "dinar", quantia: 50.67, pagatPer:"Pere", id:1},
    {concepte: "sopar", quantia: 33.33, pagatPer:"Toni", id:2},
    {concepte: "excursió", quantia: 150.27, pagatPer:"Anna", id:3}
  ])

  const handleClick = (e) => {
    setTitol("Nou títol")
    console.log(titol)
  }

  return (
    <div>
      <h2> { titol }</h2>
      <p> { subtitol }</p>
      <div>
        <img src={ logoReact } alt="react" />
      </div>
      <div>
        <img src="./vite.svg" alt="vite" />
      </div>
      <p>La data d'avui: { new Date().toDateString() }</p>
      <p>Número aleatori: { Math.random() * 100 }</p>
      <a href={ web }>Visita es diari</a>
      <button onClick={handleClick}>Fes clic</button>
      { 
      //Index és un atribut per defecte de map
        despeses.map((despesa, index) => (
            <div key={despesa.id}>
              <h2>{index + 1} - {despesa.concepte} </h2>
            </div> 
          )
        )
      }
    </div>
  )
}

export default App
