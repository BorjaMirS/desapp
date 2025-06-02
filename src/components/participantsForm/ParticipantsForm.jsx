import React, { useEffect, useState } from 'react';
import { onGetCollection } from '../../firebase/firebase';

export default function ParticipantsForm({ projecte, handleParticipants, handleTancar }) {
  const [participantsSeleccionats, setParticipantsSeleccionats] = useState(projecte.participants || []);
  const [nouParticipant, setNouParticipant] = useState('');

  const toggleParticipant = (nom) => {
    setParticipantsSeleccionats(prev =>
      prev.includes(nom)
        ? prev.filter(p => p !== nom)
        : [...prev, nom]
    );
  };

  const afegirNouParticipant = () => {
    if (nouParticipant && !participantsSeleccionats.includes(nouParticipant)) {
      setParticipantsSeleccionats(prev => [...prev, nouParticipant]);
      setNouParticipant('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleParticipants(participantsSeleccionats);
    handleTancar();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Gestionar Participants</h3>
      {participantsSeleccionats.map((participant, index) => (
        <label key={index}>
          <input
            type="checkbox"
            checked={participantsSeleccionats.includes(participant)}
            onChange={() => toggleParticipant(participant)}
          />
          {participant}
        </label>
      ))}
      <div>
        <input
          type="text"
          placeholder="Afegir nou participant"
          value={nouParticipant}
          onChange={(e) => setNouParticipant(e.target.value)}
        />
        <button type="button" onClick={afegirNouParticipant}>Afegir</button>
      </div>
      <button type="submit">Desar</button>
    </form>
  );
}
