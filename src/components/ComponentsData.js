import institutionsServices from "../services/institutionsServices";

export const variantsDNI = [
  { id: 1, name: "DNI" },
  { id: 2, name: "CI" },
  { id: 3, name: "LC" },
  { id: 4, name: "LE" },
  { id: 5, name: "CUIT" },
  { id: 6, name: "CUIL" },
  { id: 10, name: "OTRO" },
];

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

export const variantsInstitutions = async () => {
    const promise = await institutionsServices()
    console.log(promise)
    return promise
}

// getInstitutions() 

