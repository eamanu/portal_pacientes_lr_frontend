import institutionsServices from "../../../services/institutionsServices";
import { endDate, variantsDNI, variantsGender } from "../../ComponentsData";
const minimunAge = endDate(); //Over 14 years old

// let variantsInstitutions
// const getInstitutions = async () => {
//   const promise = await institutionsServices()
//   console.log(promise)
//   let variantsInstitutions = promise
//   return promise
// }
// getInstitutions()

export const LabelsFormData = {
  name: {
    form_name: "name",
    label: "Nombres",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  surname: {
    form_name: "surname",
    label: "Apellidos",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  id_identification_type: {
    form_name: "id_identification_type",
    label: "Tipo de documento",
    inputType: "select",
    type: "number",
    variants: variantsDNI,
    maxDate: false,
    sm: 6,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
      pattern: {
        value: /[0-9]/,
        message: "El campo es requerido.",
      },
    },
  },
  identification_number: {
    form_name: "identification_number",
    label: "Número de documento",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 6,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  birthdate: {
    form_name: "birthdate",
    label: "Fecha de nacimiento",
    inputType: "datePicker",
    type: "text",
    variants: false,
    maxDate: minimunAge,
    sm: 6,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  id_gender: {
    form_name: "id_gender",
    label: "Sexo",
    inputType: "select",
    type: "number",
    variants: variantsGender,
    maxDate: false,
    sm: 6,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
      pattern: {
        value: /[0-9]/,
        message: "El campo es requerido.",
      },
    },
  },
  email: {
    form_name: "email",
    label: "Correo electrónico",
    inputType: "input",
    type: "email",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
      pattern: {
        value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        message: "El formato ingresado no es válido",
      },
    },
  },
  confirmEmail: {
    form_name: "confirmEmail",
    label: "Confirmar correo electrónico",
    inputType: "input",
    type: "email",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
      pattern: {
        value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        message: "El formato ingresado no es válido",
      },
    },
  },
  password: {
    form_name: "password",
    label: "Crear contraseña",
    inputType: "input",
    type: "password",
    variants: false,
    maxDate: false,
    sm: 6,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
      minLength: {
        value: 3,
        message: "La contraseña debe tener al menos 3 caracteres",
      },
    },
  },
  confirmPassword: {
    form_name: "confirmPassword",
    label: "Confirmar contraseña",
    inputType: "input",
    type: "password",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  address_street: {
    form_name: "address_street",
    label: "Calle",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 8,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  address_number: {
    form_name: "address_number",
    label: "Número",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 4,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  id_locality: {
    form_name: "id_locality",
    label: "Localidad",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 8,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  id_department: {
    form_name: "id_department",
    label: "Departamento",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 8,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  locality: {
    form_name: "locality",
    label: "Localidad",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 8,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  department: {
    form_name: "department",
    label: "Departamento",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 8,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  phone_number: {
    form_name: "phone_number",
    label: "Teléfono celular",
    inputType: "input",
    type: "text",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  id_usual_institution: {
    form_name: "id_usual_institution",
    label: "Establecimiento de atención usual",
    inputType: "select",
    type: "number",
    variants: variantsGender,
    maxDate: false,
    sm: 6,
    register: {
      required: {
        value: false,
      },
    },
  },
  is_diabetic: {
    form_name: "is_diabetic",
    label: "Diabetes",
    inputType: "radio",
    type: "radio",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: false,
      },
    },
  },
  is_hypertensive: {
    form_name: "is_hypertensive",
    label: "Hipertension",
    inputType: "radio",
    type: "radio",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: false,
      },
    },
  },
  is_chronic_respiratory_disease: {
    form_name: "is_chronic_respiratory_disease",
    label: "Enfermedad respiratoria",
    inputType: "radio",
    type: "radio",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: false,
      },
    },
  },
  is_chronic_kidney_disease: {
    form_name: "is_chronic_kidney_disease",
    label: "Enfermedad respiratoria",
    inputType: "radio",
    type: "radio",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: false,
      },
    },
  },
  photo_dni_front: {
    form_name: "photo_dni_front",
    label: "Foto de DNI - FRENTE",
    inputType: "file",
    type: "file",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: false,
        message: "Ingrese una imagen",
      },
    },
  },
  photo_dni_back: {
    form_name: "photo_dni_back",
    label: "Foto de DNI - DORSO",
    inputType: "file",
    type: "file",
    variants: false,
    maxDate: false,
    sm: 12,
    register: {
      required: {
        value: false,
        message: "Ingrese una imagen",
      },
    },
  },
};

export const ValuesRegisterForm = {
  name: "",
  surname: "",
  id_identification_type: "",
  identification_number: "",
  identification_number_master: "",
  birthdate: "",
  id_gender: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  address_street: "",
  address_number: "",
  id_locality: "",
  locality: "",
  id_department: "",
  department: "",
  postal_address: "",
  phone_number: "",
  id_usual_institution: "",
  is_diabetic: null,
  is_hypertensive: null,
  is_chronic_respiratory_disease: null,
  is_chronic_kidney_disease: null,
  photo_dni_front: null,
  photo_dni_back: null,
  username: "",
  id_user_status: 1,
};
