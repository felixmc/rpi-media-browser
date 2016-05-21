const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({fullscreen: true})

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', app.quit)

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.