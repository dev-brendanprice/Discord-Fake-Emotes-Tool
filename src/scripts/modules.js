
let localStorage = window.localStorage;

// Create and show notification
export function createAndShowNotification(notificationMessage) {
    
    let notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = notificationMessage;
    document.body.appendChild(notification);

    // Animation for notification slide up
    setTimeout(() => {
        notification.classList.add('notificationAnimationCreate');
    });

    // Animation for notification fade out
    setTimeout(() => {
        notification.classList.add('notificationAnimationRemove');
    }, 3000);
};


// Parse emote ID, URL and emote type from the input
export function parseEmote(inputValue) {
    console.log(inputValue);

    let urlSplit = inputValue.split('/emojis/')[1].split('.');
    let id = urlSplit[0]; // get emote id
    
    // get emote type and force size 48
    let url = new URL(inputValue);
    let params = new URLSearchParams(url.search);
    params.set('size', '48');
    url.search = params.toString();
    url = url.toString();
    let type = urlSplit[1].split('?')[0];

    return {id, url, type};
};


// Save emote URL to local storage
export function saveEmoteToLocalStorage(id, url, type) {
    localStorage.setItem(`${id}`, JSON.stringify({url:url, type:type}));
};


// Create and copy emote URL to clipboard
export function createAndCopyEmoteURL(emoteElement) {
    
    let url = emoteElement.src

    // check if emote animated=true
    if (emoteElement.src.includes('animated=true')) {
        url = url.replace('.webp', '.gif');
    };

    // Add emote URL to clipboard
    navigator.clipboard.writeText(url);
};


// Push emote to DOM
export function pushEmoteToDOM(id, url, type) {

    let emote = document.createElement('img');
    emote.className = 'image';
    emote.id = `${id}/${type}`;
    emote.src = url;
    document.getElementById('imagesContainer').appendChild(emote);
};