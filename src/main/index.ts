import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import request from './utils/request';

let mainWindow: BrowserWindow;

const windowUrl =
  process.env.APP_ENV === 'development'
    ? `http://localhost:4396`
    : `file://${__dirname}/index.html`;

function createWindow() {
  runServer();
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(windowUrl);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  if (process.env.APP_ENV === 'development') {
    require('devtron').install();

    installExtension(REACT_DEVELOPER_TOOLS)
      .then()
      .catch(err => console.log('An error occurred: ', err));
    installExtension(REDUX_DEVTOOLS)
      .then()
      .catch(err => console.log('An error occurred: ', err));
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

function runServer() {
  require('../server');
}

ipcMain.on('fetch', event => {
  request.get('http://localhost:9080', {}).then(res => {
    event.returnValue = res;
  });
});
