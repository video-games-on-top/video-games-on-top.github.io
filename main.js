

document.addEventListener('DOMContentLoaded', () => {

    // Listen for clicks across the entire page
    document.addEventListener('click', (event) => {




        // MOBILE MENU LOGIC
        const hamburgerBtn = document.getElementById('mobile-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu-overlay');

        if (!mobileMenu) return; // If there is no mobile menu on this page, stop here

        // Mobile Menu Open
        if (hamburgerBtn && (event.target === hamburgerBtn || hamburgerBtn.contains(event.target))) {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        // Mobile Menu Close
        if (closeMenuBtn && (event.target === closeMenuBtn || closeMenuBtn.contains(event.target))) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

});

    const waitForFooter = setInterval(function() {
        // Wait for the footer to load
        if (document.querySelector('.gtranslate_wrapper')) {
            clearInterval(waitForFooter);

            // Your exact settings + the missing languages array
            window.gtranslateSettings = {
                "default_language": "en",

                "native_language_names": true,
                "wrapper_selector": ".gtranslate_wrapper",
                "switcher_horizontal_position": "inline"
            };

            // Inject the float.js script
            const gtScript = document.createElement('script');
            gtScript.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
            gtScript.defer = true;
            document.body.appendChild(gtScript);
        }
    }, 100);

// Clean .html and /index from the address bar automatically
let path = window.location.pathname;

if (path.endsWith('.html') || path.endsWith('/index')) {
  // Remove /index, /index.html, or just .html from the end of the path
  let cleanPath = path.replace(/(\/index)?(\.html)?$/, '');

  // If cleanPath becomes empty (for homepage), set it to '/'
  if (cleanPath === '') {
    cleanPath = '/';
  }

  // Update the address bar silently without reloading
  window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
}


// STREETS TO SHELTERS AI CHATBOT
document.addEventListener('DOMContentLoaded', () => {

    const chatButton = document.createElement('button');
    chatButton.id = 's2s-chat-button';
    chatButton.textContent = 'S2S AI';

    chatButton.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        padding: 14px 24px;
        background: #7BAF9E;
        color: white;
        border: none;
        border-radius: 30px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    `;

    const chatWindow = document.createElement('div');
    chatWindow.id = 's2s-chat-window';

    chatWindow.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 420px;
        max-width: 100%;
        height: 100vh;
        height: 100dvh;
        background: #ffffff;
        z-index: 10000;
        box-shadow: -5px 0 25px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
    `;

    chatWindow.innerHTML = `
        <div style="
            background: #7BAF9E;
            color: white;
            padding: 14px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        ">
            <strong style="font-size:18px;">S2S AI</strong>

            <button id="s2s-chat-close"
                aria-label="Close chat"
                style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 28px;
                    cursor: pointer;
                ">
                ×
            </button>
        </div>

        <div style="
            flex: 1;
            padding: 24px;
            overflow-y: auto;
            color: #2B1F1C;
        ">
            Hi! I'm S2S AI. How can I help you today?
        </div>
    `;

    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);

    chatButton.addEventListener('click', () => {
        chatWindow.style.transform = 'translateX(0)';
        chatButton.style.display = 'none';

        if (window.innerWidth > 768) {
            document.body.style.transition = 'padding-right 0.3s ease';
            document.body.style.paddingRight = '420px';
        }
    });

    chatWindow.querySelector('#s2s-chat-close')
        .addEventListener('click', () => {
            chatWindow.style.transform = 'translateX(100%)';
            chatButton.style.display = 'block';

            document.body.style.paddingRight = '0';
        });
});
