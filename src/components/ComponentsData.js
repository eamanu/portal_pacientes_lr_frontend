
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
export const receiverCategory =[ //hardcode note - Check endpoint /categories. exists, but is incomplete. 
  { id: 0, description: "Todos los pacientes" },
  { id: 1, description: "Pacientes con diabetes crónica" },
  { id: 2, description: "Pacientes con hipertensión crónica" },
  { id: 3, description: "Pacientes con enfermedad respiratoria crónica" },
  { id: 4, description: "Pacientes con enfermedad renal crónica" },
]
