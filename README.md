# Portafolio de Ejercicios PWA

Este repositorio contiene una colección de ejercicios prácticos relacionados con el desarrollo de Aplicaciones Web Progresivas (PWA), realizados con el propósito de comprender e implementar diferentes tecnologías y funcionalidades de las aplicaciones web modernas.

Los ejercicios están organizados en dos portafolios, cada uno enfocado en diferentes aspectos del desarrollo web.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Progressive Web Apps (PWA)
- Service Workers
- Web APIs
- IndexedDB
- Git y GitHub

---

## Portafolio 1: Fundamentos de las PWA

Este portafolio está enfocado en los componentes fundamentales de una Aplicación Web Progresiva, incluyendo su instalación, estructura, funcionamiento sin conexión y estrategias de almacenamiento en caché.

### Ejercicio 1. Web App Manifest — TaskGo

Implementación de un archivo Web App Manifest para configurar la identidad de una aplicación web, incluyendo su nombre, iconos y opciones de visualización, permitiendo su instalación como PWA.

### Ejercicio 2. App Shell

Desarrollo de una estructura visual responsiva mediante el modelo App Shell, separando los elementos principales de la interfaz del contenido dinámico de la aplicación.

### Ejercicio 3. Service Worker

Implementación de un Service Worker para comprender su registro, instalación, activación y funcionamiento dentro de una aplicación web.

### Ejercicio 4. Estrategia Cache-First

Aplicación de la estrategia Cache-First para almacenar recursos y recuperarlos desde la caché, reduciendo la dependencia de la conexión a Internet.

### Ejercicio 5. Offline Fallback

Implementación de una página alternativa que se muestra cuando el usuario intenta acceder a un recurso sin disponer de conexión a Internet.

---

## Portafolio 2: Web APIs, permisos y persistencia de datos

Este segundo portafolio se enfoca en el uso de APIs del navegador, la administración de permisos y el almacenamiento de información para mejorar las capacidades de las aplicaciones web.

### Ejercicio 1. GeoLocation — Geolocalización

Aplicación que utiliza la Geolocation API para obtener la ubicación actual del usuario, consultar los permisos del navegador y mostrar las coordenadas geográficas y su precisión.

### Ejercicio 2. PhotoCapture — Cámara web

Aplicación que utiliza la MediaDevices API para acceder a la cámara del dispositivo, visualizar video en tiempo real, capturar fotografías y descargarlas en formato PNG.

### Ejercicio 3. NotifyCenter — Notificaciones locales

Aplicación que utiliza la Notifications API y un Service Worker para solicitar permisos y mostrar notificaciones personalizadas del sistema.

### Ejercicio 4. NoteSpace — Persistencia con IndexedDB

Gestor de notas que permite crear, consultar y eliminar información almacenada localmente mediante IndexedDB. Incorpora un Service Worker para permitir su funcionamiento sin conexión a Internet.

### Ejercicio 5. SyncBoard — Caché dinámica

Aplicación que consulta publicaciones desde una API REST y almacena las respuestas en IndexedDB. Utiliza una estrategia Network-First para obtener información actualizada cuando existe conexión y recuperar los datos almacenados cuando la red no está disponible.

---

## Organización del repositorio

```text
Portafolio-Ejercicios-PWA/
│
├── Ejercicio1_Manifest TaskGo/
├── Ejercicio2_AppShell/
├── Ejercicio3_ServiceWorker/
├── Ejercicio4_CacheFirst/
├── Ejercicio5_OfflineFallback/
│
├── Portafolio_2/
│   ├── Ejercicio1_Geolocalizacion/
│   ├── Ejercicio2_Camara/
│   ├── Ejercicio3_Notificaciones/
│   ├── Ejercicio4_IndexedDB/
│   └── Ejercicio5_CacheDinamica/
│
└── README.md
```

## Ejecución de los ejercicios

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Seleccionar el ejercicio que se desea ejecutar.
4. Abrir su archivo `index.html` mediante Live Server.
5. Utilizar las herramientas de desarrollo del navegador para comprobar los Service Workers, permisos, almacenamiento y funcionamiento sin conexión.

**Nota:** algunas funcionalidades, como la geolocalización, la cámara y las notificaciones, requieren permisos del navegador y un contexto seguro, como `localhost` o HTTPS.

## Objetivo general

Aplicar los conocimientos adquiridos sobre el desarrollo de Aplicaciones Web Progresivas mediante ejercicios prácticos que permitan comprender el uso de recursos web, estrategias de caché, APIs del navegador y mecanismos de persistencia de datos.

## Autor

**José Antonio Hernández Cruz**

Universidad Tecnológica de Gutiérrez Zamora

Ingeniería en Desarrollo y Gestión de Software