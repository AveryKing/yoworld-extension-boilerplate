/** Sends message back to the YoVilleApp. Pass a JSON object
 *  to this function and it will be sent to the game via inject.js
 */
const sendRequest = async (yoPayload) => {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, yoPayload, (response) => {
                resolve(response);
            });
        });
    })

}
/** Handles messages from the YoVilleApp, which are received
 * via inject.js (middleman)
 */
chrome.runtime.onMessage.addListener(
    async (response, sender, sendResponse) => {
        console.log(response)
        try {
            switch (response.cmd) {
                case 'chatMessageReceived':
                    const {messageText} = response.data;
                    switch (messageText) {
                        case '/gift':
                            await sendActionTween('GIFT');
                            break;
                    }
            }
        } catch (e) {
            console.log(e)
        }

    }
);

const sendActionTween = async (tweenType) => {
    await sendRequest({
        cmd: 'sendActionTween',
        type: tweenType
    })
}

export default {
    sendRequest
}