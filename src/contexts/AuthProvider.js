import { useState, useCallback, useEffect, createContext } from "react";
import loginService from "../services/loginService";
import Swal from 'sweetalert2'

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
          // console.log("1", response.users)
          const getUser = response.users.find((user) => {
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
            Swal.fire({
              text: 'Error al ingresar nombre de usuario o contraseña.',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
          })
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

  const logout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#Dc3545'
  }).then((result) => {
      if (result.isConfirmed) {
          setUser(null)
      }
  })
  }

  const contextValue = {
    user,
    login,
    logout,
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
