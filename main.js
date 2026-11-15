

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

    // Create chatbot button
    const chatButton = document.createElement('button');
    chatButton.id = 's2s-chat-button';
    chatButton.textContent = 'Ask Streets To Shelters AI';

    chatButton.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        z-index: 9999;
        padding: 14px 20px;
        background: #7BAF9E;
        color: white;
        border: none;
        border-radius: 30px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(chatButton);

});