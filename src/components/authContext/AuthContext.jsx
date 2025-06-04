import { createContext, useContext, useState, useEffect } from 'react';
import { isUserLoggedIn } from '../../firebase/firebase.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = isUserLoggedIn((u) => {
      setUser(u); // u será null o el objeto user con uid, email, etc.
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);