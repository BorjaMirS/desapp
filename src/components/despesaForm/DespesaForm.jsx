import { useState } from 'react';
import './DespesaForm.css'


export default function DespesaForm({afegirDespesa}) {

  const [concepte, setConcepte] = useState("")
  const [quantia, setQuantia] = useState("")
  const [pagatPer, setPagatPer] = useState("")

  const resetForm = () => {
    setConcepte("")
    setQuantia("")
    setPagatPer("")
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }; 

  const handleSubmit = (e) => {
    e.preventDefault()

    const despesa = {
      concepte: concepte,
      quantia: quantia,
      pagatPer: pagatPer,
      id: Math.floor(Math.random()*1000)
    }

    console.log(despesa)

    afegirDespesa(despesa)

    resetForm()
  }

  return (
    <form className="despesa-form" onSubmit={handleSubmit}>
        <label>
            <span>Concepte</span>  
            <input type="text" onChange={(e) => setConcepte(e.target.value)} value={concepte}/>          
        </label>
        <label>
            <span>Quantia</span>  
            <input type="text" onChange={(e) => setQuantia(e.target.value)} value={quantia}/>          
        </label>
        <label>
            <span>Pagat per</span>  
            <select onChange={(e) => {setPagatPer(e.target.value)}}>
              <option value="joan">Joan</option>
              <option value="borja">Borja</option>
              <option value="david">David</option>
              <option value="pere">Pere</option>
            </select>
        </label>
        <button>Afegir</button>
        <p>CONCEPTE: { concepte } Quantia: {quantia} Pagat per: {pagatPer}</p>
        <p onClick={resetForm}>Restablir els valors inicials</p>
    </form>
  )
}
