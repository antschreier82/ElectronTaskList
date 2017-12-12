const electron = require('electron');
const ipc = electron.ipcRenderer;

ipc.on('addList', (evt, item) =>{
    const ul = document.getElementById('taskList');
    const li = document.createElement('li');
    const itemText = document.createTextNode(item);
    li.appendChild(itemText);
    ul.appendChild(li);
    

})

ipc.on('clearList', (evt, arg) =>{
    const ul = document.getElementById('taskList');
    ul.innerHTML = '';
})

const ul = document.getElementById('taskList');
ul.addEventListener('dblclick', removeItem);

function removeItem(evt) {
    evt.target.remove();
}