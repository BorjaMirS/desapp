import { Link } from "react-router-dom"
import { logoutUser } from "../../firebase/firebase";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const logout = () => {
    console.log("logout");
    logoutUser()
      .then(
        setUserLoggedIn(false)
        //navigate /home
      );
    
  } 

  useEffect(() => {
    //Cridar mètode onAuthStateChanged per comprovar si usuari loggedIn: isUserLoggedIn i segons el que torni haurem de posar el setUserLoggedIn a true o false
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
                <li><Link onClick={ () => logout() }>Tancar sessió</Link></li>
              )
            }
        </ul>
    </nav>
  )
}
