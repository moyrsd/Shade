// Listen for any message from other parts of the extension
chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
    
    // Check if the message is the one we're looking for
    if (message.action === 'LOG_JSON') {
        console.log("✅ JSON successfully received from popup!");
        console.log("Here is the parsed data:");
        console.log(message.data);
    }

});

console.log("Background script loaded and listening.");
