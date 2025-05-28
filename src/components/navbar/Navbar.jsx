import { Link, useNavigate } from "react-router-dom"
import { isUserLoggedIn, logoutUser } from "../../firebase/firebase";
import { useEffect, useState } from "react";

export default function Navbar() {

  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const logout = () => {
    console.log("logout");
    logoutUser()
      .then(() => {
            setUserLoggedIn(false);
            navigate("/", {replace:true});
      }
    )}
    

  useEffect(() => {
    //Cridar mètode onAuthStateChanged per comprovar si usuari loggedIn: isUserLoggedIn i segons el que torni haurem de posar el setUserLoggedIn a true o false
    const res = isUserLoggedIn((user) => {
      if (user) {
        setUserLoggedIn(true);
        console.log("L'usuari està logejat");
      } else {
        setUserLoggedIn(false);
        console.log("L'usuari no està logejat");
      }
    })
  }, []);

  //Posam <> </> perque no em deixa retornar dos elements               <>
   /*               <li><Link to="/login">Login</Link></li>
                  <li><Link to="/registre">Registre</Link></li>
              </>

              */
  return (
    <nav>
        <ul>
            <li><Link to="/">Inici</Link></li>
  
            {!userLoggedIn && (
              <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/registre">Registre</Link></li>
              </>
            )}

            {userLoggedIn && 
              (
                <>
                  <li><Link to="/projectes">Projectes</Link></li>
                  <li><Link onClick={ () => logout() }>Tancar sessió</Link></li>
                </>

              )
            }
        </ul>
    </nav>
  )
}
