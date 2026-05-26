const AUTH_STORAGE_KEY = 'trench-auth-session';
const USERS_STORAGE_KEY = 'trench-users';

function getStoredUsers() {
    try {
        const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY));
        return Array.isArray(users) ? users : [];
    } catch (error) {
        return [];
    }
}

function saveStoredUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    try {
        const user = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
        return user && typeof user === 'object' ? user : null;
    } catch (error) {
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isStrongPassword(password) {
    return password.length >= 6;
}

async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${salt}:${password}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map((value) => value.toString(16).padStart(2, '0'))
        .join('');
}

function generateSalt() {
    const randomValues = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(randomValues)
        .map((value) => value.toString(16).padStart(2, '0'))
        .join('');
}

function createAuthMessage(text, type = 'info') {
    const container = document.createElement('div');
    container.className = `auth-message auth-message--${type}`;
    container.textContent = text;
    container.setAttribute('role', 'status');
    return container;
}

function buildAuthCard(mode) {
    const shell = document.createElement('section');
    shell.className = 'auth-shell';

    const card = document.createElement('div');
    card.className = 'auth-card';

    const eyebrow = document.createElement('p');
    eyebrow.className = 'auth-eyebrow';
    eyebrow.textContent = 'Acceso exclusivo a Trench Crusader Wiki';

    const title = document.createElement('h1');
    title.className = 'auth-title';
    title.textContent = mode === 'register' ? 'Crear cuenta' : 'Iniciar sesión';

    const subtitle = document.createElement('p');
    subtitle.className = 'auth-subtitle';
    subtitle.textContent = mode === 'register'
        ? 'Regístrate para guardar tu experiencia y volver a entrar cuando quieras.'
        : 'Accede a la wiki y entra directamente a la aplicación temada.';

    const form = document.createElement('form');
    form.className = 'auth-form';
    form.id = mode === 'register' ? 'register-form' : 'login-form';

    const messageBox = document.createElement('div');
    messageBox.className = 'auth-message-box';

    const nameField = document.createElement('label');
    nameField.className = 'auth-field';
    nameField.innerHTML = `
        <span>Nombre</span>
        <input type="text" name="name" placeholder="Tu nombre de guerra" autocomplete="name" required ${mode === 'register' ? '' : 'disabled'}>
    `;

    const emailField = document.createElement('label');
    emailField.className = 'auth-field';
    emailField.innerHTML = `
        <span>Correo electrónico</span>
        <input type="email" name="email" placeholder="correo@ejemplo.com" autocomplete="email" required>
    `;

    const passwordField = document.createElement('label');
    passwordField.className = 'auth-field';
    passwordField.innerHTML = `
        <span>Contraseña</span>
        <input type="password" name="password" placeholder="Mínimo 6 caracteres" autocomplete="current-password" required>
    `;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'auth-submit';
    submitButton.textContent = mode === 'register' ? 'Registrarme' : 'Entrar a la app';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'auth-toggle';
    toggle.textContent = mode === 'register'
        ? '¿Ya tienes cuenta? Inicia sesión'
        : '¿No tienes cuenta? Regístrate';

    form.append(messageBox, nameField, emailField, passwordField, submitButton, toggle);

    if (mode === 'register') {
        form.addEventListener('submit', handleRegisterSubmit);
        toggle.addEventListener('click', () => renderAuthScreen('login'));
    } else {
        form.addEventListener('submit', handleLoginSubmit);
        toggle.addEventListener('click', () => renderAuthScreen('register'));
    }

    card.append(eyebrow, title, subtitle, form);
    shell.append(card);
    return shell;
}

function renderAuthScreen(mode = 'login') {
    const root = document.getElementById('root');
    if (!root) {
        return;
    }

    root.innerHTML = '';
    root.append(buildAuthCard(mode));
    syncAuthControls();
}

function mergeUserMessage(messageBox, text, type) {
    messageBox.innerHTML = '';
    if (!text) {
        return;
    }
    messageBox.append(createAuthMessage(text, type));
}

function syncAuthControls() {
    const nav = document.querySelector('nav');
    if (!nav) {
        return;
    }

    let controls = document.getElementById('auth-controls');
    if (!controls) {
        controls = document.createElement('div');
        controls.id = 'auth-controls';
        nav.appendChild(controls);
    }

    controls.innerHTML = '';

    const session = getCurrentUser();
    if (!session) {
        return;
    }

    const label = document.createElement('span');
    label.className = 'auth-user-label';
    label.textContent = `Usuario: ${session.name}`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'auth-logout';
    button.textContent = 'Cerrar sesión';
    button.addEventListener('click', logout);

    controls.append(label, button);
}

async function handleLoginSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const messageBox = form.querySelector('.auth-message-box');
    const email = normalizeEmail(form.email.value);
    const password = form.password.value;

    if (!isValidEmail(email)) {
        mergeUserMessage(messageBox, 'Ingresa un correo válido.', 'error');
        return;
    }

    const users = getStoredUsers();
    const user = users.find((item) => normalizeEmail(item.email) === email);

    if (!user) {
        mergeUserMessage(messageBox, 'No existe ninguna cuenta con ese correo.', 'error');
        return;
    }

    const hash = await hashPassword(password, user.salt);
    if (hash !== user.passwordHash) {
        mergeUserMessage(messageBox, 'La contraseña es incorrecta.', 'error');
        return;
    }

    setCurrentUser({
        email: user.email,
        name: user.name,
        loginAt: Date.now()
    });
    mergeUserMessage(messageBox, '¡Bienvenido de nuevo! Redirigiendo a la app…', 'success');
    syncAuthControls();

    if (typeof General === 'function') {
        General();
    }
}

async function handleRegisterSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const messageBox = form.querySelector('.auth-message-box');
    const name = form.name.value.trim();
    const email = normalizeEmail(form.email.value);
    const password = form.password.value;

    if (!name) {
        mergeUserMessage(messageBox, 'Ingresa tu nombre para continuar.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        mergeUserMessage(messageBox, 'Ingresa un correo válido.', 'error');
        return;
    }

    if (!isStrongPassword(password)) {
        mergeUserMessage(messageBox, 'La contraseña debe tener al menos 6 caracteres.', 'error');
        return;
    }

    const users = getStoredUsers();
    const existingUser = users.find((item) => normalizeEmail(item.email) === email);

    if (existingUser) {
        mergeUserMessage(messageBox, 'Ese correo ya está registrado. Usa otra cuenta o inicia sesión.', 'error');
        return;
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);

    users.push({
        email,
        name,
        passwordHash,
        salt,
        createdAt: new Date().toISOString()
    });

    saveStoredUsers(users);
    setCurrentUser({ email, name, loginAt: Date.now() });
    mergeUserMessage(messageBox, 'Cuenta creada correctamente. Entrando a la aplicación…', 'success');
    syncAuthControls();

    if (typeof General === 'function') {
        General();
    }
}

function logout() {
    clearCurrentUser();
    syncAuthControls();
    renderAuthScreen('login');
}

window.isAuthenticated = function () {
    return Boolean(getCurrentUser());
};

window.renderAuthScreen = renderAuthScreen;
window.logout = logout;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!isAuthenticated()) {
            renderAuthScreen('login');
            return;
        }
        syncAuthControls();
    });
} else if (!isAuthenticated()) {
    renderAuthScreen('login');
} else {
    syncAuthControls();
}
