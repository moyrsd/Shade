"use strict";
const jsonInputElement = document.getElementById('json-input');
const replayButtonElement = document.getElementById('replay-button');
replayButtonElement.addEventListener('click', () => {
    const jsonText = jsonInputElement.value;
    if (!jsonText) {
        alert('Please paste some JSON first.');
        return;
    }
    try {
        const parsedJson = JSON.parse(jsonText);
        // Send the parsed data to the background script
        chrome.runtime.sendMessage({
            action: 'LOG_JSON',
            data: parsedJson
        });
        alert('JSON sent to the background script. Check the Service Worker console!');
    }
    catch (e) {
        alert('Error: Invalid JSON format.');
        console.error(e);
    }
});
