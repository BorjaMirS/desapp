import {useState, useEffect} from 'react'
import Modal from '../../components/modal/Modal';
import ProjectForm from '../../components/projectForm/ProjectForm';
import { saveCollection, deleteDocument } from '../../firebase/firebase';
import { useCollection } from '../../hooks/useCollection'
import ProjectesLlista from '../../components/projectesLlista/ProjectesLlista'
import { useAuth } from '../../components/authContext/AuthContext';


export default function Projectes() {

  const [mostraModal, setMostraModal] = useState(false);
  const { documents: projectes } = useCollection('projectes');

  const handleTancar = () => {
    setMostraModal(false);
  }


  const afegirProjecte = (projecte) => {
    saveCollection("projectes", projecte)
      .then((idProjecte) => {
        console.log("Projecte afegit amb id: ", idProjecte);
        projecte.id = idProjecte;
        })
        .catch((error) => {
          console.log("Error afegint projecte: ", error);
        })
        .finally(()=> {
          console.log("Tancant modal projecte");

          setMostraModal(false);
        });
                
  }

        const eliminarProjecte = (id) => {
          deleteDocument("projectes", id)
              .then(() => {
                  console.log(`Projecte amb id ${id} eliminada correctament`);
              })
              .catch((error) => {
                  console.error("Error eliminant el projecte:", error);
              });
        }

  return (
    <div>
        <h1>Projectes</h1>
        <button onClick={() => setMostraModal(true)}>Crear nou projecte</button>
        {
          projectes && <ProjectesLlista projectes={projectes} eliminarProjecte={eliminarProjecte} />   
        }
        {
          mostraModal && <Modal handleTancar={handleTancar}>
                            <ProjectForm afegirProjecte={afegirProjecte}/>
                        </Modal>
        }
    </div>
  )
}
