# Gestión de Estudiantes y Cursos — Demo PrimeVue

Actividad de **instalación, uso y evaluación de componentes de terceros**, desarrollada
con **Vue 3 + TypeScript + Vite** y la librería de componentes **PrimeVue 4**.

La aplicación es un ejemplo funcional de gestión de estudiantes y cursos que integra
**8 componentes** de PrimeVue (más del mínimo de 5 exigido por la actividad), además de
componentes de apoyo (`Button`, `Tag`, `Avatar`, `Message`).

## 1. Requisitos previos

- [Node.js](https://nodejs.org/) 20.19+ o 22.12+ (requerido por Vite). Verificar con:
  ```bash
  node -v
  npm -v
  ```
- Conexión a internet al ejecutar la app (las imágenes de estudiantes/cursos se cargan
  desde `picsum.photos` y `pravatar.cc` como datos de ejemplo).

## 2. Instalación paso a paso

Estos son los comandos exactos que se usaron para construir el proyecto desde cero
(útiles para mostrar en el video la parte de "instalación"):

```bash
# 1. Crear el proyecto Vue 3 + TypeScript con Vite
npm create vite@latest . -- --template vue-ts

# 2. Instalar las dependencias base del scaffold
npm install

# 3. Instalar PrimeVue (versión fijada) + tema + iconos
npm install primevue@4.5.5 @primeuix/themes@^2.0.3 primeicons@^7.0.0
```

Si ya se clonó/descargó este proyecto con su `package.json` incluido, basta con:

```bash
npm install
```

## 3. Ejecución

```bash
# Modo desarrollo (http://localhost:5173)
npm run dev

```