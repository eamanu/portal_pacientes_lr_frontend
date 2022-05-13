import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/statics/logo-ligth.png'
import useAuth from '../../hooks/useAuth';
import * as MdIcon from 'react-icons/md';
import * as BsIcon from 'react-icons/bs';
import Sidebar from '../Sidebar';
import Profile from '../Profile/Profile';
import Swal from 'sweetalert2';
import { logOut } from '../SwalAlertData';

function Header() {
    const auth = useAuth();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const location = useLocation()
    const mql = window.matchMedia("(min-width: 992px)")
    const [sidebar, setSidebar] = useState(false);
    const navbarDropdownTitle = 
            <span className='navbar_dropdown-title'>
                <p className='m-0 d-none d-lg-inline-block text-capitalize'>{auth.typeUser === 1 ? "Usuario administrador" : auth.user?.name + ' ' + auth.user?.surname}</p>
                <BsIcon.BsPersonCircle className='user-icon'></BsIcon.BsPersonCircle>
            </span>
    

    const handleClick = e => {
        e.preventDefault();
        Swal.fire(logOut).then((result) => {
            if (result.isConfirmed) {
                auth.logout()
            }
          });
    }

    // Media query sidebar
    const showSidebar = () => {
        if (mql.matches) {
            setSidebar(true)
        } else {
            setSidebar(!sidebar);
        }
    }
    useEffect(() => {
        if (mql.matches) {
            setSidebar(true)
        } else {
            setSidebar(false)
        }
    }, [mql.matches])

    return (
        <>
            <Navbar variant="none" fixed="top">
                <Container fluid>
                    {auth.isLogged() && <div className='d-flex d-lg-none align-items-center me-2'>
                        <button className='btn menu-btn text-light' onClick={showSidebar}>
                            <MdIcon.MdViewHeadline className={`menu-icon ${sidebar ? 'd-none' : 'd-block in'}`} />
                            <MdIcon.MdClose className={`menu-icon ${sidebar ? 'd-block in' : 'd-none'}`} />
                        </button>
                    </div>}
                    <Link to='/' className={`d-flex ${auth.isLogged() ? 'w-100 justify-content-center justify-content-lg-start' : 'justify-content-start'}`} >
                        <img className="logo" src={logo} alt="logo portal del paciente - La Rioja" />
                     {location.pathname === "/login-admin" || auth.typeUser === 1 ? <p className="mb-0 ms-2 admin-header-text d-none d-sm-block"> / administrador </p> : <></>}
                     </Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {auth.isLogged() &&
                                <>

                                    <NavDropdown title={navbarDropdownTitle} id="basic-nav-dropdown">
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
            {show && <Profile type={'user'} show={show} handleClose={handleClose} />}
            <div className={`container-block ${sidebar ? 'show' : 'close'}`} onClick={showSidebar}></div>
            {auth.isLogged() && <Sidebar isActive={sidebar ? 'show' : 'close'} action={showSidebar} ></Sidebar>}
        </>
    )
}

export default Header;
