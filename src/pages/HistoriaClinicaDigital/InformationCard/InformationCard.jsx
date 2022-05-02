import { Card } from 'react-bootstrap';

const InformationCard = (props) => {

    const { date, group, subgroup, description, diagnosis, code, weight, blood_pressure } = props
    const formatDate = date.split('T')[0]

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Header>
                <span className='fw-lighter mb-0'>Fecha: {formatDate || ' - '}</span> | <span className="mb-0">{group || ' - '}</span>
            </Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>Código: {code || ' - '}</p>
                    <p>Subgrupo: <span>{subgroup || ' - '}</span></p>
                    <p>Descripción: <span>{description || ' - '}</span></p>
                    <p>Diagnóstico: <span>{diagnosis || ' - '}</span></p>
                    <footer className="blockquote-footer">
                        <p>Peso: <span>{weight || ' - '}</span></p>
                        <p>Tensión arterial: <span>{blood_pressure || ' - '}</span></p>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}

export default InformationCard