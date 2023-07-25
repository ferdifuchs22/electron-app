const leagueConnect = require("league-connect");

module.exports = {
  handle: async function (event) {
    if (event["eventType"] == "Create") {
      console.log("created lobby");
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
      return null
    }
  },
};
