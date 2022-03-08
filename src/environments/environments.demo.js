require('dotenv').config()

export const environment = {
    production: false,
    baseURL: `${process.env.REACT_APP_API_URL_DEV}`,
}