import { useState, useCallback, useEffect, createContext } from "react";
import { loginServiceFetch } from "../services/loginService";
import loginService from "../services/loginService";
import Swal from "sweetalert2";
import { logOut, expiredSession, loginError } from "../components/SwalAlertData";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  ); //hardcode
  const [newUser, setNewUser] = useState(false);
  const [tokenUser, setTokenUser] = useState(
    JSON.parse(localStorage.getItem("tokenUser")) || null
  );
  const curtime = new Date().getTime();

  useEffect(() => {
    {try {
      delete user.password;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tokenUser", JSON.stringify(tokenUser));
      if(tokenUser){
        if(!localStorage.getItem('curtime')){
          localStorage.setItem('curtime', curtime)
        }
      } else {
        localStorage.removeItem('curtime')
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("tokenUser");
    }}
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
            Swal.fire(loginError);
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
        console.log("token", data.access_token);
        // console.log('data', data);
        setTokenUser(data.access_token);
        return tokenUser;
      })
      .catch((err) => console.log("error", err));
  }, [tokenUser]);

  const register = useCallback((objet) => {
    console.log(objet);
    setNewUser(objet);
  }, []);

  function getLocalStorage(key) {
    let exp = 60 * 60 * 24 * 1000; //hardcode - milisegundo en un día
    // let exp = 10000;
    if (localStorage.getItem(key)) {
      let vals = localStorage.getItem(key);
      let data = JSON.parse(vals);
      let isTimed = new Date().getTime() - data > exp;
      if (isTimed) {
        console.log("El almacenamiento ha expirado");
        setTokenUser(null);
        logout(isTimed);
        return null;
      } else {
        var newValue = data;
      }
      return newValue;
    } else {
      return null;
    }
  }

  useEffect(() => { 
    getLocalStorage("curtime");
  }, []);

  const logout = (expired) => {
    if (expired) {
      Swal.fire(expiredSession).then((result) => {
        if (result.isConfirmed) {
          deleteDataSession();
        }
      });
    } else {
      Swal.fire(logOut).then((result) => {
        if (result.isConfirmed) {
          deleteDataSession();
        }
      });
    }
  };

  const deleteDataSession = () => {
    localStorage.removeItem("tokenUser");
    localStorage.removeItem("curtime");
    localStorage.removeItem("user");
    setTokenUser(null);
    setUser(null);
  };

  const contextValue = {
    user,
    tokenUser,
    login,
    loginFetch,
    logout,
    isLogged() {
      getLocalStorage("curtime");
      if (tokenUser) {
        return true;
      } else {
        return false;
      }
    },
    newUser,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
