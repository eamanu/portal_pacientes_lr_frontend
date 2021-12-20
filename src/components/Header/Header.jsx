import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import useAuth from '../../auth/useAuth';

function Header() {
    const auth = useAuth();

    const handleClick = e => {
        e.preventDefault();
        auth.logout()
    }

    return (
        <div>
            <Navbar>
                <Container fluid>
                    <Navbar.Brand href="/">LOGO</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {auth.isLogged() &&
                                <>
                                    <button className="btn" onClick={handleClick}>Cerrar sesión</button>
                                    <NavLink activeClassName="active" className="me-2" to="/usuario">Home</NavLink>
                                </>
                            }
                            {!auth.isLogged() &&
                                <>
                                    <NavLink activeClassName="active" className="me-2" exact to="/login">Iniciar Sesión</NavLink>
                                    <NavLink activeClassName="active" className="me-2" exact to="/register">Registrarse</NavLink>
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
