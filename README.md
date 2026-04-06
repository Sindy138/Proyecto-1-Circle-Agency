# Proyecto 1 - Circle Agency

## Descripción del proyecto

Circle Agency es un sitio web responsive de una empresa ficticia de diseño web. El proyecto simula un flujo de trabajo del mundo real, integrando un diseño preexistente con funcionalidades interactivas desarrolladas en JavaScript y consumo de una API REST.

El sitio incluye:
- Página de Inicio: Presentación de la agencia con propuesta de valor y servicios
- Página de Proyectos: Galería de proyectos obtenida dinámicamente desde una API
- Página de Contacto: Formulario de contacto con validación

Páginas Incluidas:

1. Página de Inicio
   - Hero section con propuesta de valor
   - Sección de proyectos recientes (últimos 3 de la API)
   - Testimonios de clientes
   - Servicios ofrecidos (UI Design, UX Design, App Development)
   - Llamadas a acción (CTA)

2. Página de Proyectos
   - Proyecto individual en detalle (Proyectos/1.html)
   - Búsqueda dinámica desde la API (uid = 1)
   - Muestra: nombre, descripción, contenido, imagen, fecha completado
   - Sección "Otros Proyectos" con selección aleatoria (bonus)
   - Manejo de errores si el proyecto no existe

3. Página de Contacto
   - Formulario con campos: nombre, email, mensaje
   - Validación en tiempo real
   - Reglas personalizadas (ej: "ironhack" bloqueado)
   - Validación de formato de email
   - Campos obligatorios

Características Bonus:
- Menú responsive con interacción
- Animaciones en la sección de proyectos recientes
- Página 404 personalizada
- Manejo avanzado de errores

## Características

Funcionalidades Principales:
- Navegación entre páginas fluida
- Consumo de API para obtener proyectos dinámicamente
- Validación de formulario de contacto con JavaScript
- Diseño completamente responsive (mobile, tablet, desktop)
- Componentes interactivos y animaciones

Requisitos Mínimos de Implementación:
- Renderiza correctamente en navegador
- Archivos HTML/CSS/JS separados
- Repositorio GitHub con commits diarios
- Deployado en Netlify
- Código limpio (KISS + DRY)
- Diseño responsivo 100%
- JavaScript funcional
- README completo

## Configuración

Requisitos Previos:
- IDE: VSCode recomendado
- Git: para versionado
- Cuenta Figma: para revisar diseños (acceso a activos)
- Netlify: para deployment

Instalación y Setup Inicial:

```bash
# 1. Clonar el repositorio
git clone <URL-repositorio>
cd Proyecto-1-Circle-Agency

# 2. Inicializar Git (si no está inicializado)
git init

# 3. Crear ramas de trabajo
git checkout -b develop
git checkout -b main

# 4. Abrir el proyecto en VSCode
code .

# 5. Abrir en navegador (opción simple)
# - Click derecho en index.html > "Open with Live Server"
# O ejecutar un servidor local:
python -m http.server 8000
# Luego acceder a http://localhost:8000
```

Estructura de Carpetas:

```
Proyecto-1-Circle-Agency/
├── index.html              # Página de inicio
├── proyectos.html          # Página de proyectos
├── proyectos/
│   └── 1.html              # Detalle de proyecto
├── contacto.html           # Página de contacto
├── css/
│   ├── styles.css          # Estilos globales
│   ├── home.css            # Estilos home
│   ├── proyectos.css       # Estilos proyectos
│   └── contacto.css        # Estilos contacto
├── js/
│   ├── main.js             # Lógica global
│   ├── api.js              # Consumo de API
│   ├── form-validation.js  # Validación de formularios
│   └── utils.js            # Funciones auxiliares
├── assets/
│   └── images/             # Imágenes del proyecto
├── README.md               # Este archivo
└── .gitignore              # Archivos ignorados en Git
```

Flujo de Trabajo Git Recomendado:

```bash
# 1. Main branch - solo versiones estables
git checkout main

# 2. Develop branch - integración de features
git checkout develop

# 3. Feature branches - desarrollo individual
git checkout -b feature/home-page
git checkout -b feature/projects-api
git checkout -b feature/form-validation

# 4. Workflow típico:
git add .
git commit -m "feat: agregar sección hero en home"
git push origin feature/home-page
# Crear Pull Request en GitHub

# 5. Al finalizar:
git checkout develop
git merge feature/home-page
git push origin develop
```

Deployment - Pasos para Netlify:
1. Crear cuenta en Netlify (https://app.netlify.com)
2. Conectar repositorio GitHub
3. Configurar build (no necesario para proyecto estático)
4. Hacer push a rama main
5. Netlify desplegará automáticamente

URL de acceso: https://tu-proyecto.netlify.app

## Especificaciones técnicas

Stack Tecnológico:
- HTML5: Estructura semántica
- CSS3: Diseño responsive, animaciones, flexbox/grid
- JavaScript (Vanilla): Sin frameworks
- API REST: Para consumir datos de proyectos

API Endpoints:

Base URL: https://api.github.com/repos/ironhackingexercises/circle-agency-blog/issues

Respuesta típica:
```json
{
  "id": 1,
  "title": "Proyecto Name",
  "body": "Descripción del proyecto",
  "labels": [
    {
      "name": "image",
      "color": "FFFFFF"
    }
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z"
}
```

Browsers Soportados:
- Chrome (versión 90+)
- Firefox (versión 88+)
- Safari (versión 14+)
- Edge (versión 90+)
- Mobile: iOS Safari, Chrome Mobile

Resoluciones Responsivas:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

Validación del Formulario:
```javascript
// Reglas implementadas:
- Email: formato válido (regex)
- Nombre: no vacío, no "ironhack"
- Mensaje: mínimo 10 caracteres
- Campos obligatorios: todos requeridos
```

Recursos Útiles:
- Documentación HTML5: https://developer.mozilla.org/es/docs/Web/HTML
- Documentación CSS3: https://developer.mozilla.org/es/docs/Web/CSS
- Documentación JavaScript: https://developer.mozilla.org/es/docs/Web/JavaScript
- API REST Basics: https://restfulapi.net/
- Media Queries - Responsive Design: https://developer.mozilla.org/es/docs/Web/CSS/Media_Queries

Entregables:
- Repositorio GitHub: [URL del repositorio]
- Sitio web en vivo: [URL en Netlify]
- Presentación: [URL de slides]
- Presentación en vivo: Proyecto 1 Presentations

Notas del Desarrollador:
- Comenzar con mobile-first approach
- Revisar constantemente en Figma para detalles de diseño
- Hacer commits frecuentes y descriptivos
- Probar responsive en DevTools (F12 > Toggle device toolbar)
- Validar JavaScript en consola
- Limpiar code antes de hacer merge

Estado del Proyecto: En Desarrollo
Última actualización: Abril 2026
