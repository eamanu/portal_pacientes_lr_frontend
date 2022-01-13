import React from "react";
import * as MdIcon from "react-icons/md";
import * as FaIcon from "react-icons/fa";
// import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


export const SidebarData = {
  inicio: [
    {
      id: 1,
      title: "Inicio",
      path: "/usuario",
      icon: <MdIcon.MdOutlineHome className="menu-icon" />,
      acordeon: false,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: false,
    },
  ],
  perfilDelPaciente: [
    {
      id: 2,
      title: "Ver Perfil",
      path: "/usuario/perfil-del-paciente",
      icon: <MdIcon.MdPerson className="menu-icon" />,
      acordeon: false,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: false,
    },
    {
      id: 3,
      title: "Notificaciones",
      path: "/usuario/notificaciones",
      icon: <FaIcon.FaBell className="menu-icon" />,
      acordeon: false,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: false,
    },
    {
      id: 4,
      title: "Turnos",
      path: false,
      icon: <MdIcon.MdOutlineWatchLater className="menu-icon" />,
      acordeon: true,
      a: false,
      cName: "sidebar-text acordeon",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: [
        {
          title: "Mis turnos",
          path: "/usuario/turnos"
        }, 
        {
          title: "Reservar turno",
          path: "/usuario/turnos/reservar-turno"
        }, 
        {
          title: "Historial",
          path: "/usuario/turnos/historial"
        }
      ]
    },
    {
      id: 5,
      title: "Estudios",
      path: "/usuario/estudios",
      icon: <MdIcon.MdTextSnippet className="menu-icon" />,
      acordeon: false,
      a: false,
      cName: "sidebar-text acordeon",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: false,
    },
    {
      id: 6,
      title: "Historia Clínica",
      path: false,
      icon: <MdIcon.MdFolderShared className="menu-icon" />,
      acordeon: true,
      a: false,
      cName: "sidebar-text acordeon",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: [
        {
          title: "Controles",
          path: "/usuario/historia-clinica"
        }, 
        {
          title: "Signos vitales",
          path: "/usuario/historia-clinica/signos-vitales"
        }, 
      ],
    },
    {
      id: 7,
      title: "Vacunación",
      path: false,
      icon: <MdIcon.MdEditCalendar className="menu-icon" />,
      acordeon: true,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options:[
        {
          title: "Turno de vacunación",
          path: "/usuario/calendario-vacunacion"
        }, 
        {
          title: "Historial",
          path: "/usuario/calendario-vacunacion/historial"
        }
      ],
    },
    {
      id: 8,
      title: "Programa Sumar",
      path: "/usuario/programa-sumar",
      icon: <MdIcon.MdAddCircleOutline className="menu-icon" />,
      acordeon: false,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: false,
    },
  ],
  grupoFamiliar: [
    {
      id: 9,
      title: "Ver Pacientes",
      path: "/usuario/grupo-familiar",
      icon: <MdIcon.MdFamilyRestroom className="menu-icon" />,
      acordeon: false,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: false,
    },
    {
      id: 10,
      title: "Cambiar Paciente",
      path: false,
      icon: <MdIcon.MdOutlineChangeCircle className="menu-icon" />,
      acordeon: true,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: [ ],
    },
  ],
  instituciones: [
    {
      id: 11,
      title: "Centros de salud",
      path: "/usuario/instituciones",
      icon: <FaIcon.FaHospital className="menu-icon" />,
      acordeon: false,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: false,
    },
    {
      id: 12,
      title: "Guardias",
      path: "/usuario/instituciones",
      icon: <MdIcon.MdEmergency className="menu-icon" />,
      acordeon: false,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: false,
    },
    {
      id: 13,
      title: "Teléfonos importantes",
      path: "/usuario/instituciones",
      icon: <MdIcon.MdLocalPhone className="menu-icon" />,
      acordeon: false,
      a: false,
      cName: "sidebar-text",
      aIcon: <MdIcon.MdKeyboardArrowDown className="menu-icon" />,
      options: false,
    },
  ],
};
