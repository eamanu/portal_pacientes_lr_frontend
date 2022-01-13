export const ErrorMessage = ({ children }) => {

    return (
        <div className="error-form__container" >
            <div className={`error-form show `}>
                    {children}
            </div>
        </div>
    )
}
