const electron = require('electron')
require('electron-debug')({ showDevTools: false })

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true,
    toolbar: false,
  })

  mainWindow.setMenuBarVisibility(false);
  mainWindow.setAutoHideMenuBar(true);

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', app.quit)

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
