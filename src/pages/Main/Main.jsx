// import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
// import logoFondoRojo from '../../assets/statics/logo-fondo-rojo.jpg'
import logoFondoBlanco from '../../assets/statics/logo-fondo-blanco.jpg'
import Swal from 'sweetalert2';
import * as MdIcon from 'react-icons/md';
import { useEffect } from 'react';

const Main = () => {

    const links = [
        { id: 1, path: "/usuario/grupo-familiar", namePath: "Grupo Familiar", icon: <MdIcon.MdFamilyRestroom className="main__icon" /> },
        { id: 2, path: "/usuario/historia-clinica", namePath: "Historia Clínica", icon: <MdIcon.MdFolderShared className="main__icon" /> },
        { id: 3, path: "/usuario/calendario-vacunacion", namePath: "Calendario de Vacunación", icon: <MdIcon.MdEditCalendar className="main__icon" /> },
        { id: 4, path: "/usuario/programa-sumar", namePath: "Programa Sumar", icon: <MdIcon.MdAddCircleOutline className="main__icon" /> }
    ]
    
    // const history = useHistory();

    // useEffect(() => {
    //     Swal.fire({
    //         title: '¡Bienvenido!',
    //         text: 'Hay datos incompletos en el Perfil del Paciente. ¿Te gustaría completarlos ahora?',
    //         showCancelButton: true,
    //         cancelButtonText: 'No, completar Luego',
    //         confirmButtonText: 'Sí, ir al Perfil del Paciente',
    //         confirmButtonColor: '#000000'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             history.push('/usuario/perfil-paciente');
    //         }
    //     })
    // }, [history])
    
    return (
        <Container className="main pt-5">
            <Row>
                <Col>
                    <img className='main__banner' src={logoFondoBlanco} alt="logo fondo reojo - portal del paciente la rioja" />
                </Col>
            </Row>
            <h1 className='main__title'>Bienvenido</h1>
            <Row className="mt-5 d-flex justify-content-center p-3">
                {links.map((link) =>
                    <Col key={link.id} xs={12} md={5} className='main__card'>
                        <Link className="btn btn-outline-danger" to={link.path}>
                            {link.icon}
                            <h5>{link.namePath}</h5>
                        </Link>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default Main;
