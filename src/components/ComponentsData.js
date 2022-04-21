
export const variantsGender = [
  { id: 1, name: "Femenino" },
  { id: 2, name: "Masculino" },
  { id: 3, name: "No-binario" },
];

export const endDate = () => {
  var endYear = new Date().getFullYear() - 14;
  var todayDay = new Date().getDate();
  var todayMonth = new Date().getMonth();
  var endDate = new Date(endYear, todayMonth, todayDay);

  return endDate;
};
export const receiverCategory =[
  { id: 1, description: "Todos los pacientes" },
  { id: 2, description: "Pacientes con diabetes crónica" },
  { id: 3, description: "Pacientes con hipertensión crónica" },
  { id: 4, description: "Pacientes con enfermedad respiratoria crónica" },
  { id: 5, description: "Pacientes con enfermedad renal crónica" },
]
