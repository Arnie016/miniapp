// Debug logging function
function debugLog(message, data) {
    console.log(`[Debug] ${message}:`, data);
    // Also display in the UI for mobile debugging
    const debugDiv = document.createElement('div');
    debugDiv.style.padding = '10px';
    debugDiv.style.margin = '10px';
    debugDiv.style.backgroundColor = '#f0f0f0';
    debugDiv.style.borderRadius = '8px';
    debugDiv.innerHTML = `${message}: ${JSON.stringify(data)}`;
    document.body.appendChild(debugDiv);
}

// Check if Telegram WebApp is available
if (!window.Telegram) {
    debugLog('Error', 'Telegram WebApp is not available');
}

try {
    // Wait for the Telegram WebApp to be ready
    window.Telegram.WebApp.ready();

    // Initialize Telegram WebApp
    const tg = window.Telegram.WebApp;

    // Log initialization status
    debugLog('WebApp Data', {
        initData: tg.initData,
        version: tg.version,
        platform: tg.platform,
        colorScheme: tg.colorScheme,
        themeParams: tg.themeParams,
        isExpanded: tg.isExpanded,
    });

    // Expand the Web App to full height
    tg.expand();

    // Set header color to match Telegram theme
    document.querySelector('.header').style.backgroundColor = tg.backgroundColor;

    // Update user info
    const userInfo = document.querySelector('.user-info');
    if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        debugLog('User Data', user);
        userInfo.innerHTML = `Welcome, ${user.first_name}! `;
    } else {
        debugLog('No User Data', 'User data is not available');
        userInfo.innerHTML = 'Welcome to our Mini App! ';
    }

    // Configure main button
    tg.MainButton.setParams({
        text: 'Close App',
        color: tg.themeParams?.button_color || '#2481cc',
        text_color: tg.themeParams?.button_text_color || '#ffffff',
        is_active: true,
        is_visible: true
    });

    // Handle main button click
    tg.MainButton.onClick(() => {
        debugLog('Main Button Clicked', 'Closing app');
        tg.close();
    });

    // Handle theme changes
    const setThemeClass = () => {
        const theme = tg.colorScheme || 'light';
        debugLog('Theme Changed', theme);
        document.documentElement.className = theme;
        document.querySelector('.header').style.backgroundColor = tg.backgroundColor;
    };

    // Initial theme setup
    setThemeClass();

    // Listen for theme changes
    tg.onEvent('themeChanged', setThemeClass);

    // Action button handlers
    document.querySelectorAll('.action-button').forEach((button, index) => {
        button.addEventListener('click', () => {
            debugLog('Action Button Clicked', `Button ${index + 1}`);
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

} catch (error) {
    debugLog('Error Initializing', error.message);
}
