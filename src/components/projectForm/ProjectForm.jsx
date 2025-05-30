import { useState, useEffect } from 'react';
import './ProjectForm.css'
import { useAuth } from '../../components/authContext/AuthContext';
import { OnGetDocument } from '../../firebase/firebase';

export default function ProjectForm({afegirProjecte}) {

  const [name, setName] = useState("")
  const [participants, setParticipants] = useState(null)
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [userName, setUserName] = useState('');
/*
  useEffect(() => {
    if (user) {
      
      const unsubscribe = OnGetDocument(user.uid, "usuaris", (usuari) => {
          if (usuari) {
            setUserName(usuari.data());
            console.log("Nom d'usuari: ", usuari.data());
          }
      })
    }
  }, [user]);
*/
  const resetForm = () => {
    setName("")
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }; 

  const handleSubmit = (e) => {
    e.preventDefault()

    if (user) {
      console.log(`Usuari: ${user}`);
      const projecte = {
        nom: name,
        idpropietari:user.uid,
       // nompropietari:userName,
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
