import { useState, useCallback, useEffect, createContext } from "react";
import { loginServiceFetch } from "../services/loginService";
import loginService from "../services/loginService";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [newUser, setNewUser] = useState(false);
  const [tokenUser, setTokenUser] = useState(
    JSON.parse(localStorage.getItem("tokenUser")) || null
  );

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tokenUser", JSON.stringify(tokenUser));
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("tokenUser");
      // console.log(error);
    }
  }, [user, tokenUser]);

  const login = useCallback(
    (em, p) => {
      loginService(em, p)
        .then((response) => {
          const getUser = response.users.find((user) => {
            if (user.email === em && user.password == p) {
              return user.email === em;
            }
          });
          return getUser;
        })
        .then((response) => {
          if (response) {
            // console.log(response);
            setUser(response);
            return user;
          } else {
            Swal.fire({
              text: "Error al ingresar nombre de usuario o contraseña.",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((err) => console.log(err));
    },
    [user]
  );

  const loginFetch = useCallback(() => {
    loginServiceFetch()
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .then((data) => {
        console.log('data', data.access_token);
        setTokenUser(data.access_token);
        return tokenUser;
      })
      .catch((err) => console.log('error', err));
  }, [tokenUser]);

  const register = useCallback((objet) => {
    console.log(objet);
    setNewUser(objet);
  }, []);

  const logout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#Dc3545",
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null);
      }
    });
  };

  const contextValue = {
    user,
    tokenUser,
    login,
    loginFetch,
    logout,
    isLogged() {
      return !!user;
    },
    newUser,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
