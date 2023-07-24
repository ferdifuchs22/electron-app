const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");
const leagueConnect = require("league-connect");
const champ_select_handler = require("./handle_champ_select")

var connected = false

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  createSession();

  win.loadFile("index.html");
};

const createSession = async () => {

  const ws = await leagueConnect.createWebSocketConnection({
    authenticationOptions: {
      // any options that can also be called to authenticate()
      awaitConnection: true
    }
  })


  ws.subscribe('/lol-champ-select/v1/session', async (data, event) => {
    await champ_select_handler.handle(event)
      .catch((err) => {
        console.log(err)
      })
      .then((res) => {
        if(res == null){
          return
        }
        console.log(res)
      })
    
  })

  ws.on('message',() => {
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


const http1PickHero = async (champ_id) => {
  const lolcredentials = await leagueConnect.authenticate({
    awaitConnection: true,
    pollInterval: 5000,
  })
  console.log(champ_id)
  let localBody = {
    "completed": true,
    "type": 'pick',
    "championId": champ_id
  }
  //const session = await leagueConnect.createHttpSession(lolcredentials);
  const response = await leagueConnect.createHttp1Request({
    method: "PATCH",
    url: `/lol-champ-select/v1/session/actions/1`,
    body: localBody
  }, /*session,*/ lolcredentials)

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

ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
});

ipcMain.handle("dark-mode:confirmChamp", async (event, champ_id) => {
  http1PickHero(champ_id);
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
