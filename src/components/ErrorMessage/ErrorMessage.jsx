import { Col } from "react-bootstrap"

export const ErrorMessage = ({ children }) => {

    return (
        <div className={`error-form show `}>
            {children}
        </div>
    )
}
