import React from 'react';
import { Link } from "react-router-dom";
import Menu from '../../components/Menu';




function Login() {
    return (
        <div>
            <h1>Home</h1>
            <Link className="me-2" to="/grupo-familiar">Grupo Familiar</Link>
            <Link className="me-2" to="/">Historia Clínica</Link>
            <Link className="me-2" to="/programa-sumar">Programa Sumar</Link>
            <Link className="me-2" to="/calendario-de-vacunacion">Calendario de vacunación</Link>
        </div>
    )
}

export default Login;
