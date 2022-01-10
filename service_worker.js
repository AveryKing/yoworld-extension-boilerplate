/** Sends message back to the iFrame. Pass a JSON object
 *  to this function and it will be sent to the frame via inject.js
 */
const sendRequest = async (payload) => {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, payload, (response) => {
                resolve(response);
            });
        });
    })

}
/** Handles messages from the iFrame, which are received
 * via inject.js (middleman)
 */
chrome.runtime.onMessage.addListener(
    async (response, sender, sendResponse) => {
        console.log(response)
        try {
            /**
            switch (response.cmd) {
                case 'messageReceived':
                    await doSomething();
                    break;
            }
             **/

        } catch (e) {
            console.log(e)
        }

    }
);