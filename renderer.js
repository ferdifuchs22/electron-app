document.getElementById('show-recommendation').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'

    let rec = document.getElementById("recommendations")
    let all = document.getElementById("all")
    if(rec.style.display == "" || rec.style.display == "none") {
        rec.style.display = "flex";
        all.style.display = "none";
    }
})
  
document.getElementById('show-all').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'

    let rec = document.getElementById("recommendations")
    let all = document.getElementById("all")
    if(all.style.display == "" || all.style.display == "none") {
        all.style.display = "grid";
        rec.style.display = "none";
    }
})

document.getElementById('confirm-champ-selection').addEventListener('click', async () => {
    await window.darkMode.confirmChamp("1")
    document.getElementById('theme-source').innerHTML = 'Selected'
})