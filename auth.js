import { supabase, auth } from './supabase.js'

// Función para verificar estado de login y redirigir
function checkLoginAndRedirect() {
  const currentPath = window.location.pathname
  
  // Si está en página de login o registro, no hacer nada
  if (currentPath.includes('login.html') || currentPath.includes('registro.html')) {
    return
  }
  
  // Verificar si está logueado
  if (!auth.isLoggedIn()) {
    // Si no está logueado y quiere acceder a perfil o reservar
    if (currentPath.includes('perfil.html') || currentPath.includes('reservar.html')) {
      window.location.href = 'login.html'
      return
    }
  } else {
    // Si está logueado y está en login, redirigir a perfil
    if (currentPath.includes('login.html')) {
      window.location.href = 'perfil.html'
      return
    }
  }
}

// Función para manejar navegación condicional
function setupNavigation() {
  // Botón "Reservar Cita" en index.html
  const reservarBtn = document.querySelector('a[href*="reservar"]')
  if (reservarBtn) {
    reservarBtn.addEventListener('click', function(e) {
      if (!auth.isLoggedIn()) {
        e.preventDefault()
        window.location.href = 'login.html?redirect=reservar'
      }
      // Si está logueado, continúa normalmente a reservar.html
    })
  }
  
  // Botón "Mi Perfil"
  const perfilBtn = document.querySelector('a[href*="perfil"]')
  if (perfilBtn) {
    perfilBtn.addEventListener('click', function(e) {
      if (!auth.isLoggedIn()) {
        e.preventDefault()
        window.location.href = 'login.html?redirect=perfil'
      }
    })
  }
}

// Función para auto-completar campos de reserva
function autoCompleteReservationForm() {
  const userData = auth.getUserData()
  if (userData && window.location.pathname.includes('reservar.html')) {
    // Esperar a que cargue el DOM
    setTimeout(() => {
      const nombreField = document.querySelector('input[name="nombre"], input[placeholder*="nombre"]')
      const telefonoField = document.querySelector('input[name="telefono"], input[type="tel"]')
      const emailField = document.querySelector('input[name="email"], input[type="email"]')
      
      if (nombreField && userData.full_name) nombreField.value = userData.full_name
      if (telefonoField && userData.phone) telefonoField.value = userData.phone
      if (emailField && userData.email) emailField.value = userData.email
    }, 100)
  }
}

// Función para manejar login
async function handleLogin(phone, password) {
  try {
    // Aquí iría la lógica real de Supabase Auth
    // Por ahora simulamos con localStorage
    
    // Simulación de login exitoso
    const userData = {
      id: 'user-123',
      full_name: 'Juan Pérez',
      phone: phone,
      email: 'juan.perez@email.com'
    }
    
    auth.setUserSession(userData)
    
    // Verificar si hay redirect
    const urlParams = new URLSearchParams(window.location.search)
    const redirect = urlParams.get('redirect')
    
    if (redirect === 'reservar') {
      window.location.href = 'reservar.html'
    } else if (redirect === 'perfil') {
      window.location.href = 'perfil.html'
    } else {
      window.location.href = 'perfil.html'
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error en login:', error)
    return { success: false, error: error.message }
  }
}

// Función para manejar registro
async function handleRegister(userData) {
  try {
    // Aquí iría la lógica real de registro en Supabase
    console.log('Registrando usuario:', userData)
    
    // Simulación de registro exitoso
    auth.setUserSession(userData)
    window.location.href = 'perfil.html'
    
    return { success: true }
  } catch (error) {
    console.error('Error en registro:', error)
    return { success: false, error: error.message }
  }
}

// Función para cerrar sesión
function logout() {
  auth.logout()
  window.location.href = 'index.html'
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  checkLoginAndRedirect()
  setupNavigation()
  autoCompleteReservationForm()
})

// Exportar funciones para usar en otros archivos
window.BarberAuth = {
  handleLogin,
  handleRegister,
  logout,
  isLoggedIn: auth.isLoggedIn,
  getUserData: auth.getUserData
}
