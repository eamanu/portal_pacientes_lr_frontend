import { endDate, variantsDNI, variantsGender } from "../../ComponentsData";
const minimunAge = endDate(); //Over 14 years old

export const LabelsFormData = {
  firstName: {
    form_name: "firstName",
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
  lastName: {
    form_name: "lastName",
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
  id_type: {
    form_name: "id_type",
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
  id_number: {
    form_name: "id_number",
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
  date_of_birth: {
    form_name: "date_of_birth",
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
  calle: {
    form_name: "calle",
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
  numero_domicilio: {
    form_name: "numero_domicilio",
    label: "Nçumero",
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
  localidad: {
    form_name: "localidad",
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
  departamento: {
    form_name: "departamento",
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
  establishment_of_care: {
    form_name: "establishment_of_care",
    label: "Establecimiento de atención",
    inputType: "select",
    type: "number",
    variants: variantsDNI,
    maxDate: false,
    sm: 6,
    register: {
      required: {
        value: false,
      },
    },
  },
  diabetes: {
    form_name: "diabetes",
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
  hipertension: {
    form_name: "hipertension",
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
  enfermedad_respiratoria: {
    form_name: "enfermedad_respiratoria",
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
  enfermedad_renal: {
    form_name: "enfermedad_renal",
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
        message: "Ingrese una imagen"
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
        message: "Ingrese una imagen"
      },
    },
  },
};

export const ValuesRegisterForm = {
  firstName: "",
  lastName: "",
  id_type: "",
  id_number: "",
  date_of_birth: "",
  id_gender: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  calle: "",
  numero_domicilio: "",
  localidad: "",
  departamento: "",
  domicilio_postal: "",
  establecimiento: "",
  diabetes: null,
  hipertension: null,
  enfermedad_respiratoria: null,
  enfermedad_renal: null,
  photo_dni_front: null,
  photo_dni_back: null,
};
