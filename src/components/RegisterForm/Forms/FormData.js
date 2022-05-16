import { endDate } from "../../ComponentsData";
const minimunAge = endDate(); //Over 14 years old

export const LabelsFormData = {
  name: {
    form_name: "name",
    label: "Nombres",
    inputType: "input",
    type: "text",
    variants: false,
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
    variants: "variantsDNI",
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
    variants: "variantsGender",
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
    sm: 6,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
      minLength: {
        value: 6,
        message: "La contraseña debe tener al menos 6 caracteres",
      },
    },
  },
  confirmPassword: {
    form_name: "confirmPassword",
    label: "Confirmar contraseña",
    inputType: "input",
    type: "password",
    variants: false,
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
    variants: "variantsInstitutions",
    sm: 6,
    register: {
      required: {
        value: true,
        message: "El campo es requerido.",
      },
    },
  },
  is_diabetic: {
    form_name: "is_diabetic",
    label: "Diabetes",
    inputType: "radio",
    type: "radio",
    variants: false,
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
    sm: 12,
    register: {
      required: {
        value: false,
      },
    },
  },
  is_chronic_kidney_disease: {
    form_name: "is_chronic_kidney_disease",
    label: "Enfermedad renal",
    inputType: "radio",
    type: "radio",
    variants: false,
    sm: 12,
    register: {
      required: {
        value: false,
      },
    },
  },
  file1: {
    form_name: "file1",
    label: "Foto - FRENTE",
    inputType: "file",
    type: "file",
    variants: false,
    sm: 12,
    register: {
      required: {
        value: true,
        message: "Ingrese una imagen",
      },
    },
  },
  file2: {
    form_name: "file2",
    label: "Foto - DORSO",
    inputType: "file",
    type: "file",
    variants: false,
    sm: 12,
    register: {
      required: {
        value: true,
        message: "Ingrese una imagen",
      },
    },
  },
};

export const ValuesRegisterForm = {
  name: "",
  surname: "",
  id_identification_type: "",
  id_identification_type_master: "",
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
  id_locality: 1, //hardcode
  locality: "",
  id_department: 1, //hardcode
  department: "",
  postal_address: "",
  phone_number: "",
  id_usual_institution: "",
  is_diabetic: false,
  is_hypertensive: false,
  is_chronic_respiratory_disease: false,
  is_chronic_kidney_disease: false,
  file1: null,
  file2: null,
  username: "",
  id_person: null, //hardcode
  id_patient: null, //hardcode
  id_admin_status: 1, //note - table db =>  1: pending , 2: validated , 3: refused
  id_person_status: 1, //note - table db =>  1: pending , 2: validated , 3: refused
  is_deleted: false, //hardcode
};
