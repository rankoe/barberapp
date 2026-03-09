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

# Barber App - Sistema de Citas de Peluquería

## 🚀 **Configuración Completa**

### **Paso 1: Configurar Supabase**
1. Ve a [supabase.com](https://supabase.com) y crea cuenta gratuita
2. Crea un nuevo proyecto
3. Ve a **SQL Editor** y ejecuta el contenido de `setup-database.sql`
4. Ve a **Settings → API** y copia:
   - Project URL
   - anon/public key
5. Actualiza `supabase.js` con tus credenciales reales

### **Paso 2: Probar Localmente**
```bash
npm install
npm run dev
```
Visita `http://localhost:3000`

### **Paso 3: Desplegar en Vercel**
1. Ve a [vercel.com](https://vercel.com) y crea cuenta gratuita
2. Conecta tu repositorio de GitHub
3. Configura variables de entorno en Vercel:
   - `SUPABASE_URL=tu-project-url`
   - `SUPABASE_ANON_KEY=tu-anon-key`

### **Paso 4: Probar Funcionalidades**
- **Login**: `admin@barberstudio.com` / `admin123`
- **Reservar**: Solo funciona si estás logueado
- **Perfil**: Muestra datos del usuario
- **PWA**: Se puede instalar como app

## 📋 **Funcionalidades Implementadas**

### ✅ **Completado**
- ✅ Estructura multi-página
- ✅ Diseño responsive con Tailwind
- ✅ PWA instalable
- ✅ Sistema de autenticación básico
- ✅ Navegación condicional
- ✅ Auto-completado de formularios
- ✅ Panel de administración
- ✅ Base de datos preparada

### 🔄 **Pendiente (requiere credenciales)**
- 🔄 Conexión real con Supabase
- 🔄 Autenticación completa
- 🔄 Gestión de citas en BD
- 🔄 Sistema de notificaciones

## 🎯 **Archivos Importantes**
- `supabase.js` - Configuración de BD
- `auth.js` - Lógica de autenticación
- `setup-database.sql` - Script de BD
- `vercel.json` - Configuración de despliegue

## 🔐 **Credenciales de Prueba**
- **Admin**: admin@barberstudio.com / admin123
- **Usuario**: Cualquier teléfono / cualquier password (simulado)

¡Una vez tengas las credenciales de Supabase, actualízalas y todo funcionará perfectamente!

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
