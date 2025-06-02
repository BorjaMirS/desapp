import { useState, useEffect } from 'react';
import './ProjectForm.css'
import { useAuth } from '../../components/authContext/AuthContext';
import { onGetCollection, OnGetDocument } from '../../firebase/firebase';

export default function ProjectForm({afegirProjecte}) {

  const [name, setName] = useState("")
  const [participants, setParticipants] = useState([])
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [userName, setUserName] = useState('');
  //const [nouParticipant, setNouParticipant] = useState('');

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

  // Carrega usuaris des de Firebase
  useEffect(() => {
    const unsubscribe = onGetCollection("usuaris", (snapshot) => {
      const noms = snapshot.docs.map(doc => doc.data().nom);
      setParticipants(noms);
      console.log("ProjectForm participants: ", participants);
    });

    console.log("Participants: ", participants);
    return () => unsubscribe();
  }, []);

/*  const afegirNouParticipant = () => {
    if (nouParticipant && !participantsSeleccionats.includes(nouParticipant)) {
      setParticipantsSeleccionats(prev => [...prev, nouParticipant]);
      setNouParticipant('');
    }
  };
*/
  const resetForm = () => {
    setName("");
    setParticipants([]);
    //setNouParticipant('');
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (user) {
      console.log(`Usuari: ${user}`);
      const projecte = {
        nom: name,
        idpropietari:user.uid,
        participants: ["bb", "aa"]
      }

      afegirProjecte(projecte);
      console.log("Afegir projecte ", projecte);
    } else {
      setError("Un usuari no autenticat no pot crear projectes");
    }


    resetForm()
  }

/*
        <label>
          <span>Participants</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3em' }}>
              {participants.map((participant, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={participants.includes(participant)}
                    onChange={() => handleChangeCheckbox(participant)}
                  />
                  {participant}
                </label>
              ))}
          </div>
        </label>
*/

  return (
    <div>
        <form className="projecte-form" onSubmit={handleSubmit}>
            <label>
                <span>Nom del projecte</span>  
                <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>          
            </label>
            {error && <p style={{ color: 'red'}}> {error} </p>}
            <button>Crear</button>
            <button onClick={resetForm}>Restablir els valors inicials</button>
        </form>
    </div>

  )
}
