import React, { useState } from 'react'
import './LoginForm.css'
import { loginUser } from '../../firebase/firebase';
import { useNavigate, Navigate } from 'react-router-dom';
export default function LoginForm() {

  const [password, setPassword] = useState('');
  const [email, setEmail ] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login");

    const res = await loginUser(email , password);

    console.log("Resposta:", res);

    if (res.code == undefined) {
      console.log(res.user.uid);
     // navigate("/projectes", {replace:true});
     return <Navigate to="/" replace />
    } else {
      setError(res.message);
    }
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
        <label >
            <span>Correu:</span> 
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        <label>
            <span>Contrasenya: 8 caràcters</span>
            <input type="password" minLength="8" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        {error && <p style={{ color: 'red'}}> {error} </p>}
        <button>Login</button>
    </form>
  )
}
