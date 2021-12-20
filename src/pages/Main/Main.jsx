import React from 'react';

import Sidebar from '../../components/Sidebar';

function Main({ children }) {


    return (
            <div className='d-flex'>
                <Sidebar></Sidebar>
                < h1 className=''> Paciente: Nombre</h1 >
                <div className='content'>
                </div>
            </div>
    )
}

export default Main;
