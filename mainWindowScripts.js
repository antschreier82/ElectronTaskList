const electron = require('electron');
const dialog = electron.dialog;
const fs = require('fs');
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

document.getElementById("saveF").addEventListener('click', function() {
    ipc.send('saveFile')
})

/*
function saveFile() {
    dialog.showSaveDialog((filename) =>{
        if(filename === undefined) {
            alert("You didnt enter a file name");
            return;
        }

        const fileContents = document.getElementById("taskList").value

        fs.writeFile(filename, fileContents, (err) =>{
            if(err){
                console.log(err);
            }

            console.log("File Saved Correctly");
        })
    })
}
*/
ipc.on('writeFile', (evt, theFile) => {
    
    const contents = document.getElementById('taskList').innerHTML

    fs.writeFile(theFile, contents, (err) =>{
        if(err) {
            console.log(err)
        }

        alert("file Saved")
    })
})

ipc.on('unsaved', (evt, arg) => {
    alert("File Not Saved")
})

ipc.on('openFile', (evt,theFile) => {
    //readFile(theFile)

    fs.readFile(theFile, 'utf-8', (err, data) =>{
        if(err) {
            console.log("error retreiving data")
        }

        const outputList = document.getElementById('taskList')

        outputList.innerHTML = data
    })
})

ipc.on('unOpened', (evt, arg)=> {
    alert("file not opened")
})
/*
function readFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) =>{
        if(err) {
            console.log("error retreiving data")
        }

        const outputList = document.getElementById('taskList')

        outputList.innerHTML = data
    })
}
*/