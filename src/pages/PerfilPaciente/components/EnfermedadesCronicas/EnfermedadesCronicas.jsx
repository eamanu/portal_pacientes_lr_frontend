import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

function EnfermedadesCronicas() {

  const [activeForm, setActiveForm] = useState(false)
  const agregarAfeccion = () => { setActiveForm(!activeForm); }

  return (
    <Row className='mb-4 in'>
      <h6 className='mt-3 fw-bold'>Afecciones y enfermedades crónicas</h6>
      <Col xs={12} md={6} className='d-flex'>
        {/* {activeForm &&
          <Form>
            <Form.Group className='mb-4'>
              <Form.Label>Afección crónica</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Seleccionar...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <Form.Label>¿Desde cuándo padece esta afección?</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Seleccionar...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <Form.Label>¿Se encuentra actualmente realizando trtamiento médico?</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Seleccionar...</option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </Form.Select>
              <Form.Label>¿Ha realizado tratamiento médico en el pasado?</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Seleccionar...</option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </Form.Select>
              <Form.Label>¿Cuándo comenzó?</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Seleccionar...</option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </Form.Select>
            </Form.Group>
            <button className='btn btn-outline-secondary me-2' onClick={agregarAfeccion}>Cancelar</button>
            <button type='submit' className='btn btn-dark' onClick={agregarAfeccion}>Guardar Cambios</button>
          </Form>
        } */}
        {/* {!activeForm && <button className='btn btn-outline-danger' onClick={agregarAfeccion}>+ Agregar</button>} */}
      </Col>
    </Row>
  )
}

export default EnfermedadesCronicas;
