/** This listener is injected into the page and serves as a middle-man
 *   for communicating between the extension and YoVilleApp
 */
chrome.runtime.sendMessage({}, (response) => {
    const readyStateCheckInterval = setInterval(() => {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            chrome.runtime.onMessage.addListener(
                (yoPayload, sender, sendResponse) => {
                    let yoworld = document.getElementById('iframe_canvas').contentWindow;
                    yoworld.postMessage(yoPayload, '*')
                    return true;
                }
            );
            window.onmessage = (response) => {
                chrome.runtime.sendMessage(response.data);
            }
        }
    }, 10);
});