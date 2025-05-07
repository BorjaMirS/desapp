import './DespesaForm.css'


export default function DespesaForm() {

  const handleChange = (e) => {
    console.log(e.target.value)
  }; 
  
  return (
    <form className="despesa-form">
        <label>
            <span>Concepte</span>  
            <input type="text" onChange={handleChange}/>          
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
