/*async function getChamps () {
    const champIDs = await window.darkMode.sendChamps()
    console.log(champIDs)
}*/

document
  .getElementById("show-recommendation")
  .addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById("theme-source").innerHTML = isDarkMode
      ? "Dark"
      : "Light";

    let rec = document.getElementById("recommendations");
    let all = document.getElementById("all");
    if (rec.style.display == "" || rec.style.display == "none") {
      rec.style.display = "flex";
      all.style.display = "none";
    }
  });

const all_node = document.getElementById("all");

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

document.getElementById("show-all").addEventListener("click", async () => {
  removeAllChildNodes(all_node)
  const champIDs = await window.darkMode.system();
  champIDs.sort((a, b) => (a.name > b.name ? 1 : -1));

  for (champ in champIDs) {
    const selector = document.createElement("div");
    selector.classList.add("all-champion-selector");

    const box = document.createElement("div");
    box.classList.add("all-champion-box");

    const box_img = document.createElement("img");
    box_img.src =
      "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
      champIDs[champ]["name"] +
      ".png";
    box.appendChild(box_img);

    const name = document.createElement("div");
    name.classList.add("all-champion-name");
    name.innerText = champIDs[champ]["name"];

    selector.appendChild(box);
    selector.appendChild(name);

    all_node.appendChild(selector);
  }
  document.getElementById("theme-source").innerHTML = "System";

  let rec = document.getElementById("recommendations");
  let all = document.getElementById("all");
  if (all.style.display == "" || all.style.display == "none") {
    all.style.display = "grid";
    rec.style.display = "none";
  }
});

document
  .getElementById("confirm-champ-selection")
  .addEventListener("click", async () => {
    await window.darkMode.confirmChamp("1");
    document.getElementById("theme-source").innerHTML = "Selected";
  });



var countDownTime
var x
window.darkMode.updateTime((event, value) => {
  
  clearInterval(x);
  countDownTime = value;
  x = setInterval(function() {
    var timeInSeconds = countDownTime / 1000;
    document.getElementById("countdownTimer").innerHTML = Math.round(timeInSeconds - 2) + " seconds"
    countDownTime = countDownTime - 1000;
    if (countDownTime < 0) {
      
      document.getElementById("countdownTimer").innerHTML = "0 seconds"
    }
  }, 1000)
  
})



