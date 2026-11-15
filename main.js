

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
(() => {
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

        <div style="display:flex; align-items:center; gap:14px;">

        <button id="s2s-clear-chat"
            type="button"
            style="
                display:flex;
                align-items:center;
                gap:7px;
                padding:8px 11px;
                background:rgba(255,255,255,0.15);
                border:1px solid rgba(255,255,255,0.3);
                border-radius:8px;
                color:white;
                font-size:12px;
                font-weight:600;
                cursor:pointer;
                transition:background 0.2s ease;
            ">

            <svg width="15" height="15" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round">
                <path d="M3 6h18"/>
                <path d="M8 6V4h8v2"/>
                <path d="m19 6-1 14H6L5 6"/>
                <path d="M10 11v5"/>
                <path d="M14 11v5"/>
            </svg>
        </button>


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

        <button type="submit" id="s2s-send-button" aria-label="Send message" style="
            width:44px;
            height:44px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#7BAF9E;
            color:white;
            border:none;
            border-radius:12px;
            cursor:pointer;
            transition:background 0.2s, transform 0.2s;
            flex-shrink:0;
        ">
            <svg width="20" height="20" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round">
                <path d="M22 2L11 13"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
            </svg>
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

// CONVERSATION HISTORY

const STORAGE_KEY = 's2s-chat-history';

let conversation = [];

try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (Array.isArray(saved)) {
        conversation = saved;
    }
} catch (error) {
    console.error('Could not load chat history:', error);
}

function saveConversation() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(conversation.slice(-50))
        );
    } catch (error) {
        console.error('Could not save chat history:', error);
    }
}

// GENERATION CONTROL
let isGenerating = false;
let stopGeneration = false;
let activeController = null;
// CHAT ELEMENTS
const chatForm = chatWindow.querySelector('#s2s-chat-form');
const chatInput = chatWindow.querySelector('#s2s-chat-input');
const chatMessages = chatWindow.querySelector('#s2s-chat-messages');
const clearChatButton = chatWindow.querySelector('#s2s-clear-chat');

clearChatButton.addEventListener('click', () => {
    const confirmed = confirm(
        'Are you sure you want to delete your entire chat history?'
    );

    if (!confirmed) return;
    if (activeController) {
        stopGeneration = true;
        activeController.abort();
    }

    // Clear conversation history
    conversation = [];

    // Delete saved browser history
    localStorage.removeItem(STORAGE_KEY);

    // Remove visible messages
    chatMessages.replaceChildren();

    // Show the welcome message again
    const welcome = document.createElement('div');
    welcome.textContent = 'Hi! Welcome to Streets To Shelters. How can I help you today?';
    welcome.style.cssText = `
        background: #F3F5F4;
        color: #2B1F1C;
        padding: 13px 16px;
        border-radius: 14px;
        max-width: 85%;
        align-self: flex-start;
        font-size: 14px;
        line-height: 1.6;
    `;

    chatMessages.appendChild(welcome);
});
// DISPLAY A MESSAGE

function addMessage(text, sender) {
    const message = document.createElement('div');

    message.style.cssText = `
        max-width: 85%;
        padding: 13px 16px;
        border-radius: 14px;
        font-size: 14px;
        line-height: 1.65;
        overflow-wrap: anywhere;
        ${sender === 'user'
            ? 'background:#7BAF9E; color:white; align-self:flex-end;'
            : 'background:#F3F5F4; color:#2B1F1C; align-self:flex-start;'}
    `;

    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return message;
}

// Format bold text and other inline Markdown


function formatInline(text, element) {
    const pattern = /(\*\*.*?\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+))/g;

    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(text)) !== null) {
        element.appendChild(
            document.createTextNode(text.slice(lastIndex, match.index))
        );

        if (match[0].startsWith('**')) {
            const bold = document.createElement('strong');
            bold.textContent = match[0].slice(2, -2);
            element.appendChild(bold);

        } else {
            let url = match[3] || match[4];
            let trailing = '';

            // Remove punctuation that belongs to the sentence
            while (/[.,!?;:]$/.test(url)) {
                trailing = url.slice(-1) + trailing;
                url = url.slice(0, -1);
            }

            const link = document.createElement('a');
            link.textContent = match[2] || url;
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.style.color = '#477F70';
            link.style.textDecoration = 'underline';

            element.appendChild(link);
            element.appendChild(document.createTextNode(trailing));
        }

        lastIndex = pattern.lastIndex;
    }

    element.appendChild(
        document.createTextNode(text.slice(lastIndex))
    );
}



// Format paragraphs and bullet points
function renderMessage(element, text) {
    element.replaceChildren();

    const lines = text.split('\n');
    let currentList = null;

    lines.forEach(line => {
        const trimmed = line.trim();

        if (!trimmed) {
            currentList = null;
            return;
        }

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            if (!currentList) {
                currentList = document.createElement('ul');
                currentList.style.paddingLeft = '20px';
                currentList.style.margin = '8px 0';
                element.appendChild(currentList);
            }

            const item = document.createElement('li');
            item.style.marginBottom = '5px';
            formatInline(trimmed.slice(2), item);
            currentList.appendChild(item);
        } else {
            currentList = null;

            const paragraph = document.createElement('p');
            paragraph.style.margin = '0 0 10px 0';
            formatInline(trimmed, paragraph);
            element.appendChild(paragraph);
        }
    });
}
if (conversation.length > 0) {
    chatMessages.replaceChildren();
}
// Restore previous messages
conversation.forEach(message => {
    const bubble = addMessage(message.content, message.role);

    if (message.role === 'assistant') {
        renderMessage(bubble, message.content);
        addMessageActions(bubble, message.content);
    } else {
        bubble.textContent = message.content;
    }
});


// Reveal the AI response gradually
async function typeMessage(element, text) {
    let displayedText = '';

    for (let i = 0; i < text.length; i += 3) {

        if (stopGeneration) break;

        displayedText += text.slice(i, i + 3);

        renderMessage(element, displayedText);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        await new Promise(resolve => setTimeout(resolve, 12));
    }

    return displayedText;
}


function showTypingIndicator() {
    const indicator = document.createElement('div');

    indicator.style.cssText = `
        align-self: flex-start;
        background: #F3F5F4;
        padding: 13px 17px;
        border-radius: 14px;
        display: flex;
        gap: 5px;
        align-items: center;
    `;

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');

        dot.style.cssText = `
            width: 7px;
            height: 7px;
            background: #7BAF9E;
            border-radius: 50%;
            animation: s2s-dot 1.2s infinite ease-in-out;
            animation-delay: ${i * 0.2}s;
        `;

        indicator.appendChild(dot);
    }

    if (!document.getElementById('s2s-loading-style')) {
        const style = document.createElement('style');
        style.id = 's2s-loading-style';
        style.textContent = `
            @keyframes s2s-dot {
                0%, 60%, 100% {
                    transform: translateY(0);
                    opacity: 0.4;
                }
                30% {
                    transform: translateY(-5px);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return indicator;
}
function setStopButton(stopping) {
    const sendButton = chatForm.querySelector('button[type="submit"]');

    if (stopping) {
        sendButton.innerHTML = `
            <svg width="17" height="17" viewBox="0 0 24 24"
                 fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
        `;
        sendButton.setAttribute('aria-label', 'Stop generating');
    } else {
        sendButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round">
                <path d="M22 2L11 13"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
            </svg>
        `;
        sendButton.setAttribute('aria-label', 'Send message');
    }
}
chatForm.querySelector('button[type="submit"]')
    .addEventListener('click', (event) => {

        if (!isGenerating) return;

        event.preventDefault();

        stopGeneration = true;

        if (activeController) {
            activeController.abort();
        }

    });

function addMessageActions(message, text) {
    const actions = document.createElement('div');

    actions.style.cssText = `
        display: flex;
        gap: 10px;
        align-self: flex-start;
        margin: -3px 0 14px 5px;
    `;


function createAction(label, icon) {
    const button = document.createElement('button');

    button.type = 'button';
    button.innerHTML = `
        ${icon}
        <span>${label}</span>
    `;

    button.style.cssText = `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 8px 13px;
        border: 1px solid #E4EAE6;
        border-radius: 9px;
        background: #FFFFFF;
        color: #52665D;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    `;

    button.addEventListener('mouseenter', () => {
        button.style.background = '#EDF5F1';
        button.style.borderColor = '#A8C9B9';
        button.style.color = '#477F70';
    });

    button.addEventListener('mouseleave', () => {
        button.style.background = '#FFFFFF';
        button.style.borderColor = '#E4EAE6';
        button.style.color = '#52665D';
    });

    actions.appendChild(button);

    return button;
}



// COPY ICON
const copyIcon = `
    <svg width="15" height="15" viewBox="0 0 24 24"
         fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round"
         stroke-linejoin="round">
        <rect x="8" y="8" width="13" height="13" rx="2"/>
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>
    </svg>
`;

const copyButton = createAction(copyIcon);

copyButton.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(text);

        copyButton.innerHTML = 'Copied!';

        setTimeout(() => {
            copyButton.innerHTML = copyIcon;
        }, 2000);

    } catch (error) {
        console.error('Copy failed:', error);
    }
});


// SHARE ICON
const shareIcon = `
    <svg width="15" height="15" viewBox="0 0 24 24"
         fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round"
         stroke-linejoin="round">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <path d="m8.7 10.7 6.6-4.4"/>
        <path d="m8.7 13.3 6.6 4.4"/>
    </svg>
`;

const shareButton = createAction(shareIcon);

shareButton.addEventListener('click', async () => {
    const shareData = {
        title: 'Streets To Shelters AI',
        text: text,
        url: window.location.origin
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(
                `${text}\n\n${window.location.origin}`
            );

            shareButton.innerHTML = '✓ Copied!';

            setTimeout(() => {
                shareButton.innerHTML = shareIcon;
            }, 2000);
        }

    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Share failed:', error);
        }
    }
});


    chatMessages.appendChild(actions);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}



// SEND MESSAGE TO CLOUDFLARE

// SEND MESSAGE TO CLOUDFLARE
chatForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    if (isGenerating) return;

    const userMessage = chatInput.value.trim();

    if (!userMessage) return;

    // Display visitor message
    addMessage(userMessage, 'user');

    conversation.push({
        role: 'user',
        content: userMessage
    });

    saveConversation();

    chatInput.value = '';
    chatInput.disabled = true;

    // Start generation
    isGenerating = true;
    stopGeneration = false;

    activeController = new AbortController();

    const sendButton = chatForm.querySelector('button[type="submit"]');

    setStopButton(true);
    sendButton.disabled = false;

    const loadingIndicator = showTypingIndicator();

    try {

        const response = await fetch(
            'https://streets-2-shelters-ai.advik-muddasani.workers.dev/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: activeController.signal,
                body: JSON.stringify({
                    messages: conversation.slice(-10)
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed.');
        }

        if (!data.reply) {
            throw new Error('The AI returned an empty response.');
        }

        loadingIndicator.remove();

        if (!stopGeneration) {

            const assistantMessage = addMessage('', 'assistant');

            const displayedText = await typeMessage(
                assistantMessage,
                data.reply
            );

            // Save only the text actually displayed
            if (displayedText.length > 0 && !stopGeneration) {

                conversation.push({
                    role: 'assistant',
                    content: displayedText
                });

                saveConversation();

                addMessageActions(
                    assistantMessage,
                    displayedText
                );
            }
        }

    } catch (error) {

        loadingIndicator.remove();

        if (error.name !== 'AbortError') {

            console.error('S2S AI error:', error);

            addMessage(
                'Sorry, something went wrong. Please try again.',
                'assistant'
            );
        }

    } finally {

        isGenerating = false;
        stopGeneration = false;
        activeController = null;

        chatInput.disabled = false;

        setStopButton(false);

        chatInput.focus();
    }
});

})();


