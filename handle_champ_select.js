const leagueConnect = require("league-connect");

module.exports = {
  handle: async function (event) {
    if (event["eventType"] == "Create") {
      console.log("created lobby");
      return null
    }
    if (event["eventType"] == "Update") {
      const lolcredentials = await leagueConnect.authenticate({
        awaitConnection: true,
        pollInterval: 5000,
      });
      const response = await leagueConnect.createHttp1Request(
        {
          method: "GET",
          url: `/lol-champ-select/v1/all-grid-champions`,
        },
        /*session,*/ lolcredentials
      );

      return response.json()
      // session.close();
    }
    if (event["eventType"] == "Delete") {
      console.log("left lobby");
      return null
    }
  },
};
