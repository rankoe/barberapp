    'use strict';

let translations = {};
let currentLang = 'en';
let intendedSection = null;

// DOM elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const bookNowBtn = document.getElementById('book-now-btn');
const bookingForm = document.getElementById('booking-form');
const serviceSelect = document.getElementById('service-select');
const appointmentsList = document.getElementById('appointments-list');

// Initialize the app
async function init() {
    setupEventListeners();
    mockAppointments = loadAppointments();
    populateServices();
    populateServiceSelect();
    populateBarberSelect();
    populateAppointments();
    handleRouting();
    // Initialize jQuery UI datepicker
    $('#date-input').datepicker({ dateFormat: 'yy-mm-dd' });
    // Initialize Fancybox for gallery
    $('[data-fancybox]').fancybox();
    await loadTranslations('en');
    document.getElementById('lang-toggle').value = currentLang;
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.getAttribute('href').substring(1));
        });
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Book now button
    bookNowBtn.addEventListener('click', () => navigateTo('booking'));

    // Action buttons
    document.getElementById('book-appointment-btn').addEventListener('click', () => {
        if (!currentUser) {
            intendedSection = 'booking';
            navigateTo('login');
        } else {
            navigateTo('booking');
        }
    });
    document.getElementById('my-appointments-btn').addEventListener('click', () => {
        if (!currentUser) {
            intendedSection = 'dashboard';
            navigateTo('login');
        } else {
            navigateTo('dashboard');
        }
    });
    document.getElementById('profile-btn').addEventListener('click', () => {
        if (!currentUser) {
            intendedSection = 'dashboard';
            navigateTo('login');
        } else {
            navigateTo('dashboard');
        }
    });
    document.getElementById('company-btn').addEventListener('click', () => navigateTo('contact'));
    document.getElementById('notifications-btn').addEventListener('click', () => navigateTo('contact'));

    // Booking form submission
    bookingForm.addEventListener('submit', handleBooking);

    // Hash change for routing
    window.addEventListener('hashchange', handleRouting);

    // Main title click
    document.getElementById('main-title').addEventListener('click', () => navigateTo('home'));

    // Admin buttons
    document.getElementById('manage-services-btn').addEventListener('click', showManageServices);
    document.getElementById('manage-appointments-btn').addEventListener('click', showManageAppointments);

    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Logout
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('mobile-logout').addEventListener('click', handleLogout);

    // Language dropdown
    document.getElementById('lang-toggle').addEventListener('change', toggleLanguage);
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Handle routing based on hash
function handleRouting() {
    const hash = window.location.hash.substring(1) || 'home';
    navigateTo(hash);
}

// Navigate to a section
function navigateTo(sectionId) {
    // Hide all sections
    sections.forEach(section => section.classList.add('hidden'));

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Update URL hash
    window.location.hash = sectionId;

    // Close mobile menu
    mobileMenu.classList.add('hidden');

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.toggle('text-blue-600', link.getAttribute('href').substring(1) === sectionId);
        link.classList.toggle('text-gray-700', link.getAttribute('href').substring(1) !== sectionId);
    });
}

// Populate services in the services section
function populateServices() {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '';

    mockServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition';
        serviceCard.innerHTML = `
            <img src="${service.image}" alt="${service.name}" class="w-full h-48 object-cover rounded-t-lg mb-4">
            <h3 class="text-xl font-semibold mb-2">${service.name}</h3>
            <p class="text-gray-600 mb-4">${service.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-blue-600">$${service.price}</span>
                <span class="text-sm text-gray-500">${service.duration} min</span>
            </div>
            <button class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition book-service-btn" data-service-id="${service.id}">
                Book Now
            </button>
        `;
        servicesList.appendChild(serviceCard);
    });

    // Add event listeners to book buttons
    document.querySelectorAll('.book-service-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceId = parseInt(e.target.dataset.serviceId);
            const service = mockServices.find(s => s.id === serviceId);
            if (service) {
                serviceSelect.value = serviceId;
                navigateTo('booking');
            }
        });
    });
}

// Populate service select in booking form
function populateServiceSelect() {
    serviceSelect.innerHTML = '<option value="">Select a service</option>';
    mockServices.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} - $${service.price} (${service.duration} min)`;
        serviceSelect.appendChild(option);
    });
}

/**
 * Populate barber select options
 */
function populateBarberSelect() {
    const barberSelect = document.getElementById('barber-select');
    barberSelect.innerHTML = '<option value="">Select a barber</option>';
    mockBarbers.forEach(barber => {
        const option = document.createElement('option');
        option.value = barber.name;
        option.textContent = `${barber.name} - ${barber.specialty}`;
        barberSelect.appendChild(option);
    });
}

// Populate appointments in dashboard
function populateAppointments() {
    appointmentsList.innerHTML = '';

    if (mockAppointments.length === 0) {
        appointmentsList.innerHTML = '<p class="text-gray-600">No appointments yet.</p>';
        return;
    }

    mockAppointments.forEach(appointment => {
        const appointmentItem = document.createElement('div');
        appointmentItem.className = 'border-b border-gray-200 py-4 last:border-b-0';
        appointmentItem.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-semibold">${appointment.service}</h4>
                    <p class="text-gray-600">${appointment.date} at ${appointment.time}</p>
            <p class="text-gray-600">Barber: ${appointment.barber}</p>
                </div>
                <span class="px-2 py-1 rounded text-sm ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    ${appointment.status}
                </span>
            </div>
        `;
        appointmentsList.appendChild(appointmentItem);
    });
}

// Handle booking form submission
/**
 * Handle booking form submission
 * @param {Event} e - The submit event
 */
function handleBooking(e) {
    e.preventDefault();
    const serviceId = parseInt(serviceSelect.value);
    const date = document.getElementById('date-input').value;
    const time = document.getElementById('time-input').value;
    const barber = document.getElementById('barber-select').value;
    if (!serviceId || !date || !time || !barber) {
        alert('Please fill in all fields.');
        return;
    }
    // TODO: Validate date and time (check availability)
    // TODO: Send booking request to API
    // Mock booking success
    const service = mockServices.find(s => s.id === serviceId);
    mockAppointments.push({
        id: mockAppointments.length + 1,
        service: service.name,
        date: date,
        time: time,
        status: 'Pending',
        barber: barber
    });
    saveAppointments();
    populateAppointments();
    alert('Appointment booked successfully!');
    bookingForm.reset();
    navigateTo('dashboard');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Toggle language
async function toggleLanguage() {
    currentLang = document.getElementById('lang-toggle').value;
    const select = document.getElementById('lang-toggle');
    select.disabled = true;
    await loadTranslations(currentLang);
    select.disabled = false;
}

function updateLanguage() {
    // Update texts if ids exist
    if (document.getElementById('welcome-title')) document.getElementById('welcome-title').textContent = translations.welcome;
    if (document.getElementById('welcome-desc')) document.getElementById('welcome-desc').textContent = translations.welcomeDesc;
    if (document.getElementById('book-now-btn')) document.getElementById('book-now-btn').textContent = translations.bookNow;
    // Nav links
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 7) {
        navLinks[0].textContent = translations.home;
        navLinks[1].textContent = translations.services;
        navLinks[2].textContent = translations.gallery;
        navLinks[3].textContent = translations.booking;
        navLinks[4].textContent = translations.dashboard;
        navLinks[5].textContent = translations.contact;
        navLinks[6].textContent = translations.admin;
    }
    // Update mobile
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    if (mobileLinks.length >= 7) {
        mobileLinks[0].textContent = translations.home;
        mobileLinks[1].textContent = translations.services;
        mobileLinks[2].textContent = translations.gallery;
        mobileLinks[3].textContent = translations.booking;
        mobileLinks[4].textContent = translations.dashboard;
        mobileLinks[5].textContent = translations.contact;
        mobileLinks[6].textContent = translations.admin;
    }
    if (document.getElementById('admin-title')) document.getElementById('admin-title').textContent = translations.adminTitle;
    if (document.getElementById('login-title')) document.getElementById('login-title').textContent = translations.loginTitle;
    if (document.getElementById('logout-btn')) document.getElementById('logout-btn').textContent = translations.logout;
    if (document.getElementById('mobile-logout')) document.getElementById('mobile-logout').textContent = translations.logout;
}

function handleGoogleSignin() {
    alert('Google signin would open here. For demo, logging in as user.');
    currentUser = { email: 'user@gmail.com', role: 'user' };
    currentRole = 'user';
    updateUIAfterLogin();
    navigateTo('dashboard');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    alert('Registered successfully. Logging in.');
    currentUser = { name, email, role: 'user' };
    currentRole = 'user';
    updateUIAfterLogin();
    navigateTo('dashboard');
}

function handleUserLogin(e) {
    e.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    if ((email === 'user1@barber.com' && password === 'user1') ||
        (email === 'user2@barber.com' && password === 'user2') ||
        (email === 'user3@barber.com' && password === 'user3') ||
        (email === 'user4@barber.com' && password === 'user4')) {
        currentUser = { email, role: 'user' };
        currentRole = 'user';
        updateUIAfterLogin();
        navigateTo('dashboard');
    } else {
        alert('Invalid credentials');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    if (user === 'admin' && pass === 'admin') {
        currentUser = { user, role: 'admin' };
        currentRole = 'admin';
        updateUIAfterLogin();
        if (intendedSection) {
            navigateTo(intendedSection);
            intendedSection = null;
        } else {
            navigateTo('home');
        }
    } else if (user === 'barber' && pass === 'barber') {
        currentUser = { user, role: 'barber' };
        currentRole = 'barber';
        updateUIAfterLogin();
        if (intendedSection) {
            navigateTo(intendedSection);
            intendedSection = null;
        } else {
            navigateTo('home');
        }
    } else if (user.startsWith('user') && pass === user) {
        currentUser = { user, role: 'user' };
        currentRole = 'user';
        updateUIAfterLogin();
        if (intendedSection) {
            navigateTo(intendedSection);
            intendedSection = null;
        } else {
            navigateTo('home');
        }
    } else {
        alert('Invalid credentials');
    }
}

function handleLogout() {
    updateUIAfterLogout();
    navigateTo('home');
}

function updateUIAfterLogin() {
    document.getElementById('user-welcome').textContent = 'Welcome, ' + currentUser.user;
    document.getElementById('auth-nav').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'inline';
    document.getElementById('mobile-login').style.display = 'none';
    document.getElementById('mobile-logout').style.display = 'block';
    if (currentRole === 'user') {
        document.querySelectorAll('a[href="#admin"]').forEach(a => a.parentElement.style.display = 'none');
    } else {
        document.querySelectorAll('a[href="#admin"]').forEach(a => a.parentElement.style.display = 'block');
    }
}

function updateUIAfterLogout() {
    document.getElementById('user-welcome').textContent = '';
    document.getElementById('auth-nav').style.display = 'inline';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('mobile-login').style.display = 'block';
    document.getElementById('mobile-logout').style.display = 'none';
    document.querySelectorAll('a[href="#admin"]').forEach(a => a.parentElement.style.display = 'block');
    currentUser = null;
    currentRole = null;
}
