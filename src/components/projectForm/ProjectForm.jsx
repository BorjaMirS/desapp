import { useState, useEffect } from 'react';
import './ProjectForm.css'
import { useAuth } from '../../components/authContext/AuthContext';

export default function ProjectForm({afegirProjecte}) {

  const [name, setName] = useState("")
  const [quantia, setQuantia] = useState("")
  const [pagatPer, setPagatPer] = useState("")
  const [participants, setParticipants] = useState(null)
  const [error, setError] = useState('');
  const { user } = useAuth();
/*
  useEffect(() => {
    if (user) {
      console.log("Usuari autenticat amb UID:", user.uid);
    }
  }, [user]);
*/
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

    if (user) {
      console.log(`Usuari: ${user.uid}`);
      const projecte = {
        nom: name,
        propietari:user.uid,
        participants: ["pepe", "tomeu"]
      }

      afegirProjecte(projecte);
    } else {
      setError("Un usuari no autenticat no pot crear projectes");
    }


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
            {error && <p style={{ color: 'red'}}> {error} </p>}
            <button>Crear</button>
            <button onClick={resetForm}>Restablir els valors inicials</button>
        </form>
    </div>

  )
}
