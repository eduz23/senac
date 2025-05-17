const { app, BrowserWindow } = require('electron');
const path = require('path');
const {registrarAlunoHandler} = require('./alunoHandler.js');


function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile('alunos.html')
}

app.whenReady().then(() => {
  createWindow();
  registrarAlunoHandler()
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

