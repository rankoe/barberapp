# Barber App - Sistema de Citas de Peluquería

## Stack Tecnológico
- **Frontend**: HTML + Tailwind CSS + JavaScript Vanilla
- **Despliegue**: Vercel
- **Base de Datos**: Supabase
- **Arquitectura**: Serverless Multi-page Application

## Características
- 📅 Sistema de reservas de citas completo
- 👤 Perfiles de usuario con gestión de citas
- 🏪 Panel de administración para barberos
- 📱 Diseño responsive y moderno
- � Sistema de autenticación
- 💰 Gestión de precios y servicios
- 📊 Dashboard con estadísticas

## Arquitectura de la Aplicación

### 🌐 **Páginas Públicas**
- **index.html** - Página de inicio
- **servicios.html** - Catálogo de servicios
- **reservar.html** - Formulario de reservas
- **galeria.html** - Galería de trabajos
- **contacto.html** - Información de contacto
- **login.html** - Inicio de sesión usuarios
- **registro.html** - Registro de nuevos usuarios

### 👤 **Área de Usuario**
- **perfil.html** - Dashboard del cliente
  - Información personal
  - Próximas citas
  - Historial de servicios
  - Gestión de reservas

### 🏪 **Panel de Administración**
- **admin/login.html** - Acceso administrativo
- **admin/dashboard.html** - Panel de control
  - Gestión de citas
  - Administración de servicios
  - Control de precios
  - Gestión de clientes
  - Administración de barberos
  - Estadísticas y reportes

## Flujo de Usuarios

### 📱 **Cliente**
1. **Registro/Login** → Acceso con teléfono/email
2. **Explorar Servicios** → Ver catálogo y precios
3. **Reservar Cita** → Seleccionar servicio, fecha, hora
4. **Gestionar Citas** → Ver, confirmar, cancelar reservas
5. **Historial** → Ver servicios anteriores

### 💼 **Administrador**
1. **Login Admin** → Acceso seguro al panel
2. **Dashboard** → Vista general del negocio
3. **Gestión de Citas** → Aprobar, modificar, cancelar
4. **Servicios** → Crear, editar, eliminar servicios
5. **Precios** → Actualizar tarifas
6. **Clientes** → Ver base de clientes
7. **Personal** → Gestionar barberos

## Estructura de Archivos

```
barberapp/
├── index.html              # Página principal
├── login.html              # Login usuarios
├── perfil.html             # Dashboard cliente
├── reservar.html           # Formulario reservas
├── servicios.html         # Catálogo servicios
├── galeria.html            # Galería trabajos
├── contacto.html           # Contacto
├── registro.html           # Nuevo usuario
├── admin/                  # Panel administración
│   ├── login.html          # Login admin
│   └── dashboard.html     # Panel control
├── assets/                 # Recursos estáticos
├── README.md               # Documentación
└── vercel.json            # Configuración Vercel
```

## Desarrollo Local

### Requisitos
- Navegador web moderno
- Editor de código (VS Code recomendado)

### Ejecución
1. Abrir `index.html` en el navegador
2. No requiere instalación de dependencias locales

## Colores de Marca
- Primario: #1a1a1a (negro)
- Secundario: #8b7355 (marrón)
- Acento: #d4af37 (dorado)

## Fuentes
- Montserrat (Google Fonts)
- Peso: 300, 400, 500, 600, 700

## Próximos Pasos
1. Configurar cuenta de Vercel
2. Crear proyecto en Supabase
3. Implementar lógica de reservas
4. Desarrollar panel de administración
