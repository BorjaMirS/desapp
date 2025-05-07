import { useState } from 'react';
import './DespesaForm.css'


export default function DespesaForm() {

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

  return (
    <form className="despesa-form">
        <label>
            <span>Concepte</span>  
            <input type="text" onChange={(e) => setConcepte(e.target.value)}/>          
        </label>
        <label>
            <span>Quantia</span>  
            <input type="text" onChange={(e) => setQuantia(e.target.value)}/>          
        </label>
        <label>
            <span>Pagat per</span>  
            <input type="text" onChange={(e) => setPagatPer(e.target.value)}/>          
        </label>
        <button>Afegir</button>
        <p>CONCEPTE: { concepte } Quantia: {quantia} Pagat per: {pagatPer}</p>
    </form>
  )
}
