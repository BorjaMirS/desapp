import {useState} from 'react'
import Modal from '../../components/modal/Modal';
import ProjectForm from '../../components/projectForm/ProjectForm';
import { saveCollection } from '../../firebase/firebase';

export default function Projectes() {

  const [mostraModal, setMostraModal] = useState(false);
  const [projectes, setProjectes] = useState(null);

  const handleTancar = () => {
    setMostraModal(false);
  }

  const afegirProjecte = (projecte) => {
    setProjectes((projectesPrevis) => {
    saveCollection("projectes", projecte)
      .then((idProjecte) => {
        projecte.id = idProjecte
        
        if (!projectesPrevis) {
            return [projecte]
        } else {
            return [...projectesPrevis, projecte]
          }
        })
        
    })
        
    setMostraModal(false)
  }

  return (
    <div>
        <h1>Projectes</h1>
        <button onClick={() => setMostraModal(true)}>Crear nou projecte</button>
        {
          mostraModal && <Modal handleTancar={handleTancar}>
                            <ProjectForm afegirProjectes={afegirProjectes}/>
                        </Modal>
        }
    </div>
  )
}
