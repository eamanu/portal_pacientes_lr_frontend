import React from 'react';
import '../../styles/Sidebar.scss';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink activeClassName="active" className="me-2" exact to="/usuario/grupo-familair">Grupo Familiar</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" className="me-2" exact to="/usuario/historia-clinica">Historia Clínica</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" className="me-2" exact to="/usuario/calendario-vacunacion">Calendario de vacunación</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" className="me-2" exact to="/usuario/programa-sumar">Programa Sumar</NavLink>
                </li>
               
            </ul>
        </div>
    )
}

export default Sidebar;
