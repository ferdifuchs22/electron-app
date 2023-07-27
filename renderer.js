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
    champ_name = champIDs[champ]["name"]
    if (champ_name == "None"){
      continue
    }
    const selector = document.createElement("div");
    selector.classList.add("all-champion-selector");

    const box = document.createElement("button");
    box.classList.add("all-champion-box");
    box.addEventListener('click', selectRecommendedChamp, false);
    box.champId = champIDs[champ]["id"]

    const box_img = document.createElement("img");
    
    var string_champ_filtered = champ_name.replace(/\W/g, "")
    if(string_champ_filtered == "Wukong"){
	    string_champ_filtered = "MonkeyKing"
    }
    if(string_champ_filtered == "RenataGlasc"){
      string_champ_filtered = "Renata"
    }
    if(string_champ_filtered == "NunuWillump"){
      string_champ_filtered = "Nunu"
    }
    box_img.src =
      "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
      string_champ_filtered +
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

var selectedChampId = "-1"
/*window.darkMode.selectedChamp((event, value) => {
  selectedChampId = value;
})*/

async function selectRecommendedChamp(event) {
  selectedChampId = await window.darkMode.selectedChamp(event.currentTarget.champId);
}

const rec_one = document.getElementById('rec-1');
const rec_two = document.getElementById('rec-2');
const rec_three = document.getElementById('rec-3');

rec_one.addEventListener('click', selectRecommendedChamp, false);
rec_one.champId = 526
rec_two.addEventListener('click', selectRecommendedChamp, false);
rec_two.champId = 37
rec_three.addEventListener('click', selectRecommendedChamp, false);
rec_three.champId = 99

document
  .getElementById("confirm-champ-selection")
  .addEventListener("click", async () => {
    if(selectedChampId != "-1"){
      await window.darkMode.confirmChamp(selectedChampId);
      document.getElementById("theme-source").innerHTML = "Selected";
    }
    
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

window.darkMode.champSelectInfo((event, value) => {
  myTeam = value;
  console.log("myteam: " + myTeam)
})



