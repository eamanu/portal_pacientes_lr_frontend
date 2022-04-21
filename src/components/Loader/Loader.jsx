import { Spinner } from "react-bootstrap";

const Loader = (prop) => {

    let isActive = prop.isActive

    return (
        <div className={`loader_container ${isActive ? 'd-block' : 'd-none'}`}>
            <Spinner animation="border" variant="danger" />
        </div>
    )
}

export default Loader