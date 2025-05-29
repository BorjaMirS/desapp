import { useState } from 'react';
import './ProjectForm.css'
import { saveCollection } from '../../firebase/firebase';


export default function ProjectForm({projecte}) {

  const [name, setName] = useState("")
  const [quantia, setQuantia] = useState("")
  const [pagatPer, setPagatPer] = useState("")
  const [participants, setParticipants] = useState(null)

  const resetForm = () => {
    setName("")
    setQuantia("")
    setPagatPer("")
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }; 

  const handleSubmit = (e) => {
    e.preventDefault()

    const projecte = {
        nom: name,
        participants: ["pepe", "tomeu"]
    }

    saveCollection("projectes", projecte);

    resetForm()
  }

  return (
    <div>
        <form className="projecte-form" onSubmit={handleSubmit}>
            <label>
                <span>Nom del projecte</span>  
                <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>          
            </label>
            <label>
                <span>Participants</span>  
                <select onChange={(e) => {setPagatPer(e.target.value)}}>
                <option value="joan">Joan</option>
                <option value="borja">Borja</option>
                <option value="david">David</option>
                <option value="pere">Pere</option>
                </select>
            </label>
            <button>Crear</button>
            <button onClick={resetForm}>Restablir els valors inicials</button>
        </form>
    </div>

  )
}
