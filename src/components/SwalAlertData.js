export const successRegister = {
  title: "Registro realizado",
  html: "Inicie sesión nuevamente para cargar nuevos datos. ",
  icon: "success",
  showCancelButton: false,
  confirmButtonText: "Continuar",
  confirmButtonColor: "#007bff",
};

export const errorActivePatient = {
  title: "Error al activar paciente",
  html: "Intente iniciar sesión nuevamente. ",
  icon: "error",
  showCancelButton: false,
  confirmButtonText: "Aceptar",
  confirmButtonColor: "#007bff",
};

export const logOut = {
  title: "¿Cerrar sesión?",
  icon: "warning",
  showCancelButton: true,
  cancelButtonText: "Cancelar",
  confirmButtonText: "Confirmar",
  confirmButtonColor: "#007bff",
  reverseButtons: true,
};

export const expiredSession = {
  title: "La sesión ha expirado",
  icon: "warning",
  showCancelButton: false,
  confirmButtonText: "Aceptar",
  confirmButtonColor: "#007bff",
};

export const error = (error) => {
  let content = {
    text: error,
    icon: "error",
    showConfirmButton: false,
    timer: 2000,
  };
  return content;
};

export const confirm = (text, is_success) => {
  let content = {
    title: text,
    icon: is_success ? "success" : "warning",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
    confirmButtonColor: "#007bff",
    reverseButtons: true,
  };
  return content;
};

export const success = (text) => {
  let content = {
    title: text,
    icon: "success",
    showCancelButton: false,
    showConfirmButton: false,
    timer: 2000,
  };
  return content;
};

export const warning = (text) => {
  let content = {
    text: text,
    icon: "warning",
    showConfirmButton: false,
    timer: 2000,
  };
  return content;
};

export const toastPatient = (text) => {
  let content = {
    position: "bottom-end",
    icon: "success",
    title: `Perfil de paciente ${text}`,
  };
  return content;
};
