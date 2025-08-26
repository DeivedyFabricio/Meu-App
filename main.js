const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function showCustomAlert() {
  const alertWin = new BrowserWindow({
    width: 300,
    height: 150,
    title: "Sobre o App", // 👈 título customizado
    modal: true,
    parent: mainWindow,
    webPreferences: { nodeIntegration: true },
  });
}

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Primeiro Aplicativo",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  const menuTemplate = [
    {
      label: "Arquivo",
      submenu: [
        {
          label: "Novo",
          accelerator: "Ctrl+N",
          click: () => {
            mainWindow.webContents.send("acao", "novo");
          },
        },
        { role: "quit", label: "Sair" },
      ],
    },

    {
    label: "Sobre",
    accelerator: "Ctrl+S",
    submenu: [
      {
        label: "Informações",
        click: () => {
            mainWindow.webContents.send("acao", "sobre");
          },
      },
    ],
  },
];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});