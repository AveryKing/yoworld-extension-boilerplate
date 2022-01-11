import yoService from './service_worker.js';

let message = document.getElementById('message').value
document.getElementById('send-message').onclick = async () => {
    await yoService.sendRequest({
        cmd: 'showMessage',
        message: message
    })
}