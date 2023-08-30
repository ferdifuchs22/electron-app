const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
    confirmChamp: (champ_id) => ipcRenderer.invoke('dark-mode:confirmChamp', champ_id),
    currentTurn: (callback) => ipcRenderer.on('current-turn', callback),
    updateTime: (callback) => ipcRenderer.on('update-timer', callback),
    selectedChamp: (champ_id) => ipcRenderer.invoke('update-selected-champ', champ_id),
    selectableChamps: (callback) => ipcRenderer.on('selectable-champs', callback), 
    recommendedChamps: (callback) => ipcRenderer.on('recommended-champs', callback),
    createOrDelete: (callback) => ipcRenderer.on('create_or_delete', callback),
    champSelectInfo: (callback) => ipcRenderer.on('champ-select-info', callback)
    
})