import React from 'react';
import useAuth from '../../hooks/useAuth';

function Footer() {
    const auth = useAuth()

    return (
        <div className={`main-footer ${auth.isLogged() ? 'footer-private' : 'footer-public'}`}>
            <div className='container-fluid'>
                <div className='row'>
                    <p className='col-sm '>
                        &copy;{new Date().getFullYear()} Gobierno de La Rioja |  Ministerio de Salud  | Fundación FEIAS
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer;