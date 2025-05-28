import { useState } from 'react'
import './RegisterForm.css'
import { registerUser, saveCollection } from '../../firebase/firebase';

export default function RegisterForm() {

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Firebase
    
    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Les contrasenyes no coincideixen');
            return;
        } 

        const  res = await registerUser(email, password);
        console.log(res);
        setError("");

        if (res.code == undefined) {
            saveCollection("participants", {uid: res.user.uid, email, name})
                .then((user) => {
                    console.log(user);
                    console.log("Nom: ",name);
                    console.log("Usuari registrat correctament");
                });
        } else {
            setError(res.message);
        }

        console.log("Registre correcte");
    }

  return (
    <form className='register-form' onSubmit={handleRegister}>
        <label>
            <span>Nom:</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
        </label>
        <label>
            <span>Correu: </span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
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
