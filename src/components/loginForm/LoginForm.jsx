import React from 'react'
import './LoginForm.css'
import { loginUser } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login");

    const res = await loginUser(email , password);

    if (res.code == undefined) {
      console.log(res.user.uid);
      navigate("/projectes");
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
        <button>Login</button>
    </form>
  )
}
