const electron = require('electron');
const url = require('url');
const path = require('path');

const { app,BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

//Listen for app to be ready

app.on('ready', function() {
  //create new mainWindow
  mainWindow = new BrowserWindow({});
  //Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert Menu
  Menu.setApplicationMenu(mainMenu);
});

//Handle create add mainWindow
function createAddWindow() {
  //create new mainWindow
  addWindow = new BrowserWindow({
    width: 200,
    height:300,
    title: 'Add Shopping List Item'
  });
  //Load html into window
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
}

//Create menu template
const mainMenuTemplate = [{
  label: 'File',
  submenu: [{
      label: 'Add Item',
      click(){
        createAddWindow();
      }
    },
    {
      label: 'Clear Items'
    },
    {
      label: 'Quit',
      accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
      click() {
        app.quit();
      }
    }
  ]
}];
