import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container fluid className="d-flex h-100 w-100 align-items-center justify-content-end">
            <Row >
                <Col>
                    <h1 className="text-danger">Error 404... Página no encontrada</h1>
                    <Link to="/">Volver al inicio</Link>
                </Col>
            </Row>
        </Container>
    )
}
