
import Titol from '../../components/titol/Titol'
import Modal from '../../components/modal/Modal'
import DespesesLlista from '../../components/despesesllista/DespesesLlista'
import DespesaForm from '../../components/despesaForm/DespesaForm'
import { saveDespesa, onGetCollection, deleteDespesa } from '../../firebase/firebase'
import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'

export default function inici() {

      const [mostrarDespeses, setMostrarDespeses] = useState(true)
      const [mostraModal, setMostraModal] = useState(false)
      //const [despeses, setDespeses] = useState(null)
      const { documents: despeses } = useCollection('despeses');

      const [filtrarPerQuantia, setFiltrarPerQuantia] = useState(false)
      // hook personalitzat const { documents: despeses } = useCollection('despeses')
      const titol = "Benvinguts a l'app de despeses!!"

      const subtitol = "Registra't, crea els teus projectes, afegeix participants i comença a enregistrar despeses!!"

      /*
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
      */
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
 
      const handleTancar = () => {
        setMostraModal(false)
      }

  return (
    <div>
            <Titol titol={titol} subtitol={subtitol}/>
            <div>
                <button onClick={() => setFiltrarPerQuantia(true)}>Filtrar</button>
            </div>
    </div>
  )
}
