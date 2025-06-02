import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OnGetDocument, updateParticipants } from '../../firebase/firebase';
import Modal from '../modal/Modal';
import ParticipantsForm from '../participantsForm/ParticipantsForm';

export default function ProjectesDetall() {
    const { id } = useParams();
    const [projecte, setProjecte] = useState(null);
    const [userName, setUserName] = useState("");
    const [mostraModal, setMostraModal] = useState(false);

    
    useEffect(() => {
        const unsubscribe = OnGetDocument(id, "projectes", (proj) => {
            if (proj.exists()) {
                setProjecte({...proj.data(), id:proj.id});
                console.log(`Projecte recuperat amd id: ${proj.id} i informació: ${proj.data()}`);
            } else {
                setProjecte(null);
            }
        })
        return () => unsubscribe()
    }, [id])

    if (!projecte) {
        return <p>Projecte no trobat</p>    
    }
    
  const handleTancar = () => {
    setMostraModal(false);
  }

  const handleParticipants = async (participantsActualitzats) => {
    if (!projecte) return;

    await updateParticipants(projecte.id, participantsActualitzats);

  }

  return (
    <div>
        <h2>
            Detall del projecte
        </h2>
        <p><strong> Nom: </strong>{projecte.nom}</p>
        <p><strong> ID projecte: </strong>{projecte.id}</p>
        <p><strong> ID Propietari: </strong>{projecte.idpropietari}</p>
        <p><strong> Participants: </strong></p>
        <ol>
            {projecte.participants && projecte.participants.length > 0 ? 
                (projecte.participants.map((participant, index) => (
                 <li key={index}>{participant}</li>))) : 
                 (<li>No hi ha participants</li>)
            }
        </ol>
        <button onClick={() => setMostraModal(true)}>Gestionar participants</button>
        {
          mostraModal && <Modal handleTancar={handleTancar}>
                            <ParticipantsForm 
                                projecte={projecte}
                                handleParticipants={handleParticipants}
                                handleTancar={handleTancar}/>
                        </Modal>
        }        
    </div>
    
  )
}
