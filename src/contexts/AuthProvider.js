import { useState, useCallback, useEffect, createContext } from "react";
import loginService from "../services/loginService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      localStorage.removeItem("user");
      console.log(error);
    }
  }, [user]);

  const login = useCallback(
    (u, p) => {
      loginService(u, p)
        .then((response) => {
          const getUser = response.find((user) => {
            return user.username === u;
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

  const contextValue = {
    user,
    login,
    logout() {
      setUser(null);
    },
    isLogged() {
      return !!user;
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
