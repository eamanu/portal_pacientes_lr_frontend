# Portal del paciente - La Rioja
Frontend

### Requerimientos

Node js  
Versión actual: 16.13.0 (includes npm 8.1.0) 
(https://nodejs.org/es/download/)
React
Versión actual: 18.1.0

### Instalación
- Instalar dependencia

```
npm install
```
## Connfiguración
Configurar archivo .env setetando la siguiente variable de entorno con url de la API:
REACT_APP_API_URL_DEV 

## Ejecutar

```
npm run start
```
Ejecuta la aplicación en el modo de desarrollo en el puerto 3000. Abrir [http: // localhost: 3000] (http: // localhost: 3000) para verlo en el navegador.

La página se recargará al realizar modificaciones.
Warnings y errores se podrán ver en consola.

## Producción

```
npm run build
```

Construye la aplicación para producción en la carpeta `build`. \
Agrupa React en el modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación se minimiza y los nombres de archivo incluyen los hash. \

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).
