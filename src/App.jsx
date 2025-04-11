
import './App.css'

function App() {

  // Creació dels primers components dinàmics
  const titol = "Benvinguts al curs"
  const subtitol = "React & Firebase"

  return (
    <div>
      <h2> { titol }</h2>
      <p> { subtitol }</p>
      <p>La data d'avui: { new Date().toDateString() }</p>
      <p>Número aleatori: { Math.random() * 100 }</p>
    </div>
  )
}

export default App
