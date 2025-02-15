import {
    createAndShowNotification,
    parseEmote,
    saveEmoteToLocalStorage,
    createAndCopyEmoteURL,
    pushEmoteToDOM
} from './modules.js';
import { emotesClass } from './packs.js';

let localStorage = window.localStorage;
document.getElementById('entryField').addEventListener('submit', (event) => event.preventDefault()); // avoid form submission
document.getElementById('entryField').focus(); // focus on input field on page load


// Get value from field on (Enter) keypress
document.getElementById('entryField').onkeydown = function(event) {

    // Get value from field, clear field
    if (event.keyCode === 13) {
        let inputFieldValue = document.getElementById('entryField').value;
        let {id, url, type} = parseEmote(inputFieldValue);
        saveEmoteToLocalStorage(id, url, type);
        pushEmoteToDOM(id, url, type);

        // Add event listener to emote
        document.getElementById(`${id}/${type}`).addEventListener('click', function(event) {
            createAndCopyEmoteURL(event.target);
            createAndShowNotification('Copied!');
        });
        
        document.getElementById('entryField').value = '';
    };
};


// Load and push emotes from local storage
function loadAndPushEmotesFromLocalStorage() {

    Object.keys(json).forEach((key, index) => {
        
        let emoteID = json[index].split('/emojis/')[1].split('.')[0],
            emoteType = json[index].split('/emojis/')[1].split('.')[1].split('?')[0];
        let emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}.${emoteType}?size=48`;
        pushEmoteToDOM(emoteID, emoteURL, emoteType);
    });

    for (let i = 0; i < localStorage.length; i++) {

        let emoteID = localStorage.key(i);
        if (parseInt(emoteID)) {

            let emoteObj = JSON.parse(localStorage.getItem(emoteID));
            pushEmoteToDOM(emoteID, emoteObj.emoteURL, emoteObj.emoteType);
        };
    };

    Object.keys(document.getElementsByClassName('image')).forEach(index => {
        document.getElementsByClassName('image')[index].addEventListener('click', function(e) {
            createAndCopyEmoteURL(this.id);
            createAndShowNotification('Copied!');
        });
    });
};
// loadAndPushEmotesFromLocalStorage();



// ..
function main() {
    
    // push emotes from default.json
    let emoteObject = Object.values(emotesClass.content.content);
    console.log(emoteObject);
    for (let item of emoteObject) {

        let {id, url, type} = parseEmote(item);
        pushEmoteToDOM(id, url, type);

        // Add event listener to each emote
        document.getElementById(`${id}/${type}`).addEventListener('click', function(event) {
            createAndCopyEmoteURL(event.target);
            createAndShowNotification('Copied!');
        });
    };

    // push emotes from local storage
    for (let i = 0; i < localStorage.length; i++) {

        let emoteID = localStorage.key(i);
        if (parseInt(emoteID)) {

            let emoteObj = JSON.parse(localStorage.getItem(emoteID));
            pushEmoteToDOM(emoteID, emoteObj.url, emoteObj.type);

            // Add event listener to each emote
            document.getElementById(`${emoteID}/${emoteObj.type}`).addEventListener('click', function(event) {
                createAndCopyEmoteURL(event.target);
                createAndShowNotification('Copied!');
            });
        };
    };

};
main();