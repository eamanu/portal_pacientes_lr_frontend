import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/statics/logo-ligth.png'
import useAuth from '../../hooks/useAuth';
import PerfilUsuario from '../../pages/PerfilUsuario';
import * as MdIcon from 'react-icons/md'
import * as FaIcon from 'react-icons/fa'

function Header() {
    const auth = useAuth();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const location = useLocation()

    const handleClick = e => {
        e.preventDefault();
        auth.logout()
    }

    return (
        <div>
            <Navbar variant="none" className="navbar" fixed="top">
                <Container fluid>
                    <Link to='/usuario'><Navbar.Brand className='text-light'><img className="logo" src={logo} alt="logo portal del paciente - La Rioja" /></Navbar.Brand></Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {auth.isLogged() &&
                                <>
                                    <NavDropdown title={`${auth.user.nombre} ${auth.user.apellido}`} id="basic-nav-dropdown">
                                        <button className="btn dropdown-item" onClick={handleShow}><MdIcon.MdPerson className='me-2' />Perfil del usuario</button>
                                        <button className="btn dropdown-item"><MdIcon.MdOutlineSettings className='me-2' />Soporte técnico</button>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleClick}><MdIcon.MdLogout className='me-2' />Cerrar sesión</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                            {!auth.isLogged() &&
                                <>
                                    {location.pathname === "/register" && <NavLink activeClassName="active-link" className="text-light" exact to="/login">Iniciar Sesión</NavLink>}
                                    {location.pathname === "/login" && <NavLink activeClassName="active-link" className="text-light" exact to="/register">Registrarse</NavLink>}
                                </>
                            }

                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <PerfilUsuario show={show} handleClose={handleClose} />
        </div>
    )
}

export default Header;
