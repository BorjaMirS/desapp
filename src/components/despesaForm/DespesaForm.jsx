import { useEffect, useState } from 'react';
import './DespesaForm.css'


export default function DespesaForm({afegirDespesa, projecte}) {

  const [concepte, setConcepte] = useState("")
  const [quantia, setQuantia] = useState("")
  const [pagatPer, setPagatPer] = useState("")
  const [participantsImplicats, setParticipantsImplicats] = useState([]);

  const resetForm = () => {
    setConcepte("")
    setQuantia("")
    setPagatPer("")
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }; 

  useEffect(() => {
    if (projecte?.participants?.length > 0) {
      setPagatPer(projecte.participants[0]);
      setParticipantsImplicats(projecte.participants);
    }
  }, [projecte]);

  const handleSubmit = (e) => {
    e.preventDefault()

    const despesa = {
      concepte: concepte,
      quantia: quantia,
      pagatPer: pagatPer,
      projecte: projecte.id,
      participants: participantsImplicats 
    }

    console.log(despesa)

    afegirDespesa(despesa)

    resetForm()
  }


  return (
    <form className="despesa-form" onSubmit={handleSubmit}>
        <label>
            <span>Concepte</span>  
            <input type="text" onChange={(e) => setConcepte(e.target.value)} value={concepte}/>          
        </label>
        <label>
            <span>Quantia</span>  
            <input type="text" onChange={(e) => setQuantia(e.target.value)} value={quantia}/>          
        </label>
        <label>
          <span>Pagat per</span>  
          <select value={pagatPer} onChange={(e) => setPagatPer(e.target.value)}>
            {
              projecte.participants.map((participant, index) => (
                <option key={index} value={participant}>{participant}</option>
              ))
            }
          </select>
        </label>
      {projecte.participants?.filter(participant => participant !== pagatPer)
      .map((participant) => (
        <label key={participant}>
          <input
            type="checkbox"
            value={participant}
            checked={participantsImplicats.includes(participant)}
            onChange={() => {
              setParticipantsImplicats((prev) =>
                prev.includes(participant)
                  ? prev.filter((p) => p !== participant)
                  : [...prev, participant]
              );
            }}
              />
            {participant}
          </label>
          ))}
        <button>Afegir</button>
        <p>CONCEPTE: { concepte } Quantia: {quantia} Pagat per: {pagatPer}</p>
        <p onClick={resetForm}>Restablir els valors inicials</p>
    </form>
  )
}
