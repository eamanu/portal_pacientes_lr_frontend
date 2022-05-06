import { useState, useCallback, useEffect, createContext } from "react";
import loginService from "../services/loginService";
import Swal from "sweetalert2";
import { logOut, expiredSession, loginError } from "../components/SwalAlertData";
import { loginPersonService } from "../services/loginPersonService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState( JSON.parse(localStorage.getItem("user")) || null ); //hardcode
  const [tokenUser, setTokenUser] = useState( JSON.parse(localStorage.getItem("tokenUser")) || null );
  const [typeUser, setTypeUser ] =useState( JSON.parse(localStorage.getItem("typeUser")) || null); //note: 1 = admin / 2 = person
    const curtime = new Date().getTime();
    const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    try {
      delete user.password;
      localStorage.setItem("typeUser", JSON.stringify(typeUser));
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
      localStorage.removeItem("typeUser");
    }
  }, [user, tokenUser, typeUser]);

  const loginAdmin = useCallback(
    (u, p) => {
    loginService(u, p)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if(res.code === 401){
            Swal.fire(loginError);
          }
        }
      })
      .then((data) => {
        // console.log(data)
        // console.log("token", data.access_token);
        // console.log('data user', data.data);
        setTypeUser(1) //hardcode 
        setUser(data);
        setTokenUser(data.access_token);
        return tokenUser;
      })
      .catch((err) => {
        console.log('error: ', err);
        Swal.fire(loginError);
      });
  }, [tokenUser]);


  const loginPerson = useCallback(
    (u, p) => {
    loginPersonService(u, p)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if(res.code === 401){
            Swal.fire(loginError);
          }
        }
      })
      .then((data) => {
        console.log(data)
        // console.log("token", data.access_token);
        // console.log('data user', data.data);
        setUser(data.data);
        setTokenUser(data.access_token);
        setTypeUser(2) //hardcode 
        return tokenUser;
      })
      .catch((err) => {
        console.log('error: ', err);
        Swal.fire(loginError);
      });
  }, [tokenUser]);

  function getLocalStorage(key) { //note - debería suceder al hacer el login??
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
      deleteDataSession();
    }
  };

  const deleteDataSession = () => {
    // localStorage.removeItem("tokenUser");
    // localStorage.removeItem("curtime");
    // localStorage.removeItem("user");
    localStorage.clear()
    setTokenUser(null);
    setUser(null);
  };

  const newRegisterUser = (values) => {
    setNewUser(values);
  }

  const contextValue = {
    user,
    tokenUser,
    typeUser,
    loginPerson,
    loginAdmin,
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
    newRegisterUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
