import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase - CREDENCIALES COMPLETAS
const supabaseUrl = 'https://cacsbijewsqzdvqfghqt.supabase.co'
const supabaseKey = 'sb_publishable_lqP36Y1PzffFvm-mA26k2g_F77aS3D1'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Funciones de autenticación
export const auth = {
  // Verificar si está logueado
  isLoggedIn() {
    return localStorage.getItem('userSession') !== null
  },

  // Obtener datos del usuario
  getUserData() {
    const userData = localStorage.getItem('userSession')
    return userData ? JSON.parse(userData) : null
  },

  // Guardar sesión de usuario
  setUserSession(userData) {
    localStorage.setItem('userSession', JSON.stringify(userData))
  },

  // Cerrar sesión
  logout() {
    localStorage.removeItem('userSession')
    localStorage.removeItem('userEmail')
  }
}
