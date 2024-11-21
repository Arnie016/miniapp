// Wait for the Telegram WebApp to be ready
window.Telegram.WebApp.ready();

// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Log initialization
console.log('Telegram WebApp initialized:', tg.initDataUnsafe);

// Expand the Web App to full height
tg.expand();

// Set header color to match Telegram theme
document.querySelector('.header').style.backgroundColor = tg.backgroundColor;

// Update user info
const userInfo = document.querySelector('.user-info');
if (tg.initDataUnsafe?.user) {
    const user = tg.initDataUnsafe.user;
    userInfo.innerHTML = `Welcome, ${user.first_name}! `;
} else {
    userInfo.innerHTML = 'Welcome to our Mini App! ';
}

// Configure main button
tg.MainButton.setParams({
    text: 'Close App',
    color: tg.themeParams.button_color,
    text_color: tg.themeParams.button_text_color,
    is_active: true,
    is_visible: true
});

// Handle main button click
tg.MainButton.onClick(() => {
    tg.close();
});

// Handle theme changes
const setThemeClass = () => {
    document.documentElement.className = tg.colorScheme;
    document.querySelector('.header').style.backgroundColor = tg.backgroundColor;
};

// Initial theme setup
setThemeClass();

// Listen for theme changes
tg.onEvent('themeChanged', setThemeClass);

// Action button handlers
document.querySelectorAll('.action-button').forEach((button, index) => {
    button.addEventListener('click', () => {
        switch(index) {
            case 0:
                // Action 1: Show alert
                tg.showAlert('Hello from Mini App! ');
                break;
            case 1:
                // Action 2: Show user data
                if (tg.initDataUnsafe?.user) {
                    const user = tg.initDataUnsafe.user;
                    tg.showPopup({
                        title: 'User Info',
                        message: `ID: ${user.id}\nFirst Name: ${user.first_name}\nUsername: ${user.username || 'Not set'}`,
                        buttons: [{type: 'ok'}]
                    });
                } else {
                    tg.showAlert('No user data available');
                }
                break;
            case 2:
                // Action 3: Toggle theme
                const newTheme = tg.colorScheme === 'dark' ? 'light' : 'dark';
                document.documentElement.className = newTheme;
                tg.setHeaderColor(newTheme === 'dark' ? '#000000' : '#ffffff');
                break;
        }
    });
});
