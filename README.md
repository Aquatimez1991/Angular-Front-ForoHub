# Foro Hub - Angular Frontend

![Login del foro](./assets/imagen.png)

## 📋 Descripción

**Foro Hub** es una aplicación web de foro desarrollada con Angular que permite a los usuarios crear, gestionar y participar en discusiones temáticas. La aplicación cuenta con un sistema de autenticación, gestión de tópicos y respuestas, todo con una interfaz moderna y responsiva.

## 🚀 Características Principales

### 🔐 Autenticación
- Sistema de login con formularios reactivos
- Validación de campos en tiempo real
- Recordar sesión de usuario
- Interceptor de autenticación para peticiones HTTP

### 📝 Gestión de Tópicos
- Crear nuevos tópicos con título, mensaje y categoría
- Editar tópicos existentes (solo el autor)
- Eliminar tópicos con confirmación modal
- Filtrado por curso (JAVA, PYTHON, ANGULAR, LÓGICA)
- Búsqueda en tiempo real
- Visualización de detalles completos

### 💬 Sistema de Respuestas
- Responder a tópicos existentes
- Editar respuestas propias
- Contador de caracteres en formularios
- Validación para evitar respuestas duplicadas

### 🎨 Interfaz de Usuario
- Diseño moderno con CSS Grid y Flexbox
- Animaciones suaves y transiciones
- Componentes responsivos
- Variables CSS para temas consistentes
- Iconos SVG integrados

## 🛠️ Stack Tecnológico

- **Framework:** Angular 18+ (Standalone Components)
- **Lenguaje:** TypeScript
- **Estilos:** CSS3 con variables personalizadas
- **HTTP Client:** Angular HttpClient
- **Formularios:** Reactive Forms y Template-driven Forms
- **Routing:** Angular Router
- **Gestión de Estado:** Servicios con RxJS

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── auth/                    # Módulo de autenticación
│   │   ├── login/              # Componente de login
│   │   └── auth.routes.ts      # Rutas de autenticación
│   ├── core/                   # Servicios centrales
│   │   └── interceptors/       # Interceptores HTTP
│   ├── features/               # Funcionalidades principales
│   │   └── topicos/           # Gestión de tópicos
│   │       ├── detalle-topico/ # Vista detallada
│   │       ├── pages/         # Páginas de tópicos
│   │       ├── services/      # Servicios de negocio
│   │       └── respuestas/    # Gestión de respuestas
│   ├── foro/                  # Página principal del foro
│   │   └── pages/
│   ├── app.component.ts       # Componente raíz
│   ├── app.config.ts         # Configuración de la app
│   └── app.routes.ts         # Rutas principales
├── environments/              # Configuraciones de entorno
└── styles.css               # Estilos globales
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd Angular-Front-ForoHub
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api' // URL de tu backend
};
```

4. **Ejecutar la aplicación**
```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## 📦 Componentes Principales

### 🔑 LoginComponent
- Formulario reactivo con validaciones
- Integración con backend para autenticación
- Manejo de estados de carga y errores

### 🏠 ForoPageComponent
- Lista de tópicos con filtros
- Búsqueda en tiempo real
- Navegación a detalles y creación

### 📝 CrearTopicoComponent
- Formulario para nuevos tópicos
- Validación de campos obligatorios
- Contador de caracteres

### 🔍 DetalleTopicoComponent
- Vista completa del tópico
- Sistema de respuestas
- Edición y eliminación (para autores)

## 🌐 Servicios

### TopicoService
```typescript
- getTopicos(): Observable<DatosListaTopico[]>
- getTopicoPorId(id: number): Observable<any>
- crearTopico(topico: any): Observable<any>
- actualizarTopico(topico: any): Observable<any>
- eliminarTopico(id: number): Observable<any>
```

### RespuestaService
```typescript
- obtenerRespuestasPorTopico(idTopico: number): Observable<DatosListaRespuesta[]>
- agregarRespuesta(idTopico: number, respuesta: any): Observable<any>
- editarRespuesta(id: number, respuesta: DatosListaRespuesta): Observable<any>
```

## 🎨 Características de Diseño

### Variables CSS Personalizadas
```css
:host {
  --primary-color: #3b82f6;
  --secondary-color: #f1f5f9;
  --accent-color: #10b981;
  --text-primary: #1e293b;
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Animaciones
- Slide-in para elementos de lista
- Hover effects en botones y cards
- Loading spinners
- Modal transitions

## 📱 Responsive Design

- **Desktop:** Experiencia completa con sidebars
- **Tablet:** Adaptación de layouts
- **Mobile:** Navegación optimizada y formularios touch-friendly

## 🔒 Seguridad

- Interceptor de autenticación para todas las peticiones
- Validación de permisos en componentes
- Almacenamiento seguro de tokens en localStorage
- Guards para rutas protegidas

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm start

# Build de producción
npm run build

# Tests unitarios
npm test

# Linting
npm run lint

# Formateo de código
npm run format
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE.md para detalles.

## 👥 Autor

**Elías Jeshua Salgado Coripuna**
- GitHub: [@Aquatimez1991](https://github.com/Aquatimez1991)

- 📍 Perú / Chile
- 🛠️ Soporte técnico | Programador Java | Desarrollador Angular
- 📧 esalgadoc@outlook.com

## 🙏 Agradecimientos

- Angular Team por el excelente framework
- Comunidad de desarrolladores por las mejores prácticas
- Iconos de Heroicons

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella!
