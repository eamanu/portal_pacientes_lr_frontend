export const variantsDNI = [
    { id: 1, type: "DNI" },
    { id: 2, type: "CI" },
    { id: 3, type: "LC" },
    { id: 4, type: "LE" },
    { id: 5, type: "CUIT" },
    { id: 6, type: "CUIL" },
    { id: 10, type: "OTRO" }
]

export const variantsGender = [
    { id: 1, type: "Femenino" },
    { id: 2, type: "Masculino" },
    { id: 3, type: "No-binario" }
]

export const endDate = () => {
    var endYear = new Date().getFullYear() - 14;
    var todayDay = new Date().getDate()
    var todayMonth = new Date().getMonth()
    var endDate = new Date(endYear, todayMonth, todayDay)
    
    return endDate
}