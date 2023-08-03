/*async function getChamps () {
    const champIDs = await window.darkMode.sendChamps()
    console.log(champIDs)
}*/

const c_names = { 
  266: "Aatrox",
  103: "Ahri",
  84: "Akali",
  166: "Akshan",
  12: "Alistar",
  32: "Amumu",
  34: "Anivia",
  1: "Annie",
  523: "Aphelios",
  22: "Ashe",
  136: "Aurelion Sol",
  268: "Azir",
  432: "Bard",
  200: "Bel'Veth",
  53: "Blitzcrank",
  63: "Brand",
  201: "Braum",
  51: "Caitlyn",
  164: "Camille",
  69: "Cassiopeia",
  31: "Cho'Gath",
  42: "Corki",
  122: "Darius",
  131: "Diana",
  119: "Draven",
  36: "Dr. Mundo",
  245: "Ekko",
  60: "Elise",
  28: "Evelynn",
  81: "Ezreal",
  9: "Fiddlesticks",
  114: "Fiora",
  105: "Fizz",
  3: "Galio",
  41: "Gangplank",
  86: "Garen",
  150: "Gnar",
  79: "Gragas",
  104: "Graves",
  887: "Gwen",
  120: "Hecarim",
  74: "Heimerdinger",
  420: "Illaoi",
  39: "Irelia",
  427: "Ivern",
  40: "Janna",
  59: "Jarvan IV",
  24: "Jax",
  126: "Jayce",
  202: "Jhin",
  222: "Jinx",
  145: "Kai'Sa",
  429: "Kalista",
  43: "Karma",
  30: "Karthus",
  38: "Kassadin",
  55: "Katarina",
  10: "Kayle",
  141: "Kayn",
  85: "Kennen",
  121: "Kha'Zix",
  203: "Kindred",
  240: "Kled",
  96: "Kog'Maw",
  897: "K'Sante",
  7: "LeBlanc",
  64: "Lee Sin",
  89: "Leona",
  876: "Lillia",
  127: "Lissandra",
  236: "Lucian",
  117: "Lulu",
  99: "Lux",
  54: "Malphite",
  90: "Malzahar",
  57: "Maokai",
  11: "Master Yi",
  21: "Miss Fortune",
  902: "Milio",
  82: "Mordekaiser",
  25: "Morgana",
  267: "Nami",
  75: "Nasus",
  111: "Nautilus",
  518: "Neeko",
  76: "Nidalee",
  895: "Nilah",
  56: "Nocturne",
  20: "Nunu",
  2: "Olaf",
  61: "Orianna",
  516: "Ornn",
  80: "Pantheon",
  78: "Poppy",
  555: "Pyke",
  246: "Qiyana",
  133: "Quinn",
  497: "Rakan",
  33: "Rammus",
  421: "Rek'Sai",
  526: "Rell",
  888: "Renata Glasc",
  58: "Renekton",
  107: "Rengar",
  92: "Riven",
  68: "Rumble",
  13: "Ryze",
  360: "Samira",
  113: "Sejuani",
  235: "Senna",
  147: "Seraphine",
  875: "Sett",
  35: "Shaco",
  98: "Shen",
  102: "Shyvana",
  27: "Singed",
  14: "Sion",
  15: "Sivir",
  72: "Skarner",
  37: "Sona",
  16: "Soraka",
  50: "Swain",
  517: "Sylas",
  134: "Syndra",
  223: "Tahm Kench",
  163: "Taliyah",
  91: "Talon",
  44: "Taric",
  17: "Teemo",
  412: "Thresh",
  18: "Tristana",
  48: "Trundle",
  23: "Tryndamere",
  4: "Twisted Fate",
  29: "Twitch",
  77: "Udyr",
  6: "Urgot",
  110: "Varus",
  67: "Vayne",
  45: "Veigar",
  161: "Vel'Koz",
  711: "Vex",
  254: "Vi",
  234: "Viego",
  112: "Viktor",
  8: "Vladimir",
  106: "Volibear",
  19: "Warwick",
  62: "Wukong",
  498: "Xayah",
  101: "Xerath",
  5: "Xin Zhao",
  157: "Yasuo",
  777: "Yone",
  83: "Yorick",
  350: "Yuumi",
  154: "Zac",
  238: "Zed",
  221: "Zeri",
  115: "Ziggs",
  26: "Zilean",
  142: "Zoe",
  143: "Zyra"
}

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

function convertChampName(champ_name) {
    var champ_filtered = champ_name.replace(/\W/g, "")
    if(champ_filtered == "Wukong"){
	    champ_filtered = "MonkeyKing"
    }
    if(champ_filtered == "RenataGlasc"){
      champ_filtered = "Renata"
    }
    if(champ_filtered == "NunuWillump"){
      champ_filtered = "Nunu"
    }
    return champ_filtered
}

function getChampNameForId(champ_id) {
  c_name = c_names[champ_id];
  return convertChampName(c_name)
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
    
    var string_champ_filtered = convertChampName(champ_name);
    
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
  allActions = value["actions"].flat()
  const bannedChamps = allActions.filter(x => x.type === "ban" && x.completed).map(x => x.championId);
  
  var blue_counter = 0;
  for(member in value["myTeam"]) {
    const collection = document.getElementById("blue-pick-"+blue_counter).children;
    const role_wrapper = collection[1];
    role_wrapper.innerText = value["myTeam"][member]["assignedPosition"];

    if(value["myTeam"][member]["championId"] == 0){
      blue_counter += 1;
      continue;
    } 
    
    const image_wrapper = collection[0].children;
    image_wrapper[0].src = "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
    getChampNameForId(value["myTeam"][member]["championId"]) +
    ".png";
    blue_counter += 1;
  }

  var red_counter = 0;
  for(red_member in value["theirTeam"]) {
    const red_collection = document.getElementById("red-pick-"+red_counter).children;
    const red_role_wrapper = red_collection[0];
    red_role_wrapper.innerText = value["theirTeam"][member]["assignedPosition"];


    if(value["theirTeam"][red_member]["championId"] == 0){
      red_counter += 1;
      continue;
    } 
    
    const red_image_wrapper = red_collection[1].children;
    red_image_wrapper[0].src = "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
    getChampNameForId(value["theirTeam"][red_member]["championId"]) +
    ".png";
    red_counter += 1;
  }

  var blue_ban_counter = 0;
  for (ban in value["bans"]["myTeamBans"]) {
    const blue_ban_box = document.getElementById("blue-ban-"+blue_ban_counter).children;
    blue_ban_box[0].src = "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
    getChampNameForId(value["bans"]["myTeamBans"][ban]) +
    ".png";
    blue_ban_counter += 1;
  }

  var red_ban_counter = 0;
  for (ban in value["bans"]["theirTeamBans"]) {
    const red_ban_box = document.getElementById("red-ban-"+red_ban_counter).children;
    red_ban_box[0].src = "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
    getChampNameForId(value["bans"]["theirTeamBans"][ban]) +
    ".png";
    red_ban_counter += 1;
  }
})



