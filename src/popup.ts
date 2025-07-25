const jsonInputElement = document.getElementById('json-input') as HTMLTextAreaElement;
const replayButtonElement = document.getElementById('replay-button') as HTMLButtonElement;

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

    } catch (e) {
        alert('Error: Invalid JSON format.');
        console.error(e);
    }
});
