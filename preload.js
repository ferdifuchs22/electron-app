const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system'),
    confirmChamp: (champ_id) => ipcRenderer.invoke('dark-mode:confirmChamp', champ_id),
    updateTime: (callback) => ipcRenderer.on('update-timer', callback),
    selectedChamp: (champ_id) => ipcRenderer.invoke('update-selected-champ', champ_id),
    champSelectInfo: (callback) => ipcRenderer.on('champ-select-info', callback)
})