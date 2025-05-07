import { useState } from 'react';
import './DespesaForm.css'


export default function DespesaForm() {

  const [concepte, setConcepte] = useState("");

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
            <input type="text" />          
        </label>
        <label>
            <span>Pagat per</span>  
            <input type="text" />          
        </label>
        <button>Afegir</button>
    </form>
  )
}
