import React from 'react'

export default function LoginForm() {
  return (
    <form className="login-form">
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
