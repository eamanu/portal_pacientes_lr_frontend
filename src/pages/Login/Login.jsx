import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDb from '../../hooks/useDb';
import axios from 'axios';
import Cookies from 'universal-cookie/es6';

const API = "http://localhost:3001/users";

function Login() {

    const db = API

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        login()
    }

    const login = async () => {
        await axios.get(db, { params: { email: email, password: password, } })
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(response => {
                if(response.length>0){
                    navigate("/")
                } else {
                    alert('usuario o contraseña incorrecto')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <h1>Login</h1>
            <div className="form-group">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Usuario: email</label>
                    <input
                        name="email"
                        type="text"
                        className="form-control"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <label htmlFor="">Contraseña:</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <button className="btn btn-primary" >Iniciar Sesión</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
