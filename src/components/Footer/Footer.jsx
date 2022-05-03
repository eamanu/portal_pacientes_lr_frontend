import React from 'react';
import useAuth from '../../hooks/useAuth';

function Footer() {
    const auth = useAuth()

    return (
        <div className={`main-footer ${auth.user ? 'bg-light text-secondary shadow-lg' : 'bg-none text-light shadow-none'}`}>
            <div className='container-fluid'>
                <div className='row'>
                    <p className='col-sm d-flex d-md-none  opacity-75 text-secondary'>
                        &copy;{new Date().getFullYear()} Gobierno de La Rioja |  Ministerio de Salud  | Fundación FEIAS
                    </p>
                    <p className='col-sm d-none d-md-flex'>
                        &copy;{new Date().getFullYear()} Gobierno de La Rioja |  Ministerio de Salud  | Fundación FEIAS
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer;