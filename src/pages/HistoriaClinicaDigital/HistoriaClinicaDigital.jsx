import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { SidebarData } from '../../components/Sidebar/SidebarData'
import HCDRouter from './HCDRouter';
import SelectType from '../../components/SelectType';
import usePatient from '../../hooks/usePatient';
import institutionsServices from '../../services/institutionsServices';

const HistoriaClinicaDigital = () => {

    const p = usePatient();
    const datahc = SidebarData.perfilDelPaciente.find(d => d.id === 6)
    const routes = datahc.options;
    const [institutions, setInstitutions] = useState([]);
    const getInstitutions = useCallback(
        () => {
            institutionsServices()
                .then((res) => {
                    setInstitutions(res);
                    return institutions
                })
                .catch((err) => { console.log(err) })
        },
        [institutions],
    )

    useEffect(() => {
        getInstitutions()
    }, [])


    return (
        <Container className='historia-clinica p-3'>
            <h5 className='section-title'>Historia Clínica Digital</h5>
            <Row>
                <Col className='switch-container'>
                    {routes.map((route) => {
                        return (
                            <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                        )
                    })}
                </Col>
            </Row>
            <Row>
                <Col className='switch-container__hc'>
                    <Row className="my-3">
                        <Col xs={12} md="auto" className="d-flex align-items-center">
                            Buscar en institución
                        </Col>
                        <Col xs={12} md={8} className="d-flex align-items-center" >
                            <SelectType
                                name='institution'
                                variants={institutions}
                                selectValue={p.patientInstitution}
                                handleChange={e => p.changeInstitution(e)}
                            />
                        </Col>
                    </Row>
                    <HCDRouter></HCDRouter>
                </Col>
            </Row>

        </Container>
    )
}

export default HistoriaClinicaDigital;
