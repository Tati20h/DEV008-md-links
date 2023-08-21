# Markdown Links

## Índice

* [1. Preámbulo](#1-Introducción)
* [2. Resumen del proyecto](#2-Resumen-del-proyecto)
* [3. Pasos para ejectutar la libreria (CLI/API)](#3-Como-ejectutar-la-libreria-(CLI/API))
* [4. Pruebas unitarias JEST](#4-Pruebas-unitarias-JEST)
* [5. Metodo planificación y Scrum](#5-Metodo-planificación-y-Scrum)
* [6. Checklist - Requisitos](#6-Checklist--Requisitos)

***

## 1. Introducción

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano como GitHub, foros u blogs, es muy común encontrar
varios archivos en ese formato en cualquier tipo de repositorio.
La sintaxis de Markdown es muy simple y utiliza caracteres especiales para
indicar diferentes elementos de formato.

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o y no son válidos, por lo que se ha crea esta
herramienta usando [Node.js](https://nodejs.org/), la cual analizara los
archivos encontradados para verificar los links y crear reportes de estadisticas.


## 2. Proyecto Markdown Links

Este proyecto es una herramienta desarrollada como libreria que se ejecuta  medio dde una
línea de comando (CLI).

Su objetivo principal es analizar los documentos `Markdown` encontrados dentro
de una ruta, ya sea de un archivo un directorio proporcionada por el usuario,
el analisis se basa en encontrar todos aquellos links dentro de el texto del
documento y lanzar estadisticas sobre la data encontrada:
-_links_ En uso y validos.
-_links_ Rotos o invalidos.
-Cantidad de _links_ encontrados en los archivos.
-Rutas de los documeentos pertenecientes a cada _links_.

La finalidad es facilitar la obtencion de data de valor y no perjudica el
valor de la información que se quiere compartir.

Se contruyo un programa que se ejecute usando Node.js. [Node.js](https://nodejs.org/es/)
es un entorno de ejecución para JavaScriptconstruido con el
[motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor.

## 1. Pasos para ejectutar la libreria (CLI/API). :computer:
CLI (aplicación de línea de comandos).s

#### CLI
Deberas ejecutar el siguiente comando para ejecutarlo desde tu terminal:

 `node app.js  [ "ruta-a-validar" ] --validate `

#### Instalación.
Dentro de tu terminal ejecuta el siguiente comando:

`npm i md-links-pao-otamendi`

#### Inicar la libreria.
Luego de instalar la libreria , sera necesario proporcionar los datos en la terminal de la siguiente forma:

`npx i md-links-pao-otamendi <path> [options]`

- Path (Url o Ruta relativa u absoluta).

- Options a ejecutar (--validate, --stats, --validate --stats, solo la path).

- En caso de se una ruta no encontrada o la ruta no fue proporcionada correctamente lanzara `error`.


### Ingresos de opciones y resultados esperados.

1. `npx i md-links-pao-otamendi <path>`
Al ejecutar esta opción donde solo se proporciona la ruta la libreria solo enlistara los links encontrados.
En caso de no encontrar ruta o no ser proporcionada conrrectamente lanzara error u ruta no encontrada.

![solopath]

![noencontrada]


2. `npx i md-links-pao-otamendi <path> --validate`
Al ejecutar esta opción el modulo hara una petición HTTP mostrando si los links encontrados funcionan o no.
Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como funcional.
Si el link resulta en una redirección a una URL que responde fail, entonces consideraremos el link como roto.
Si no encuentra ningun archivo se lanzara `error`.

![solovalidate]


3. `npx i md-links-pao-otamendi <path> --stats`
Al ejecutar esta opción el output (salida) será un texto con estadísticas básicas sobre los links, donde se mostrara
la cantidad de links encontrados y no repetidos.
Si no encuentra ningun archivo se lanzara `error`.

![solostats]


4. `npx i md-links-pao-otamendi <path> --validate --stats`
Al ejecutar esta opción el output (salida) será un texto con estadísticas básicas sobre los links, donde se mostrara
la cantidad de links encontrados y no repetidos, ademas de analizar la cantidad de links rotos u no funcionales.
Si no encuentra ningun archivo se lanzara `error`.

![validateystats]


## 2. Para ejecutar como API :desktop_computer:
API (Interfaz de Programación de Aplicaciones).

#### Instalacion.

Para iniciar comó una API:

1. Realice clone de repositorio repositorio de GitHub.
2. En la terminal ejecute el comando cd para ir a la carpeta donde desea guardar el proyecto.
3. Ejecute el siguiente comando:
`git clone de mi repo`
4. Abrir la carpeta donde se guardo la libreria.

Finalizados los pasos puede comenzar a ejecutar la libreria en su terminal.

#### Inicar la libreria.
Cuando se tenga la libreria instalada sera necesario proporcionar los datos en la terminal de la siguiente forma:

`npm cli.js <path> [options]`

- Path (Url o Ruta relativa u absoluta).

- Options a ejecutar (--validate, --stats, --validate --stats, solo la path).

- En caso de se una ruta no encontrada o la ruta no fue proporcionada correctamente lanzara `error`.


### Ingresos de opciones y resultados esperados.

1. `npm cli.js <path>`
Al ejecutar esta opción donde solo se proporciona la ruta la libreria solo enlistara los links encontrados.
En caso de no encontrar ruta o no ser proporcionada conrrectamente lanzara error u ruta no encontrada.

![solopath]

![noencontrada](

2. `npm cli.js <path> --validate`
Al ejecutar esta opción el modulo hara una petición HTTP mostrando si los links encontrados funcionan o no.
Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como funcional.
Si el link resulta en una redirección a una URL que responde fail, entonces consideraremos el link como roto.
Si no encuentra ningun archivo se lanzara `error`.

![solovalidate]


3. `npm cli.js <path> --stats`
Al ejecutar esta opción el output (salida) será un texto con estadísticas básicas sobre los links, donde se mostrara
la cantidad de links encontrados y no repetidos.
Si no encuentra ningun archivo se lanzara `error`.

![solostats]


4. `npm cli.js <path> --validate --stats`
Al ejecutar esta opción el output (salida) será un texto con estadísticas básicas sobre los links, donde se mostrara
la cantidad de links encontrados y no repetidos, ademas de analizar la cantidad de links rotos u no funcionales.
Si no encuentra ningun archivo se lanzara `error`.

![validateystats]


### 4. Pruebas unitarias JEST.
Resultados de pruebas realizadas a las funciones puras.

![jest]


### 5. Metodo planificacion y Scrum.
El metodo para desarrollar el proyecto fue por medio de GitHub Projects, Issues y Milestones.

![gitprojects](

### 5. Diagrama de flujo desarrollo de proyecto.

![diagrama_01](https://github.com/Tati20h/DEV008-md-links/blob/main/img/Diagrama_01.png?raw=true)

![diagrama_02](https://github.com/Tati20h/DEV008-md-links/blob/main/img/Diagrama_02.png?raw=true)

### 6. Checklist - Requisitos.

### General

* [ :chart:] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [ :chart:] Un board con el backlog para la implementación de la librería.
* [ :chart:] Documentación técnica de la librería.
* [ :chart:] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [ :chart:] El módulo exporta una función con la interfaz (API) esperada.
* [ :chart:] Implementa soporte para archivo individual
* [ :chart:] Implementa soporte para directorios
* [ :chart:] Implementa `options.validate`

### CLI

* [ :chart:] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [ :chart:] Se ejecuta sin errores / output esperado
* [ :chart:] Implementa `--validate`
* [ :chart:] Implementa `--stats`

### Pruebas / tests

* [ :chart:] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [ :chart:] Pasa tests (y linters) (`npm test`).
