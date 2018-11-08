import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
// import { autoUpdater } from 'electron-updater';

let win: any, serve: any;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
  });
  win.maximize();
  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

// -------------------------------------------------------------------------
// related to auto update feature
// -------------------------------------------------------------------------

// function sendStatusToWindow(text: any) {
//   win.webContents.send('message', text);
// }

// autoUpdater.on('checking-for-update', () => {
//   sendStatusToWindow('Checking for update...');
// });
// autoUpdater.on('update-available', () => {
//   sendStatusToWindow('Update available.');
// });
// autoUpdater.on('update-not-available', () => {
//   sendStatusToWindow('Update not available.');
// });
// autoUpdater.on('error', (err) => {
//   sendStatusToWindow('Error in auto-updater. ' + err);
// });
// autoUpdater.on('download-progress', (progressObj) => {
//   let logMessage = 'Download speed: ' + progressObj.bytesPerSecond;
//   logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%';
//   logMessage = logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
//   sendStatusToWindow(logMessage);
// });
// autoUpdater.on('update-downloaded', () => {
//   sendStatusToWindow('Update downloaded');
// });
// app.on('ready', function()  {
//   autoUpdater.checkForUpdatesAndNotify();
// });
