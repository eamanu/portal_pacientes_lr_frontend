import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import PerfilUsuario from '../../pages/PerfilUsuario';

function Header() {
    const auth = useAuth();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = e => {
        e.preventDefault();
        auth.logout()
    }

    return (
        <div>
            <Navbar variant="none" className="navbar" fixed="top">
                <Container fluid>
                    <Navbar.Brand className='text-light'>LOGO</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {auth.isLogged() &&
                                <>
                                    {/* <NavLink activeClassName="active" className="me-2 p-2 text-light" to="/usuario">Home</NavLink> */}
                                    <NavDropdown title={`${auth.user.nombre} ${auth.user.apellido}`} id="basic-nav-dropdown">
                                        <button className="btn dropdown-item" onClick={handleShow}>Perfil del usuario</button>
                                        <NavLink className="dropdown-item" activeClassName="none" to="/usuario/grupo-familiar">Cambiar paciente</NavLink>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleClick}>Cerrar sesión</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                            {!auth.isLogged() &&
                                <>
                                    <NavLink activeClassName="active" className="me-2 p-2 text-light" exact to="/login">Iniciar Sesión</NavLink>
                                    <NavLink activeClassName="active" className="me-2 p-2 text-light" exact to="/register">Registrarse</NavLink>
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
