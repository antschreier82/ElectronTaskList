const electron = require('electron')
const app = electron.app
const dialog = electron.dialog
const BrowserWindow  = electron.BrowserWindow
const Menu = electron.Menu
const ipc = electron.ipcMain


app.on('ready', function(){
    mainWindow = new BrowserWindow();

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed', function(){
        app.quit();
    })

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', function(){
        mainWindow =  null;
    })
})

//Add window

function createAddWindow(){
    
    addWindow = new BrowserWindow({
        width: 500,
        height: 500,
        title:'Add Item'
    });
    
    addWindow.loadURL(`file://${__dirname}/addItem.html`)

    addWindow.on('close', function(){
        addWindow = null;
    })
    
}

//Custom Menu Template
const template = [
    {
        label: "File",
        
        submenu: [ {
            label: "Open",
            click() {
                openFile();
            }
        }   
        ]
    },
    {
        label: "Items",

        submenu: [{
            label: "Add Item",
            click(){
                createAddWindow();
            }
        },
        {type: 'separator'}, 
        {
            label: "Clear Items",
            click: function() {
                mainWindow.webContents.send("clearList");
            }
        }
    ]
    },
    {
        label: "Settings",

        submenu: [{
            label: "Developer Tools",
            click: function(item,focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        },
        {type: 'separator'},
    {
        label: "Quit",
        click: function() {
            app.quit();
        },
        accelerator: 'Ctrl + Q'
    }]
    }
]


//ipc add item

ipc.on('add-Item',(evt, item) =>{
    const theItem = item
    mainWindow.webContents.send('addList', theItem)
})

//ipc save file
ipc.on('saveFile', (evt, arg) => {
     const filename = dialog.showSaveDialog((filename) => {
        
        if(filename === undefined) {
            mainWindow.webContents.send('unsaved')
        }

        mainWindow.webContents.send('writeFile', filename)
    })
})
//open file function for the menu item
function openFile() {
    dialog.showOpenDialog((filenames) => {
        
        if (filenames === undefined) {
            mainWindow.webContents.send('unOpened')
        }

        mainWindow.webContents.send('openFile', filenames[0])
    })
}
