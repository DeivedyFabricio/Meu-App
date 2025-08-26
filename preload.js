const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onAcao: (callback) => ipcRenderer.on("acao", (event, value) => callback(value)),
});