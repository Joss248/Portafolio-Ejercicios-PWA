# Portafolio de Ejercicios — Aplicaciones Web Progresivas (PWA)

## Descripción del proyecto

El presente repositorio contiene un portafolio de cinco ejercicios prácticos orientados al desarrollo de la infraestructura técnica de una Aplicación Web Progresiva (Progressive Web Application, PWA).

Su propósito es aplicar los principios de instalabilidad, diseño responsivo, arquitectura App Shell, administración del ciclo de vida del Service Worker y estrategias de almacenamiento en caché para permitir el funcionamiento de aplicaciones web en condiciones de conectividad limitada.

## Objetivo general

Desarrollar y comprobar los componentes fundamentales de una Aplicación Web Progresiva mediante la implementación de un manifiesto web, una interfaz responsiva, un Service Worker y mecanismos de almacenamiento que permitan mejorar la disponibilidad de los recursos y ofrecer una experiencia de navegación sin conexión.

## Tecnologías utilizadas

- HTML5: estructura y contenido de las interfaces.
- CSS3: diseño visual y adaptación responsiva.
- JavaScript: comportamiento dinámico e interacción.
- Web App Manifest: configuración de instalabilidad.
- Service Worker API: interceptación de peticiones y administración del ciclo de vida.
- Cache API: almacenamiento y recuperación de recursos.
- IndexedDB: persistencia local de información.
- Chrome DevTools: inspección, depuración y pruebas.
- Git y GitHub: control de versiones y publicación del portafolio.

## Descripción de los ejercicios

### Ejercicio 1. Web App Manifest y Metadatos de Instalación

Configuración del archivo `manifest.json` con los metadatos necesarios para la instalación de una PWA. Incluye la definición del nombre de la aplicación, URL de inicio, modo de visualización, colores e iconos PNG en las resoluciones requeridas.

### Ejercicio 2. Maquetado del App Shell y Splash Screen Nativa

Desarrollo de una interfaz base responsiva mediante una estructura de encabezado, menú de navegación y contenedor principal. Incluye la configuración necesaria para la experiencia de instalación y la revisión del comportamiento de la aplicación mediante las herramientas del navegador.

### Ejercicio 3. Registro y Ciclo de Vida del Service Worker

Implementación del registro asíncrono del Service Worker y de los eventos `install`, `activate` y `fetch`. Se estudia el funcionamiento del ciclo de vida del trabajador de servicio y su participación en el procesamiento de solicitudes.

### Ejercicio 4. Cache API y Estrategia Cache-First

Implementación de una estrategia de almacenamiento Cache-First, mediante la cual los recursos estáticos de la aplicación se recuperan prioritariamente desde la memoria caché antes de realizar una solicitud a la red.

Se comprueba la disponibilidad del App Shell en condiciones de desconexión.

### Ejercicio 5. Interceptor de Peticiones y Manejo de Estado Offline

Implementación de un mecanismo de respuesta alternativa para solicitudes de navegación que no pueden completarse debido a la falta de conexión.

Se incorpora una página HTML personalizada denominada `offline.html`, almacenada previamente en caché, que informa al usuario cuando el recurso solicitado no se encuentra disponible.

## Ejecución de los ejercicios

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del ejercicio correspondiente en Visual Studio Code.
3. Ejecutar el proyecto mediante Live Server o un servidor HTTP local.
4. Abrir la aplicación en Google Chrome.
5. Utilizar Chrome DevTools para inspeccionar el manifiesto, el Service Worker y el almacenamiento en caché.
6. Para comprobar el funcionamiento sin conexión, activar el modo Offline desde la pestaña Network y recargar la aplicación.

**Nota:** Los Service Workers requieren un contexto seguro, como HTTPS o localhost. Se recomienda ejecutar cada ejercicio de forma independiente y evitar registros de Service Workers anteriores que puedan interferir con las pruebas.

## Resultados

El desarrollo de los ejercicios permitió implementar los elementos fundamentales de una PWA, comprender el ciclo de vida del Service Worker y comprobar el funcionamiento de estrategias de almacenamiento local.

Asimismo, se implementó una respuesta alternativa personalizada para mejorar la experiencia del usuario cuando no existe conectividad.

## Conclusión

La realización del portafolio permitió fortalecer los conocimientos relacionados con el desarrollo de Aplicaciones Web Progresivas, particularmente en la configuración de sus componentes principales y en la administración de recursos mediante Service Workers y Cache API.

Las pruebas realizadas demuestran la importancia del almacenamiento local para mantener la disponibilidad de una aplicación y proporcionar una experiencia de usuario más confiable ante problemas de conectividad.