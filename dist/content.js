const handleReplayEvent = (event) => {
    const { type, payload } = event;
    if (!payload.selector) {
        console.warn('Replay Info: Skipping event with no selector.', event);
        return true; // Not an error, just an event we can't act on (like tab_activated)
    }
    const element = document.querySelector(payload.selector);
    if (!element) {
        console.error(`Replay Error: Element not found for selector:`, payload.selector);
        return false;
    }
    switch (type) {
        case "click":
            element.click();
            break;
        case "focus":
            element.focus();
            break;
        case "input":
        case "change":
            // Use type assertion after checking element type for safety
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                element.value = payload.value ?? '';
                element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            }
            else {
                console.error(`Replay Error: Cannot set value on non-input element for selector:`, payload.selector);
                return false;
            }
            break;
        default:
            console.warn(`Replay Warning: Unhandled event type "${type}"`);
            return true; // Not a failure, just not handled
    }
    return true;
};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "REPLAY_EVENT" && message.event) {
        const success = handleReplayEvent(message.event);
        sendResponse({ status: success ? "success" : "error" });
    }
    // Return true to indicate you wish to send a response asynchronously
    return true;
});
export {};
