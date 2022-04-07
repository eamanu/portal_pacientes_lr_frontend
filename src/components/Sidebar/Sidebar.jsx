import '../../styles/Sidebar.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { SidebarData } from './SidebarData';


function Sidebar({ isActive, action }) {

    const location = useLocation();
    const thisLocation = location.pathname
    const sidebarData = SidebarData;
    const perfilDelPacienteOpciones = sidebarData.perfilDelPaciente
    const grupoFamiliarOpciones = sidebarData.grupoFamiliar
    const prop = [perfilDelPacienteOpciones, grupoFamiliarOpciones]

    const showAcordeon = (i, id) => {
        const promise = prop[i].find((item) => {
            return item.id === id
        })
        if (promise.a === false) {
            Object.defineProperty(promise, 'a', {
                value: true,
                writable: true
            });
        } else if (promise.a === true) {
            Object.defineProperty(promise, 'a', {
                value: false,
                writable: true
            });
        }
    }

    return (
        <>
            <div className={`sidebar ${isActive} `} >
                <ul>
                    {SidebarData.inicio.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={item.cName}
                                onClick={action} >
                                <NavLink
                                    activeClassName="active"
                                    exact
                                    to={item.path}>
                                    {item.icon}<span>{item.title} </span>
                                </NavLink>
                            </li>
                        )
                    })
                    }
                    <hr />
                    <p className='sidebar__title'>Grupo familiar</p>
                    {SidebarData.grupoFamiliar.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <NavLink
                                    activeClassName={item.path ? "active" : ""}
                                    exact
                                    to={item.path ? item.path : thisLocation}
                                    className='d-flex justify-content-between'
                                    onClick={item.acordeon ? () => { showAcordeon(1, item.id) } : action}>
                                    <span>{item.icon} {item.title}</span>
                                    {item.acordeon ?
                                        <p className={`m-0 ${item.a ? 'rotate' : 'norotate'}`}>{item.aIcon}</p>
                                        :
                                        <p className='m-0'></p>}
                                </NavLink>
                                {item.options ?
                                    <ul
                                        className={`sidebar-acordeon__container ${item.a ? 'active' : 'inactive'}`}
                                    >
                                        {item.options.map((option) => {
                                            return (
                                                <li
                                                    key={option.title}
                                                    className={item.cName}
                                                    onClick={action}>
                                                    <NavLink
                                                        to={option.path}>
                                                        <span>{option.title}</span>
                                                    </NavLink>
                                                </li>
                                            )
                                        })}
                                    </ul> :
                                    <ul></ul>
                                }
                            </li>
                        )
                    })
                    }
                    <hr />
                    <p className='sidebar__title'>Perfil del paciente</p>
                    {SidebarData.perfilDelPaciente.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <NavLink
                                    activeClassName={item.path ? "active" : ""}
                                    className='d-flex justify-content-between'
                                    exact
                                    to={item.path ? item.path : thisLocation}
                                    onClick={item.acordeon ? () => { showAcordeon(0, item.id) } : action}>
                                    <span className='d-flex align-items-center'>{item.icon}{item.title}</span>
                                    {item.acordeon ?
                                        <p className={`m-0 ${item.a ? 'rotate' : 'norotate'}`}>{item.aIcon}</p>
                                        :
                                        <p className='m-0'></p>}
                                </NavLink>
                                {item.options ?
                                    <ul
                                        className={`sidebar-acordeon__container ${item.a ? 'active-acordeon' : 'inactive'}`}
                                    >
                                        {item.options.map((option) => {
                                            return (
                                                <li
                                                    key={option.title}
                                                    className={item.cName}
                                                    onClick={action}>
                                                    <NavLink
                                                        to={option.path}>
                                                        <span>{option.title}</span>
                                                    </NavLink>
                                                </li>
                                            )
                                        })}
                                    </ul> :
                                    <ul></ul>
                                }
                            </li>
                        )
                    })
                    }

                    <hr />
                    <p className='sidebar__title'>Insituciones</p>
                    {SidebarData.instituciones.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={item.cName}
                                onClick={action} >
                                <NavLink
                                    activeClassName="active"
                                    exact
                                    to={item.path}>{item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            </li>
                        )
                    })
                    }
                </ul>
                <p className='footer-text'>v0.1.0 - 2022</p>
            </div>
        </>
    )
}

export default Sidebar;
