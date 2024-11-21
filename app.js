// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Expand the Web App to full height
tg.expand();

// Set the main button
tg.MainButton.text = "Hello!";
tg.MainButton.show();

// Event handler for the main button
tg.MainButton.onClick(() => {
    tg.showAlert('Hello World!');
});

// Handle theme changes
const setThemeClass = () => {
    document.documentElement.className = tg.colorScheme;
};

// Initial theme setup
setThemeClass();

// Listen for theme changes
tg.onEvent('themeChanged', setThemeClass);

// Example of using Telegram WebApp data
if (tg.initDataUnsafe?.user) {
    const user = tg.initDataUnsafe.user;
    document.getElementById('content').innerHTML = `
        <p>Welcome, ${user.first_name}!</p>
    `;
} else {
    document.getElementById('content').innerHTML = `
        <p>Welcome to our Mini App!</p>
    `;
}
