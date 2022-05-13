import { Container } from "react-bootstrap";

export default function Telefonos() {
    return (
        <Container>
            <div className='main-telefonos mt-3'>
                <div className="container">
                    <div className="row">
                        {/*colum1*/}
                        <div className="encabezado">
                            <h4 className='mb-0 py-1 text-uppercase'>Contacto</h4>
                        </div>
                        <div className="col-12 col-md-6">
                            <h5 className="mt-3">Ministerio de Salud</h5>
                            <h6>Gobierno de La Rioja</h6>

                            <ul className="list-unstyled">
                                <li>Dirección: Av. Ortiz de Ocampo 1700 -</li>
                                <li>Ciudad de La Rioja, Argentina</li>
                                <li>Código postal: 5300</li>
                                <li>Teléfono: (0380) 4453700</li>
                                <li>Horarios: Lunes a Viernes de 8.00 a 16.00 HS</li>
                                <li><a href="https://salud.larioja.gob.ar/">salud.larioja.gob.ar</a> </li>
                            </ul>
                            <br />
                            <br />
                            <br /><br /><br />
                        </div>
                        {/*colum2*/}
                        {/* <div className="col">
                        <br />
                        
                    </div> */}

                        {/*colum3*/}

                    </div>

                </div>

            </div>
        </Container>
    )
}
