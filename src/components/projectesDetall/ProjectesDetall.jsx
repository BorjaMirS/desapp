import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OnGetDocument, saveDespesa, updateParticipants } from '../../firebase/firebase';
import Modal from '../modal/Modal';
import ParticipantsForm from '../participantsForm/ParticipantsForm';
import DespesesLlista from '../despesesllista/DespesesLlista';
import DespesaForm from '../despesaForm/DespesaForm';
import { useCollection } from '../../hooks/useCollection';

export default function ProjectesDetall() {
    const { id } = useParams();
    const [projecte, setProjecte] = useState(null);
    const [mostraModal, setMostraModal] = useState(false);
    const [mostrarDespeses, setMostrarDespeses] = useState(true)
    const { documents: despeses } = useCollection('despeses');

    
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

       const afegirDespesa = (despesa) => {
          saveDespesa(despesa)
              .then((idDespesa) => {
                  console.log(`Despesa afegida amb id: ${idDespesa}`);
                  despesa.id = idDespesa;
              })
              .catch((error) => {
                  console.error("Error afegint la despesa:", error);
              })
              .finally(() => {
                  setMostraModal(false); // Tanca el modal, independentment del resultat
              });
         };
  
        const eliminarDespesa = (id) => {
          deleteDespesa(id)
              .then(() => {
                  console.log(`Despesa amb id ${id} eliminada correctament`);
              })
              .catch((error) => {
                  console.error("Error eliminant la despesa:", error);
              });
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
        {  !mostrarDespeses && 
               (
                  <div>
                    <button onClick={ () => setMostrarDespeses(true)}>Mostrar Despeses</button>
                  </div>
                )
        } 
        {  mostrarDespeses && 
            (
                  <div>
                    <button onClick={ () => setMostrarDespeses(false)}>Ocultar Despeses</button>
                  </div>
            )
        }
        { 
            //Index és un atribut per defecte de map
            mostrarDespeses && despeses && <DespesesLlista despeses={despeses} eliminarDespesa={eliminarDespesa}/>
        }
        { mostraModal && <Modal handleTancar = {handleTancar}>  
                <DespesaForm afegirDespesa={afegirDespesa} projecte={projecte}/>
            </Modal>  
        }
        <div>
            <button onClick={ () => setMostraModal(true)}> Afegir despesa </button>
        </div>
        <div>
            <button onClick={() => setFiltrarPerQuantia(true)}>Filtrar</button>
        </div>                         
    </div>
    
  )
}
