import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { OnGetDespesa } from '../../firebase/firebase'

export default function DespesesDetall() {

    const { id } = useParams()
    const [despesa, setDespesa] = useState(null)

    const calcularRepartiment = () => {
        const { quantia, pagatPer, participants } = despesa;
        if (!participants || participants.length <= 1) return [];
      
        // Se excluye quien ha pagado
        const altres = participants.filter(p => p !== pagatPer);
        const quantitatPerPersona = (quantia / participants.length).toFixed(2);
      
        return altres.map(p => ({
          deutor: p,
          creditor: pagatPer,
          quantitat: quantitatPerPersona,
        }));
      };

    useEffect(() => {
        const unsubscribe = OnGetDespesa(id, (docSnap) => {
            if (docSnap.exists()) {
                setDespesa({...docSnap.data(), id:docSnap.id})
            } else {
                setDespesa(null)
            }
        })
        return () => unsubscribe()
    }, [id])

    if (!despesa) {
        return <p>Despesa no trobada</p>    
    }

  return (
    <div>
        <h2>
            Detall de la despesa
        </h2>
        <p><strong> Concepte: </strong>{despesa.concepte}</p>
        <p><strong> Quantia: </strong>{despesa.quantia} €</p>
        <p><strong> Pagat per: </strong>{despesa.pagatPer}</p>
        <h3>Repartiment</h3>
        <ul>
        {calcularRepartiment().map((linea, i) => (
            <li key={i}>
            {linea.deutor} li deu {linea.quantitat} € a {linea.creditor}
            </li>
        ))}
        </ul>
    </div>
  )
}
