

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
        <div>
            <strong style="font-size:18px;">S2S AI</strong>
            <div style="font-size:11px; opacity:0.85;">
                Streets To Shelters Assistant
            </div>
        </div>

        <button id="s2s-chat-close"
            aria-label="Close chat"
            style="
                background:none;
                border:none;
                color:white;
                font-size:26px;
                cursor:pointer;
            ">
            ×
        </button>
    </div>

    <div id="s2s-chat-messages" style="
        flex:1;
        padding:20px;
        overflow-y:auto;
        background:#F9F8F5;
        display:flex;
        flex-direction:column;
        gap:12px;
    ">
        <div style="
            background:white;
            padding:13px 15px;
            border-radius:12px;
            max-width:85%;
            color:#2B1F1C;
            font-size:14px;
            line-height:1.5;
        ">
            Hi! I'm S2S AI. How can I help you today?
        </div>
    </div>

    <form id="s2s-chat-form" style="
        display:flex;
        gap:8px;
        padding:15px;
        border-top:1px solid #eeeeee;
        background:white;
    ">
        <input
            id="s2s-chat-input"
            type="text"
            placeholder="Ask S2S AI something..."
            autocomplete="off"
            required
            style="
                flex:1;
                min-width:0;
                padding:12px;
                border:1px solid #dddddd;
                border-radius:8px;
                outline:none;
                font-size:14px;
            "
        >

        <button type="submit" style="
            background:#7BAF9E;
            color:white;
            border:none;
            padding:0 18px;
            border-radius:8px;
            font-weight:600;
            cursor:pointer;
        ">
            Send
        </button>
    </form>
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
