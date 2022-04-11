import { useState, useCallback, useEffect, createContext } from "react";
import { loginServiceFetch } from "../services/loginService";
import loginService from "../services/loginService";
import Swal from "sweetalert2";
import { registerPersonService } from "../services/registerServices";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  ); //hardcode
  const [newUser, setNewUser] = useState(false);
  const [tokenUser, setTokenUser] = useState(
    JSON.parse(localStorage.getItem("tokenUser")) || null
  );

  useEffect(() => {
    try {
      delete user.password;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tokenUser", JSON.stringify(tokenUser));
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("tokenUser");
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
        console.log('token', data.access_token);
        // console.log('data', data);
        setTokenUser(data.access_token);
        return tokenUser;
      })
      .catch((err) => console.log("error", err));
  }, [tokenUser]);

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
        setTokenUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("tokenUser");
      }
    });
  };

  const register = useCallback((body) => {
    console.log('body', body);
    setNewUser(body);
    registerPersonService(body)
    .then((response) => {
      console.log(response)
    })
    .catch(err => console.log(err))
  }, []);

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
