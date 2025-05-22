import { useState } from 'react'
import './RegisterForm.css'

export default function RegisterForm() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Les contrasenyes no coincideixen');
            return;
        }

        setError("");
        console.log("Registre correcte");
    }

  return (
    <form className='register-form' onSubmit={handleRegister}>
        <label>
            <span>Nom:</span>
            <input type="text" />
        </label>
        <label>
            <span>Correu: </span>
            <input type="email" />
        </label>
        <label>
            <span>Contrasenya: </span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        <label>
            <span>Repetir Contrasenya: </span>
            <input type="password" value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value)} required />
        </label>

        {error && <p style={{ color: 'red'}}> {error} </p>}
        <button>Registre</button>
    </form>
  )
}
