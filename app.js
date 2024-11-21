// Wait for the Telegram WebApp to be ready
window.Telegram.WebApp.ready();

// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Log initialization
console.log('Telegram WebApp initialized:', tg.initDataUnsafe);

// Expand the Web App to full height
tg.expand();

// Configure main button
tg.MainButton.setParams({
    text: 'Click Me!',
    color: '#2481cc',
    text_color: '#ffffff',
    is_active: true,
    is_visible: true
});

// Event handler for the main button
tg.MainButton.onClick(() => {
    tg.showAlert('Hello from Mini App!');
});

// Handle theme changes
const setThemeClass = () => {
    document.documentElement.className = tg.colorScheme;
};

// Initial theme setup
setThemeClass();

// Listen for theme changes
tg.onEvent('themeChanged', setThemeClass);

// Update content with user info if available
const contentDiv = document.getElementById('content');
if (tg.initDataUnsafe?.user) {
    const user = tg.initDataUnsafe.user;
    contentDiv.innerHTML = `
        <p>Welcome, ${user.first_name}!</p>
        <p>This is a Telegram Mini App.</p>
    `;
} else {
    contentDiv.innerHTML = `
        <p>Welcome to our Mini App!</p>
        <p>Try clicking the button below.</p>
    `;
}
