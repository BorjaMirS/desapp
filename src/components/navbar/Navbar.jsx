import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav>
        <ul>
            <li><Link to="/">Inici</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registre">Registre</Link></li>
        </ul>
    </nav>
  )
}
