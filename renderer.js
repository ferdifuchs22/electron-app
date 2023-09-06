/*async function getChamps () {
    const champIDs = await window.darkMode.sendChamps()
    console.log(champIDs)
}*/
//const current_turn_handler = require("./renderer_handle_currentTurn");

const c_names = {
  0: "None",
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
  950: "Naafiri",
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
  143: "Zyra",
};

const rec_node = document.getElementById("recommendations")
const all_node = document.getElementById("all");
const all_champs_node = document.getElementById("all_champs");
const text_filter = document.getElementById("champ_text_filter")

text_filter.addEventListener("input", (event) => {
  for (var i = 0; i < all_champs_node.children.length; i++) {
    child = all_champs_node.children[i];
    if (!child.children[1].innerText.toLowerCase().includes(text_filter.value.toLowerCase())) {
      child.style.display = "none"
    } else {
      child.style.display = "block"
    }
  }
})

document.getElementById("show-recommendation").addEventListener("click", () => {
  if (rec_node.style.display == "" || rec_node.style.display == "none") {
    rec_node.style.display = "flex";
    all_node.style.display = "none";
  }
});

document.getElementById("show-all").addEventListener("click", () => {
  if (all_node.style.display == "" || all_node.style.display == "none") {
    all_node.style.display = "flex";
    rec_node.style.display = "none";
  }
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function removeBannedChamps(bannedChampData) {
  for (var i = 0; i < all_champs_node.children.length; i++) {
    var all_child = all_champs_node.children[i];
    let first = all_child.firstChild;
    let id = first.champId;
    bannedChampData.forEach((banned_id) => {
      if (id === banned_id) {
        all_champs_node.removeChild(all_child);
      }
    });
  }
}

function removePickedChamps(pickedChampData) {
  for (var i = 0; i < all_champs_node.children.length; i++) {
    var all_child = all_champs_node.children[i];
    let first = all_child.firstChild;
    let id = first.champId;
    pickedChampData.forEach((picked_id) => {
      if (id === picked_id) {
        all_champs_node.removeChild(all_child);
      }
    });
  }
}

function clearAll() {

  removeAllChildNodes(all_champs_node)

  const instructions = document.getElementById("application_header")
  instructions.innerText = ""

  const timer = document.getElementById("countdownTimer")
  timer.innerText = ""

  for (let i = 0; i < 5; i++) {
    
    const blue_collection = document.getElementById("blue-pick-" + i);
    //blue_collection.style.backgroundColor = "";
    blue_collection.classList.remove("active-blue");
    blue_collection.classList.remove("banning-blue");
    blue_collection.classList.remove("active-player");
    const blue_role_wrapper = blue_collection.children[1];
    
    for (var j = 0; j < blue_role_wrapper.children.length; j++) {
      let blue_wrapper_child = blue_role_wrapper.children[j];
      blue_wrapper_child.innerText = ""
    }
    
    const blue_image_wrapper = blue_collection.children[0].children;
    blue_image_wrapper[0].src = "";
    
    const red_collection = document.getElementById("red-pick-" + i);
    //red_collection.style.backgroundColor = "";
    red_collection.classList.remove("active-red");
    red_collection.classList.remove("banning-red");
    const red_role_wrapper = red_collection.children[0];
    
    for (var k = 0; k < red_role_wrapper.children.length; k++) {
      let red_wrapper_child = red_role_wrapper.children[k];
      red_wrapper_child.innerText = ""
    }
    
    
    const red_image_wrapper = red_collection.children[1].children;
    red_image_wrapper[0].src = "";

    const blue_ban_box = document.getElementById("blue-ban-" + i).children;
    blue_ban_box[0].src = "";
    const red_ban_box = document.getElementById("red-ban-" + i).children;
    red_ban_box[0].src = "";
    
  }
}

function convertChampName(champ_name) {
  var champ_filtered = champ_name.replace(/\W/g, "");
  if (champ_filtered == "Wukong") {
    champ_filtered = "MonkeyKing";
  }
  if (champ_filtered == "RenataGlasc") {
    champ_filtered = "Renata";
  }
  if (champ_filtered == "NunuWillump") {
    champ_filtered = "Nunu";
  }
  return champ_filtered;
}

function getChampNameForId(champ_id) {
  c_name = c_names[champ_id];
  return convertChampName(c_name);
}

var selectedChampId = "-1";
/*window.darkMode.selectedChamp((event, value) => {
  selectedChampId = value;
})*/

async function selectRecommendedChamp(event) {
  // MAKE BUTTON SELECTABLE AND HIGHLIGHT SELECTED RECOMMENDATION

  let rec_childs = document.querySelectorAll("#recommendations *");
  rec_childs.forEach((element) => {
    element.classList.remove("active-button");
  });

  let all_childs = document.querySelectorAll(".all-champion-selector *");
  all_childs.forEach((element) => {
    element.classList.remove("active-button");
  });

  event.currentTarget.classList.add("active-button");

  selectedChampId = await window.darkMode.selectedChamp(
    event.currentTarget.champId
  );
  if (selectedChampId != "-1") {
    let btn = document.getElementById("confirm-champ-selection");
    btn.disabled = false;
  }
}

document
  .getElementById("confirm-champ-selection")
  .addEventListener("click", async () => {
    if (selectedChampId != "-1") {
      await window.darkMode.confirmChamp(selectedChampId);
      let btn = document.getElementById("confirm-champ-selection");
      btn.disabled = true;
    }
  });

var countDownTime;
var x;
window.darkMode.updateTime((event, value) => {
  clearInterval(x);
  countDownTime = value;
  x = setInterval(function () {
    var timeInSeconds = countDownTime / 1000;
    document.getElementById("countdownTimer").innerHTML =
      Math.round(timeInSeconds - 2) + " seconds";
    countDownTime = countDownTime - 1000;
    if (countDownTime < 0) {
      document.getElementById("countdownTimer").innerHTML = "0 seconds";
    }
  }, 1000);
});

function showPickableChamps(champData) {
  //filterChildNodes(all_node, champData)
  const champIDs = champData;
  /*
  PROBLEM HERE WHEN SWITCHING FROM PICKABLE TO BANABLE
  */
  if (all_champs_node.children.length !== 0) {
    return;
  }
  for (champ in champIDs) {
    champ_id = parseInt(champIDs[champ]);
    champ_name = c_names[champ_id];
    if (champ_name == "None") {
      continue;
    }
    const selector = document.createElement("div");
    selector.classList.add("all-champion-selector");

    const box = document.createElement("button");
    box.classList.add("all-champion-box");
    box.addEventListener("click", selectRecommendedChamp, false);
    box.champId = champ_id;

    const box_img = document.createElement("img");

    var string_champ_filtered = convertChampName(champ_name);

    box_img.src =
      "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
      string_champ_filtered +
      ".png";
    box.appendChild(box_img);

    const name = document.createElement("div");
    name.classList.add("all-champion-name");
    name.innerText = champ_name;

    selector.appendChild(box);
    selector.appendChild(name);

    all_champs_node.appendChild(selector);
  }
}

function showRecommendations(recChamps) {
  //maybe dont need function if data comes as array in form [a, b, c]
  //var recChamps = getRecommendations(champData)

  let temp = recChamps
  console.log(temp)
  for (recommendation in recChamps) {
    let num = recommendation
    console.log(num)
    if (!Number.isInteger(parseInt(recommendation))) {
      break
    }
    const rec_button = document.getElementById("rec-" + recommendation);
    const champ_name_wrapper = rec_button.children[0].children;
    champ_name_wrapper[0].innerText =
      c_names[parseInt(recChamps[recommendation]["champId"])];

    const champ_image_wrapper = rec_button.children[1].children;
    champ_image_wrapper[0].src =
      "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
      getChampNameForId(parseInt(recChamps[recommendation]["champId"])) +
      ".png";

    const rec_explanation_wrapper = rec_button.children[2];
    removeAllChildNodes(rec_explanation_wrapper);

    const winrate_text = document.createElement("div");
    winrate_text.classList.add("recommendation-text-item")
    winrate_text.innerText =
      "High Winrate (" + recChamps[recommendation]["winrate"] + "%)";

    const counter_text = document.createElement("div");
    let counter_string = "";
    for (good_counter in recChamps[recommendation]["good_counter_vs"]) {
      if (
        good_counter ==
        recChamps[recommendation]["good_counter_vs"].length - 1
      ) {
        counter_string +=
          " " +
          c_names[recChamps[recommendation]["good_counter_vs"][good_counter]];
      } else {
        counter_string +=
          " " +
          c_names[recChamps[recommendation]["good_counter_vs"][good_counter]] +
          ", ";
      }
    }
    if (counter_string.length > 0) {
      counter_text.classList.add("recommendation-text-item")
      counter_text.innerText = "Good Counter vs " + counter_string;
    }

    const missing_role_text = document.createElement("div");
    
    let missing_role_string = "";
    for (missing_role in recChamps[recommendation]["missing_roles"]) {
      if (
        missing_role ==
        recChamps[recommendation]["missing_roles"].length - 1
      ) {
        missing_role_string +=
          " " + recChamps[recommendation]["missing_roles"][missing_role];
      } else {
        missing_role_string +=
          " " + recChamps[recommendation]["missing_roles"][missing_role] + ", ";
      }
    }

    if (missing_role_string.length > 0) {
      missing_role_text.classList.add("recommendation-text-item");
      missing_role_text.innerText = "Team needs a " + missing_role_string;
    }

    const missing_damage_text = document.createElement("div");

    let missing_damage_string = "";
    if (recChamps[recommendation]["missing_damage"].length > 1) {
      missing_damage_string = "Team needs physical and magic damage";
      missing_damage_text.classList.add("recommendation-text-item");
    } else if (recChamps[recommendation]["missing_damage"].length == 1){
      missing_damage_string = "Team needs " + recChamps[recommendation]["missing_damage"][0] + " damage";
      missing_damage_text.classList.add("recommendation-text-item");
    }

    missing_damage_text.innerText = missing_damage_string;


    rec_explanation_wrapper.appendChild(winrate_text);
    rec_explanation_wrapper.appendChild(counter_text);
    rec_explanation_wrapper.appendChild(missing_role_text);
    rec_explanation_wrapper.appendChild(missing_damage_text);

    rec_button.addEventListener("click", selectRecommendedChamp, false);
    rec_button.champId = parseInt(recChamps[recommendation]["champId"]);
  }
}

window.darkMode.selectableChamps((event, value) => {
  showPickableChamps(value);
});

window.darkMode.recommendedChamps((event, value) => {
  showRecommendations(value);
});

window.darkMode.createOrDelete((event, value) => {
  if (value) {
    clearAll();
    let intro = document.getElementById("intro_layout");
    let full = document.getElementById("display_layout");
    if (full.style.display == "" || full.style.display == "none") {
      full.style.display = "flex";
      intro.style.display = "none";
    }
  } else {
    clearAll();
    let intro = document.getElementById("intro_layout");
    let full = document.getElementById("display_layout");
    if (intro.style.display == "" || intro.style.display == "none") {
      intro.style.display = "flex";
      full.style.display = "none";
    }
  }
});

window.darkMode.currentTurn((event, value) => {
  let confirmButton = document.getElementById("confirm-champ-selection");

    //REMOVE PREVIOUS HIGHLIGHHTS
    for (let i = 0; i < 5; i++) {
      let blue_cell = document.getElementById("blue-pick-" + i);
      let red_cell = document.getElementById("red-pick-" + i);

      const blue_info_action_wrapper = blue_cell.children[1].children[0];
      blue_info_action_wrapper.innerText = "";

      const red_info_action_wrapper = red_cell.children[0].children[0];
      red_info_action_wrapper.innerText = "";

      //blue_cell.style.backgroundColor = "";
      blue_cell.classList.remove("active-blue");
      blue_cell.classList.remove("banning-blue");
      blue_cell.classList.remove("active-player");
      //red_cell.style.backgroundColor = "";
      red_cell.classList.remove("active-red");
      red_cell.classList.remove("banning-red");
    }

    // HIGHLIGHT AREAS FOR CURRENT TURN
    for (action in value["turn"]) {
      let cellId = value["turn"][action]["actorCellId"];
      let allyTeam = value["turn"][action]["isAllyAction"];
      let actionType = value["turn"][action]["type"];
      //CONTINUE HERE FOR CELL ID STUFF
      if (allyTeam && actionType == "pick") {
        var cell = null;
        for (ally in value["myTeam"]) {
          if (cellId === value["myTeam"][ally]["cellId"]) {
            cell = document.getElementById("blue-pick-" + ally);
          }
        }

        if (cell === null) {
          console.log("nooooooooo");
          continue;
        }

        if (cellId === value["localPlayer"]) {
          cell.classList.add("active-player");
          confirmButton.innerText = "PICK!";
        } else {
          //cell.style.backgroundColor = "blue";
          cell.classList.add("active-blue");
        }

        const blue_info_action_wrapper = cell.children[1].children[0];
        blue_info_action_wrapper.innerText = "picking...";
      } else if (!allyTeam && actionType == "pick") {
        var cell = null;
        for (enemy in value["theirTeam"]) {
          if (cellId === value["theirTeam"][enemy]["cellId"]) {
            cell = document.getElementById("red-pick-" + enemy);
          }
        }

        if (cell === null) {
          console.log("nooooooooo");
          continue;
        }
        //cell.style.backgroundColor = "red";
        cell.classList.add("active-red");
        const red_info_action_wrapper = cell.children[0].children[0];
        red_info_action_wrapper.innerText = "picking...";
      } else if (allyTeam && actionType == "ban") {
        var cell = null;
        for (ally in value["myTeam"]) {
          if (cellId === value["myTeam"][ally]["cellId"]) {
            cell = document.getElementById("blue-pick-" + ally);
          }
        }

        if (cell === null) {
          console.log("nooooooooo");
          continue;
        }

        if (cellId === value["localPlayer"]) {
          cell.classList.add("banning-blue");
          confirmButton.innerText = "BAN!";
        } else {
          cell.classList.add("banning-blue");
        }
        const blue_info_action_wrapper = cell.children[1].children[0];
        blue_info_action_wrapper.innerText = "banning...";
      } else if (!allyTeam && actionType == "ban") {
        var cell = null;
        for (enemy in value["theirTeam"]) {
          if (cellId === value["theirTeam"][enemy]["cellId"]) {
            cell = document.getElementById("red-pick-" + enemy);
          }
        }

        if (cell === null) {
          console.log("nooooooooo");
          continue;
        }
        //cell.style.backgroundColor = "red";
        cell.classList.add("banning-red");

        const red_info_action_wrapper = cell.children[0].children[0];
        red_info_action_wrapper.innerText = "banning...";
      }
    }
});

window.darkMode.champSelectInfo((event, value) => {
  isBanning = value["champ_select_phase"];
  
  state = value;
  isPicking = state["picking_champion"]

  const instructions = document.getElementById("application_header")
  if(isBanning) {
    instructions.innerText = "Ban a Champion!"
  } else if (isPicking) {
    if (rec_node.style.display == "" || rec_node.style.display == "none") {
      rec_node.style.display = "flex";
      all_node.style.display = "none";
    }


    removeAllChildNodes(all_champs_node)
    instructions.innerText = "Pick a Champion!"
  } 

  removeBannedChamps(state["banned_champs"]);
  removePickedChamps(state["picked_champs"]);
  
  for (blue_member in state["myTeam"]) {
    var blue_counter = blue_member;
    const blue_collection = document.getElementById(
      "blue-pick-" + blue_counter
    ).children;
    const blue_info_wrapper = blue_collection[1].children;

    const blue_name_text = blue_info_wrapper[3];
    if(state["myTeam"][blue_member]["cellId"] === state["localPlayerCellId"]){
      blue_name_text.innerText = "YOU";
    } else {
      blue_name_text.innerText = "Teammate " + (blue_counter);
    }
    
    

    const blue_position_text = blue_info_wrapper[1];
    blue_position_text.innerText = state["myTeam"][blue_member]["assignedPosition"];

    if (
      state["myTeam"][blue_member]["championId"] === 0 &&
      state["myTeam"][blue_member]["championPickIntent"] === 0
    ) {
      blue_counter += 1;
      const blue_champ_name_text = blue_info_wrapper[2];
      blue_champ_name_text.innerText = "";
      continue;
    }
    if (state["myTeam"][blue_member]["championId"] === 0) {
      const image_wrapper = blue_collection[0].children;
      image_wrapper[0].src =
        "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
        getChampNameForId(state["myTeam"][blue_member]["championPickIntent"]) +
        ".png";
      const blue_champion_text = blue_info_wrapper[2];
      blue_champion_text.innerText = c_names[parseInt(state["myTeam"][blue_member]["championId"])]
      blue_counter += 1;
    } else {
      const image_wrapper = blue_collection[0].children;
      image_wrapper[0].src =
        "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
        getChampNameForId(state["myTeam"][blue_member]["championId"]) +
        ".png";

      const blue_champ_name_text = blue_info_wrapper[2];
      blue_champ_name_text.innerText =
      c_names[parseInt(state["myTeam"][blue_member]["championId"])];

      blue_counter += 1;
    }
  }

  for (red_member in state["theirTeam"]) {
    var red_counter = red_member;
    const red_collection = document.getElementById(
      "red-pick-" + red_counter
    ).children;
    const red_info_wrapper = red_collection[0].children;

    //removeAllChildNodes(red_role_wrapper);

    const red_name_text = red_info_wrapper[3]
    red_name_text.innerText = "Enemy " + (red_counter);

    const red_position_text = red_info_wrapper[1]
    red_position_text.innerText =
      state["theirTeam"][red_member]["assignedPosition"];

    if (
      state["theirTeam"][red_member]["championId"] == 0 &&
      state["theirTeam"][red_member]["championPickIntent"] == 0
    ) {
      const red_champ_name_text = red_info_wrapper[2];
      red_champ_name_text.innerText = "";
      //red_counter += 1;
      continue;
    }

    if (state["theirTeam"][red_member]["championId"] == 0) {
      const red_image_wrapper = red_collection[1].children;
      red_image_wrapper[0].src =
        "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
        getChampNameForId(
          state["theirTeam"][red_member]["championPickIntent"]
        ) +
        ".png";
        const red_champ_name_text = red_info_wrapper[2];
        red_champ_name_text.innerText = c_names[parseInt(state["theirTeam"][red_member]["championId"])];
      //red_counter += 1;
    } else {
      const red_image_wrapper = red_collection[1].children;
      red_image_wrapper[0].src =
        "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
        getChampNameForId(state["theirTeam"][red_member]["championId"]) +
        ".png";
      
      const red_champ_name_text = red_info_wrapper[2];
      red_champ_name_text.innerText = c_names[parseInt(state["theirTeam"][red_member]["championId"])];

      //red_counter += 1;
    }
  }

  for (banned_champ in state["banned_champs"]) {
    if (banned_champ <= 4) {
      const blue_ban_box = document.getElementById(
        "blue-ban-" + banned_champ
      ).children;
      blue_ban_box[0].src =
        "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
        getChampNameForId(state["banned_champs"][banned_champ]) +
        ".png";
    } else {
      const red_ban_box = document.getElementById(
        "red-ban-" + (banned_champ % 5)
      ).children;
      red_ban_box[0].src =
        "dragontail-13.13.1\\13.13.1\\img\\champion\\" +
        getChampNameForId(state["banned_champs"][banned_champ]) +
        ".png";
    }
  }
});
