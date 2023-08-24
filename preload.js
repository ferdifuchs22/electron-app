const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system'),
    confirmChamp: (champ_id) => ipcRenderer.invoke('dark-mode:confirmChamp', champ_id),
    currentTurn: (callback) => ipcRenderer.on('current-turn', callback),
    updateTime: (callback) => ipcRenderer.on('update-timer', callback),
    selectedChamp: (champ_id) => ipcRenderer.invoke('update-selected-champ', champ_id),
    selectableChamps: (callback) => ipcRenderer.on('selectable-champs', callback), 
    recommendedChamps: (callback) => ipcRenderer.on('recommended-champs', callback),
    champSelectInfo: (callback) => ipcRenderer.on('champ-select-info', callback)
    
})