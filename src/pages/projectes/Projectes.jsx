import {useState} from 'react'
import Modal from '../../components/modal/Modal';
import ProjectForm from '../../components/projectForm/ProjectForm';
import { saveCollection } from '../../firebase/firebase';
import { useCollection } from '../../hooks/useCollection'


export default function Projectes() {

  const [mostraModal, setMostraModal] = useState(false);
  const { documents: projectes } = useCollection('projectes');

  const handleTancar = () => {
    setMostraModal(false);
  }


  const afegirProjecte = (projecte) => {
    saveCollection("projectes", projecte)
      .then((idProjecte) => {
        console.log(`Projecte afegit amb id: ${idProjecte}`);
        projecte.id = idProjecte;
        })
        .catch((error) => {
          console.log("Error afegint projecte: ", error);
        })
        .finally(()=> setMostraModal(false));
                
  }

  return (
    <div>
        <h1>Projectes</h1>
        <button onClick={() => setMostraModal(true)}>Crear nou projecte</button>
        {
          mostraModal && <Modal handleTancar={handleTancar}>
                            <ProjectForm afegirProjectes={afegirProjecte}/>
                        </Modal>
        }
    </div>
  )
}
