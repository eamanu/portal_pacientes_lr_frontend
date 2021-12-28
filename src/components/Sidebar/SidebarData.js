import React from "react";
import * as MdIcon from 'react-icons/md'
import * as FaIcon from 'react-icons/fa'

export const SidebarData = [
    {
        title: "Grupo Familiar",
        path: "/usuario/grupo-familiar",
        icon: <MdIcon.MdFamilyRestroom className="menu-icon"/>,
        cName: "sidebar-text"
    },
    {
        title: "Historia Clínica",
        path: "/usuario/historia-clinica",
        icon: <MdIcon.MdFolderShared className="menu-icon"/>,
        cName: "sidebar-text"
    },
    {
        title: "Calendario de vacunacion",
        path: "/usuario/calendario-vacunacion",
        icon: <MdIcon.MdEditCalendar className="menu-icon"/>,
        cName: "sidebar-text"
    },
    {
        title: "Programa Sumar",
        path: "/usuario/programa-sumar",
        icon: <MdIcon.MdAddCircleOutline className="menu-icon"/>,
        cName: "sidebar-text"
    },
    {
        title: "Instituciones",
        path: "/usuario/instituciones",
        icon: <FaIcon.FaHospital className="menu-icon"/>,
        cName: "sidebar-text"
    }
]