
import Titol from '../../components/titol/Titol'
import Modal from '../../components/modal/Modal'
import DespesesLlista from '../../components/despesesllista/despesesllista'
import DespesaForm from '../../components/despesaForm/DespesaForm'
import { saveDespesa, onGetCollection, deleteDespesa } from '../../firebase/firebase'
import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'

export default function inici() {

      const [mostrarDespeses, setMostrarDespeses] = useState(true)
      const [mostraModal, setMostraModal] = useState(false)
      const [despeses, setDespeses] = useState(null)
    
      const [filtrarPerQuantia, setFiltrarPerQuantia] = useState(false)
      // hook personalitzat const { documents: despeses } = useCollection('despeses')

      const subtitol = "React & Firebase!!"

      useEffect(() => {
        onGetCollection("despeses", (querySnapshot) => {
            let resultats = []
      
            querySnapshot.forEach((doc) => {
              const despesa = doc.data()
              despesa.id = doc.id
              resultats.push({...doc.data(), id: doc.id})
            })
      
            setDespeses(resultats)
          })
       },[])
      
        useEffect(() => {
          setDespeses((despesesPrevies) => {
            if (filtrarPerQuantia)
              return despesesPrevies.filter((despesa) => despesa.quantia > 10.00)
            else 
              return despesesPrevies
          })
        }
         , [filtrarPerQuantia]
        )
      
        const afegirDespesa = (despesa) => {
            setDespeses((despesesPrevies) => {
      
              saveDespesa(despesa)
               .then((idDespesa) => {
                  despesa.id = idDespesa
      
                  if (!despesesPrevies) {
                    return [despesa]
                  } else {
                    return [...despesesPrevies, despesa]
                  }
               })
      
            })
      
            setMostraModal(false)
        }
      
      
        const eliminarDespesa = (id) => {
          setDespeses((despesesPrevies) => {
            deleteDespesa(id).then(() => {
      
            })
          })
      
          setMostraModal(false)
      }

      const handleClick = (id) => {
        // console.log(id)
        //setDespeses(despeses.filter((despesa) => id !== despesa.id))
        setDespeses((despesesPrevies) => {
          return despesesPrevies.filter((despesa) => id !== despesa.id)
        })
      }
    
      const handleTancar = () => {
        setMostraModal(false)
      }

  return (
    <div>
            <h1>Inici</h1>
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
                   <Titol titol="Benvinguts al curs!!" subtitol={subtitol} />
            { 
            //Index és un atribut per defecte de map
                despeses && <DespesesLlista despeses={despeses} eliminarDespesa={eliminarDespesa}/>
            }
            { mostraModal && <Modal handleTancar = {handleTancar}>  
                <DespesaForm afegirDespesa={afegirDespesa}/>
            </Modal>  }
            <div>
                <button onClick={ () => setMostraModal(true)}> Afegir despesa </button>
            </div>
            <div>
                <button onClick={() => setFiltrarPerQuantia(true)}>Filtrar</button>
            </div>
    </div>
  )
}
