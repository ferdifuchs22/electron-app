const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");
const leagueConnect = require("league-connect");
const champ_select_handler = require("./handle_champ_select")

/* --------------------------------------------------------------------*/
var state = null
var connected = false
var actions = null;
var localPlayerId = null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
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
      awaitConnection: true
    }
  })


  ws.subscribe('/lol-champ-select/v1/session', async (data, event) => {
    await champ_select_handler.handle(event)
      .catch(err => console.log(err))
      .then(res => {
        //console.log("res" + res)
        if(res == null){
          return
        }
        
        state = res["data"]
        myTeam = (res["data"]["myTeam"])
        time = res["data"]["timer"]["adjustedTimeLeftInPhase"]
        localPlayerId = res["data"]["localPlayerCellId"]
        actions = res["data"]["actions"]
        window.webContents.send('update-timer', time)
        window.webContents.send('champ-select-info', state)
      })
  })

  ws.on('message', message => {
    if(!connected){
      console.log("CONNECTED TO CLIENT")
      connected = true
    }
    
  })

  ws.on('close', () => {
    console.log("DISCONNECTED")
    connected = false
  })

}

function firstUncompletedPickAction() {
  if(actions == null || localPlayerId == null){
    console.log("NOACTIONORPLAYERID")
    return
  }
  const allActions = Array.prototype.concat(actions);
  console.log(allActions[0])
  myact = allActions.filter(x => x["type"] === "pick" && x["actorCellId"] === localPlayerId && !x["completed"])[0]
  console.log("MYACT" + myact)
  return myact
}

function currentTurn() {
  if(!state || state["timer"]["phase"] !== "BAN_PICK") return null;
  return state["actions"].filter(x => x.filter(y => !y["completed"]).length > 0)[0];
}

function nextTurn() {
  if(!state || state["timer"]["phase"] !== "BAN_PICK") return null;
  return state["actions"].filter(x => x.filter(y => !y["completed"]).length > 0)[1];
}

function getActions(playerId, future = false) {
  const turn = future ? nextTurn() : currentTurn();
  return turn ? turn.filter(x => x["actorCellId"] === playerId)[0] || null : null;
}


const http1PickHero = async (champ_id, completed) => {
  if(localPlayerId == null){
    console.log("NOPLAYERID")
    return;
  }
  const act = getActions(localPlayerId);

  const lolcredentials = await leagueConnect.authenticate({
    awaitConnection: true,
    pollInterval: 5000,
  })
  let localBody = {
    "completed": completed,
    "championId": champ_id
  }
  //const session = await leagueConnect.createHttpSession(lolcredentials);
  const response = await leagueConnect.createHttp1Request({
    method: "PATCH",
    url: `/lol-champ-select/v1/session/actions/`+act.id,
    body: localBody
  }, /*session,*/ lolcredentials)
  .catch(err => {
    console.log(err)
  })
  // session.close();
}

const http1HoverHero = async (champ_id) => {

  const firstUncompletedPick = firstUncompletedPickAction();
  if(firstUncompletedPick == null){
    console.log("NOUNCOMPLETEDFIRSTPICK")
    return;
  } 

  const lolcredentials = await leagueConnect.authenticate({
    awaitConnection: true,
    pollInterval: 5000,
  })
  console.log(champ_id)
  let localBody = {
    "completed": false,
    "championId": champ_id
  }
  //const session = await leagueConnect.createHttpSession(lolcredentials);
  const response = await leagueConnect.createHttp1Request({
    method: "PATCH",
    url: `/lol-champ-select/v1/session/actions/`+firstUncompletedPick.id,
    body: localBody
  }, /*session,*/ lolcredentials)
  .catch(err => {
    console.log(err)
  })

  //console.log(response)
  // session.close();
}

ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:system", async () => {
  nativeTheme.themeSource = "system";

  const lolcredentials = await leagueConnect.authenticate({
    awaitConnection: true,
    pollInterval: 5000,
  });
  const response = await leagueConnect.createHttp1Request(
    {
      method: "GET",
      url: `/lol-champ-select/v1/all-grid-champions`,
    },lolcredentials
  )
  .catch(err => {
    console.log(err);
  });

  res = response
  
  return res.json()
});

ipcMain.handle("dark-mode:confirmChamp", async (event, champ_id) => {
  http1PickHero(champ_id, true);
})

ipcMain.handle("update-selected-champ", async (event, champ_id) => {
  //http1HoverHero(champ_id);
  http1PickHero(champ_id, false);
  return champ_id
})

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
