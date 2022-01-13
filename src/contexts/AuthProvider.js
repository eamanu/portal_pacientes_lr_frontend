import { useState, useCallback, useEffect, createContext } from "react";
import loginService from "../services/loginService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [newUser, setNewUser] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      localStorage.removeItem("user");
      console.log(error);
    }
  }, [user]);

  const login = useCallback(
    (em, p) => {
      loginService(em, p)
        .then((response) => {
          const getUser = response.find((user) => {
            return user.email === em;
          });
          return getUser;
        })
        .then((response) => {
          if (response) {
            console.log(response);
            setUser(response);
            return user;
          } else {
            alert("Error al ingresar nombre de usuario o contraseña");
          }
        })
        .catch((err) => console.log(err));
    },
    [user]
  );

  const register = useCallback(
    (objet) =>{
      console.log(objet);
      setNewUser(objet);
    },
    []
  )

  const contextValue = {
    user,
    login,
    logout() {
      setUser(null);
    },
    isLogged() {
      return !!user;
    },
    newUser,
    register
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
