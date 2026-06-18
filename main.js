

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
