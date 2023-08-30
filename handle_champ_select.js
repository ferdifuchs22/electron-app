const leagueConnect = require("league-connect");

module.exports = {
  handle: async function (event, window) {
    if (event["eventType"] == "Create") {
      console.log("created lobby");
      window.webContents.send("create_or_delete", true)
      window.setAlwaysOnTop(true)
      return null
    }
    if (event["eventType"] == "Update") {
      if(event == null){
        return
      }
      return event
      // session.close();
    }
    if (event["eventType"] == "Delete") {
      console.log("left lobby");
      await window.webContents.send("create_or_delete", false)
      window.setAlwaysOnTop(false)
      return null
    }
  },
};
