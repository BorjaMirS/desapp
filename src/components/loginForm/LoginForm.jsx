import React from 'react'
import './LoginForm.css'
export default function LoginForm() {

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login");
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
        <label >
            <span>Correu:</span> 
            <input type="email" id='email'/>
        </label>
        <label>
            <span>Contrasenya: 8 caràcters</span>
            <input type="password" minLength="8"/>
        </label>
        <button>Login</button>
    </form>
  )
}
