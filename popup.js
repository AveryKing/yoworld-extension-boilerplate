
/*** JS for the popup page ***/
import yoService from './service_worker.js';
document.getElementById('send-message').onclick = async () => {
    await yoService.sendRequest({
        cmd: 'showMessage'
    })
}