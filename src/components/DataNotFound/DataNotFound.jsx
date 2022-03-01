import * as MdIcon from 'react-icons/md';

const DataNotFound = ({ text }) => {

    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <MdIcon.MdWarningAmber></MdIcon.MdWarningAmber>
            <p className="ps-2 m-0">
                No se encontraron datos sobre {text}.
            </p>
        </div>
    )
}
export default DataNotFound;
