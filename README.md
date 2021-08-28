# Administrador de Proyectos de Vinculación 

Esta aplicación tiene como objetivo recolectar la información de los alumnos vigentes en un proyecto de vinculación, utilizando herramientas de scraping a la página web de [Sistemas de Modalidades de Aprendizaje](https://sifpvu.uabc.mx/).


### Creado con 🛠️
* [Node.js](https://nodejs.org/es/)
* [Vue.js](https://vuejs.org/)
* [Electron](https://www.electronjs.org/)
* [Puppeteer](https://pptr.dev/)
* [Google Cloud APIs](https://console.cloud.google.com)
* [Vuetify](https://vuetifyjs.com/en/)

## Empezando 🚀

### Prerequisitos 📋
* Instalar [Node.js](https://nodejs.org/es/)
* Instalar [Navegador Google Chrome](https://www.google.com/intl/es-419/chrome/)

### Instalación 🔧
1. Clonar este repositorio
    ```sh
        git clone https://github.com/pabloguzman20/scrapper2021
    ```
2. Instalar las dependencias necesarias
    ```sh
        npm install
    ```

## Modos de uso

### Build yarn (recomendado)

1. Crear archivo ejecutable, utilizando el siguiente comando.
    ```sh
        yarn electron:build
    ```
2. Correr el ejecutable `dist_electron/scraping_system-1.0.0`

### Build npm 

1. Crear archivo ejecutable, utilizando el siguiente comando.
    ```sh
        npm run electron:build
    ```
2. Correr el ejecutable `dist_electron/scraping_system-1.0.0`

### Serve

1. Ejecutar
    ```sh
        yarn electron:serve
    ```