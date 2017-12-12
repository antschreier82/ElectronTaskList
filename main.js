const electron = require('electron')
const app = electron.app
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

const template = [
    {
        label: "File",
        
        submenu: [ {
            label: "Open"
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

ipc.on('add-Item',(evt, item) =>{
    const theItem = item
    mainWindow.webContents.send('addList', theItem)
    console.log(theItem)
})