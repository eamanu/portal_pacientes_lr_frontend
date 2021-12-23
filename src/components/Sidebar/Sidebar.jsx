import React from 'react';
import '../../styles/Sidebar.scss';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import * as MdIcon from 'react-icons/md'

function Sidebar({isActive, action}) {
    return (
        <div className={`sidebar ${isActive}`}>
        {/* <div className="sidebar close"> */}
            <button className='btn text-light' onClick={action}><MdIcon.MdClose className='menu-icon'></MdIcon.MdClose></button>
            <ul>
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName} onClick={action}>
                    <NavLink activeClassName="active" exact to={item.path}>{item.icon} <span>{item.title}</span></NavLink>
                </li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Sidebar;
