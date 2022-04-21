export const successRegister = {
  title: "Registro realizado",
  html: "El paciente será verificado antes de ser agregado como miembro al grupo familiar. ",
  icon: "success",
  showCancelButton: false,
  confirmButtonText: "Continuar",
  confirmButtonColor: "#198754",
};

export const logOut = {
  title: "¿Cerrar sesión?",
  icon: "warning",
  showCancelButton: true,
  cancelButtonText: "Cancelar",
  confirmButtonText: "Confirmar",
  confirmButtonColor: "#198754",
};

export const expiredSession = {
  title: "La sesión ha expirado",
  icon: "warning",
  showCancelButton: false,
  confirmButtonText: "Aceptar",
  confirmButtonColor: "#198754",
};

export const loginError = {
  text: "Error al ingresar nombre de usuario o contraseña.",
  icon: "error",
  showConfirmButton: false,
  timer: 2000,
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

export const confirm = (text) => {
  let content = {
    title: text,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
    confirmButtonColor: "#198754",
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
