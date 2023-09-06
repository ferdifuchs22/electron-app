const { app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const leagueConnect = require("league-connect");
const champ_select_handler = require("./handle_champ_select");
const recommendation_handler = require("./handle_recommendations");

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

/* --------------------------------------------------------------------*/
var state = null;
var connected = false;
var actions = null;
var localPlayerId = null;
var pickableChampions = null;
var bannableChampions = null;
var actionlen = 0

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  createSession(win);

  win.loadFile("index.html");
};

const createSession = async (window) => {
  const ws = await leagueConnect.createWebSocketConnection({
    authenticationOptions: {
      // any options that can also be called to authenticate()
      awaitConnection: true,
    },
  });

  ws.subscribe("/lol-champ-select/v1/pickable-champion-ids", (data, event) => {
    pickableChampions = data.filter((x) => c_names[x]);
    pickableChampions.sort((a, b) => c_names[a].localeCompare(c_names[b]));
  });

  ws.subscribe("/lol-champ-select/v1/bannable-champion-ids", (data, event) => {
    bannableChampions = data.filter((x) => c_names[x]);
    bannableChampions.sort((a, b) => c_names[a].localeCompare(c_names[b]));
  });

  ws.subscribe("/lol-champ-select/v1/session", async (data, event) => {
    await champ_select_handler
      .handle(event, window)
      .catch((err) => console.log(err))
      .then((res) => {
        //console.log("res" + res)
        if (res == null) {
          return;
        }
        //MAYBE CHECK HERE FOR OLD STATE IF WAS BANNING AND IF NEW STATE NOT BANNING THEN SEND SIGNAL
        //oldaction
        const oldAction = state ? getActions(localPlayerId) : undefined

        state = res["data"];
        time = res["data"]["timer"]["adjustedTimeLeftInPhase"];
        localPlayerId = res["data"]["localPlayerCellId"];
        actions = res["data"]["actions"];
        var pickingChampion = false
        //newaction
        const newAction = getActions(localPlayerId)
        if((!oldAction && newAction) || (newAction && oldAction && oldAction.id !== newAction.id)) {
          pickingChampion = true
        }
        

        //console.log("DATA::::")
        //console.log(res["data"])

        const isCurrentlyBanning =
          currentTurn() &&
          currentTurn().filter(
            (x) =>
              x.type === "ban" &&
              x.actorCellId === localPlayerId &&
              !x.completed
          ).length > 0;
        
        

        state["champ_select_phase"] = isCurrentlyBanning
        //console.log(state)

        const allActions = actions.flat();
        //console.log("--------------------------------")
        //console.log(allActions.filter(x => x.type === "ban" && x.completed))
        //console.log("----------------------------------")
        const bannedChamps = allActions
          .filter((x) => x.type === "ban" && x.completed)
          .map((x) => x.championId);

        const pickedChamps = allActions
          .filter((x) => x.type === "pick" && x.completed)
          .map((x) => x.championId);
        //console.log(bannedChamps)
        const selectable = (
          isCurrentlyBanning ? bannableChampions : pickableChampions
        ).filter((x) => bannedChamps.indexOf(x) === -1);

        state["banned_champs"] = bannedChamps
        //console.log(bannedChamps)
        state["picked_champs"] = pickedChamps
        state["picking_champion"] = pickingChampion
        //console.log(selectable)
        //console.log(state["myTeam"])

        let myTeamChamps = state["myTeam"].map((member) => ({cid: member["championId"], pos: member["assignedPosition"], cellId: member["cellId"]}))
        let theirTeamChamps = state["theirTeam"].map((member) => ({cid: member["championId"], pos: member["assignedPosition"]}))
        
        //if ( allActions.length > actionlen) {
          const recommendations = createRecommendations(selectable, myTeamChamps, theirTeamChamps, localPlayerId);
          //console.log(recommendations)
          window.webContents.send("recommended-champs", recommendations);
          actionlen = allActions.length
        //}
        
        
        
        let currentTurnObj = {"turn": currentTurn(), "localPlayer": localPlayerId, "myTeam": state["myTeam"], "theirTeam": state["theirTeam"]}
        //console.log("--------------------------------")
        //console.log(currentTurnObj)
        //console.log("--------------------------------")
        window.webContents.send("current-turn", currentTurnObj)
        
        
        window.webContents.send("selectable-champs", selectable);
        window.webContents.send("update-timer", time);
        window.webContents.send("champ-select-info", state);
      });
  });

  ws.on("message", (message) => {
    if (!connected) {
      console.log("CONNECTED TO CLIENT");
      connected = true;
    }
  });

  ws.on("close", () => {
    console.log("DISCONNECTED");
    connected = false;
  });
};

function createRecommendations(selectableChampions, teamPickedChampions = [], enemyPickedChampions = [], localPlayerId) {
  return recommendation_handler.recommend(selectableChampions, teamPickedChampions, enemyPickedChampions, localPlayerId);
}

function currentTurn() {
  if (!state || state["timer"]["phase"] !== "BAN_PICK") return null;
  return state["actions"].filter(
    (x) => x.filter((y) => !y["completed"]).length > 0
  )[0];
}

function nextTurn() {
  if (!state || state["timer"]["phase"] !== "BAN_PICK") return null;
  return state["actions"].filter(
    (x) => x.filter((y) => !y["completed"]).length > 0
  )[1];
}

function getActions(playerId, future = false) {
  const turn = future ? nextTurn() : currentTurn();
  return turn
    ? turn.filter((x) => x["actorCellId"] === playerId)[0] || null
    : null;
}

const http1PickHero = async (champ_id, completed) => {
  if (localPlayerId == null) {
    console.log("NOPLAYERID");
    return;
  }
  const act = getActions(localPlayerId);

  const lolcredentials = await leagueConnect.authenticate({
    awaitConnection: true,
    pollInterval: 5000,
  });
  let localBody = {
    completed: completed,
    championId: champ_id,
  };
  //const session = await leagueConnect.createHttpSession(lolcredentials);
  const response = await leagueConnect
    .createHttp1Request(
      {
        method: "PATCH",
        url: `/lol-champ-select/v1/session/actions/` + act.id,
        body: localBody,
      },
      /*session,*/ lolcredentials
    )
    .catch((err) => {
      console.log(err);
    });
  // session.close();
};

ipcMain.handle("dark-mode:confirmChamp", async (event, champ_id) => {
  http1PickHero(champ_id, true);
});

ipcMain.handle("update-selected-champ", async (event, champ_id) => {
  http1PickHero(champ_id, false);
  return champ_id;
});

app.whenReady().then(async () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
