import { app, BrowserWindow } from 'electron';

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
      webSecurity: false,
    },
  });

  mainWindow.loadURL(windowUrl);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
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
  require('../server')
}
