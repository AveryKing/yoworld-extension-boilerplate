
/** This code is injected into the page and serves as a middle-man
 *   for communicating between the extension and the iFrame on the page
 */
chrome.runtime.sendMessage({}, function (response) {
    const readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            chrome.runtime.onMessage.addListener(
                function (payload, sender, sendResponse) {
                    /** Replace IFRAME ID with the ID of iFrame you are injecting **/
                    let frame = document.getElementById('IFRAME ID').contentWindow;
                    frame.postMessage(payload, '*')
                    return true;
                }
            );
            window.onmessage = function (response) {
                chrome.runtime.sendMessage(response.data);
            }
        }
    }, 10);
});