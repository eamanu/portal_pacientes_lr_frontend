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
    { id: 2, type: "Masculino" }
]

export const endDate = () => {
    var endYear = new Date().getFullYear() - 18;
    var todayDay = new Date().getDate()
    var todayMonth = new Date().getMonth()
    var endDate = new Date(endYear, todayMonth, todayDay)
    
    return endDate
}