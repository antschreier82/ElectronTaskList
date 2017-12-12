const electron = require('electron');
const ipc = electron.ipcRenderer;


ipc.on('addList', (evt, item) =>{
    document.getElementById('taskList').value = item;
})

document.getElementById('add').addEventListener('click', function (){
    const item = document.getElementById("item").value;
    ipc.send('add-Item', item);

})

