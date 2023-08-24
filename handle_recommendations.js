const fs = require("fs");

const champs_map = new Map();

var bottom_ids = ["110","119","145","15","18","202","21","22","221","222","236","29","30", "360","429","498","51","523","67","81","895","96"]
var top_ids = ["10","106","107","114","122","126","133","14","150","157","164","166","17","19","2","223","23","24","240","266","27","31","36","39","41","420","516","517","54","57","58","6","67","68","75","777","78","79","8","80","82","83","84","85","86","875","887","897","92","98"]
var jungle_ids = ["102","104","106","107","11","113","120","121","131","141","154","19","20","200","203","234","238","245","254","28","30","32","33","35","421","427","48","5","517","518","56","57","59","60","62","64","76","77","78","79","876","9","91"]
var middle_ids = ["1","101","103","105","111","112","115","126","127","13","131","134","136","142","157","163","166","18","238","245","246","268","3","34","38","39","4","45","50","517","518","54","55","61","68","69","7","711","777","79","8","80","84","897","90","91","99"]
var support_ids = ["1","101","111","117","12","143","147","16","161","201","22","235","25","26","267","32","35","350","37","40","412","43","432","44","497","50","518","526","53","555","57","63","74","80","888","89","902","99"]

module.exports = {
    recommend: function (selectableChampions, myTeamChamps, theirTeamChamps) {
        var myAssignedRole = "bottom"

        var result = []
        var all_suggestions = []
        // FIX CASES WHERE UNLIKELY PICK ON ENEMY TEAM AND DATA FOR CHAMP ON ROLE CANT BE FOUND!!!
        var myTeamRoles = []
        var theirTeamRoles = getLikelyRoles(theirTeamChamps);
        //console.log(theirTeamRoles)

        for (id in bottom_ids) {
            //console.log(bottom_ids[id])
            let suggestion = {"champId": bottom_ids[id], "score": 0, "winrate": 0, "counter_wr": [], "average_counter_wr": 0}
            
            for (enemyRole in theirTeamRoles) {
                //console.log(theirTeamRoles[enemyRole]["role"])

                let rawEnemyCounterData = fs.readFileSync('C:\\dev\\electron-app\\champData\\matchupInfo\\lolalytics_counter_'+theirTeamRoles[enemyRole]["role"]+'.json');
                let enemyCounterData = JSON.parse(rawEnemyCounterData)
                let counter_data = {}
                
                if (theirTeamRoles[enemyRole]["cid"].toString() in enemyCounterData) {
                    counter_data = enemyCounterData[theirTeamRoles[enemyRole]["cid"].toString()]["enemy_"+myAssignedRole]
                }
                

                if (bottom_ids[id] in counter_data) {
                    suggestion["counter_wr"].push(100 - counter_data[bottom_ids[id]]["wr"])
                }
                
                
            }

            let rawBottomChampData = fs.readFileSync('C:\\dev\\electron-app\\champData\\champInfo\\champ_info_'+myAssignedRole+'.json');
            let bottomChampData = JSON.parse(rawBottomChampData);

            let champs_data = bottomChampData
            if (bottom_ids[id] in champs_data) {
                suggestion["winrate"] = champs_data[bottom_ids[id]]["winrate"]
            }
            
            //CALC FINAL VALUE HERE PROBABLY
            if (suggestion["counter_wr"].length > 0) {
                suggestion["average_counter_wr"] =  suggestion["counter_wr"].reduce((a, b) => a + b) / suggestion["counter_wr"].length
            }

            suggestion["score"] = suggestion["winrate"] * 0.55 + suggestion["average_counter_wr"] * 0.45

            all_suggestions.push(suggestion)
        }
        
        all_suggestions = all_suggestions.filter((a) => selectableChampions.includes(parseInt(a["champId"])))
        all_suggestions.sort((a, b) => b.score - a.score)
        
        console.log(all_suggestions.slice(0, 3))
        //console.log(bottomChampData);
        for (let i=0; i < 3; i++){
            result.push(parseInt(all_suggestions[i]["champId"]))
        }

        //console.log(result)
        return result;
    }
  };

  function getLikelyRoles(theirTeamChamps) {
    let roleResult = []
    let roleLikelihood = []
    
    let rawRoleData = fs.readFileSync('C:\\dev\\electron-app\\champData\\roleInfo\\full_role_data.json');
    let RoleData = JSON.parse(rawRoleData);


    for (champ in theirTeamChamps) {
        //console.log(theirTeamChamps[champ]["cid"])
        roleLikelihood.push(RoleData[theirTeamChamps[champ]["cid"].toString()]);   
    }

    availableRoles = ["top", "jungle", "middle", "bottom", "support"]
    takenChamps = []
    numTakenChamps = 0
    while (numTakenChamps < roleLikelihood.length) {
        let largest = -1;
        let largest_role = "";
        let currentLike = -1;
        for (like in roleLikelihood) {
            //console.log(like)
            if(takenChamps.includes(like.toString())) {
                //console.log("skipped")
                continue;
            }
            for (role in availableRoles) {
                //console.log(availableRoles[role])
                if (largest < roleLikelihood[like][availableRoles[role]]) {
                    largest = roleLikelihood[like][availableRoles[role]]
                    largest_role = availableRoles[role]
                    currentLike = like
                }
            }
        }
        takenChamps.push(currentLike)
        availableRoles = availableRoles.filter(function(item) {
            return item !== largest_role
        })
        if (currentLike == -1) {
            console.log("NOTHING FOUND")
            break
        }
        res = {
            "cid": theirTeamChamps[currentLike]["cid"],
            "role": largest_role
        }
        roleResult.push(res)
        numTakenChamps += 1;
    }

    return roleResult
}