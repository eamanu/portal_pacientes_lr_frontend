import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import useAuth from '../../auth/useAuth';
// import * as MdIcon from 'react-icons/md'
// import Sidebar from '../Sidebar';

function Header() {
    const auth = useAuth();
    const user = auth.user;
    console.log(user)


    const handleClick = e => {
        e.preventDefault();
        auth.logout()
    }

    return (
        <div>
            <Navbar variant="none" className="navbar">
                <Container fluid>
                    <Navbar.Brand href='/' className='text-light'>LOGO</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {auth.isLogged() &&
                                <>
                                    {/* <NavLink activeClassName="active" className="me-2 p-2 text-light" to="/usuario">Home</NavLink> */}
                                    <NavDropdown title={`${auth.user.nombre} ${auth.user.apellido}`} id="basic-nav-dropdown">
                                        <NavDropdown.Item><NavLink activeClassName="none" to="/usuario">Perfil del usuario</NavLink></NavDropdown.Item>
                                        <NavDropdown.Item><NavLink activeClassName="none" to="/usuario/grupo-familiar">Cambiar paciente</NavLink></NavDropdown.Item>
                                        <NavDropdown.Divider  />
                                        <NavDropdown.Item  onClick={handleClick}>Cerrar sesión</NavDropdown.Item>
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
        </div>
    )
}

export default Header;
