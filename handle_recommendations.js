const fs = require("fs");
const path = require('path')

var bottom_ids = ["110","119","145","15","18","202","21","22","221","222","236","29","30", "360","429","498","51","523","67","81","895","96"]
var top_ids = ["10","106","107","114","122","126","133","14","150","157","164","166","17","19","2","223","23","24","240","266","27","31","36","39","41","420","516","517","54","57","58","6","67","68","75","777","78","79","8","80","82","83","84","85","86","875","887","897","92","98"]
var jungle_ids = ["102","104","106","107","11","113","120","121","131","141","154","19","20","200","203","234","238","245","254","28","30","32","33","35","421","427","48","5","517","518","56","57","59","60","62","64","76","77","78","79","876","9","91"]
var middle_ids = ["1","101","103","105","111","112","115","126","127","13","131","134","136","142","157","163","166","18","238","245","246","268","3","34","38","39","4","45","50","517","518","54","55","61","68","69","7","711","777","79","8","80","84","897","90","91","99"]
var support_ids = ["1","101","111","117","12","143","147","16","161","201","22","235","25","26","267","32","35","350","37","40","412","43","432","44","497","50","518","526","53","555","57","63","74","80","888","89","902","99"]

let rawBottomChampInfoData = fs.readFileSync(path.resolve(__dirname, 'champData\\champInfo\\champ_info_bottom.json'));
let bottomChampInfoData = JSON.parse(rawBottomChampInfoData);

let rawJungleChampInfoData = fs.readFileSync(path.resolve(__dirname, 'champData\\champInfo\\champ_info_jungle.json'));
let jungleChampInfoData = JSON.parse(rawJungleChampInfoData);

let rawMiddleChampInfoData = fs.readFileSync(path.resolve(__dirname, 'champData\\champInfo\\champ_info_middle.json'));
let middleChampInfoData = JSON.parse(rawMiddleChampInfoData);

let rawSupportChampInfoData = fs.readFileSync(path.resolve(__dirname, 'champData\\champInfo\\champ_info_support.json'));
let supportChampInfoData = JSON.parse(rawSupportChampInfoData);

let rawTopChampInfoData = fs.readFileSync(path.resolve(__dirname, 'champData\\champInfo\\champ_info_top.json'));
let topChampInfoData = JSON.parse(rawTopChampInfoData);

module.exports = {
    recommend: function (selectableChampions, myTeamChamps, theirTeamChamps, localPlayerId) {
        var myAssignedRole = "middle";
        var used_champ_ids = bottom_ids;
        let found = false;

        var myTeamComp = [];
        var myTeamDamage = [];
        var likelyTeamPositions = [];


        if(myTeamChamps[0]["pos"] === "") {
            likelyTeamPositions = getLikelyPositions(myTeamChamps);
        }

        for(member in myTeamChamps) {
            //console.log("CELLID")
            //console.log(myTeamChamps[member]["cellId"])
            
            if(myTeamChamps[member]["cellId"] === localPlayerId) {
                //console.log(myTeamChamps[member]["pos"])
                found = true
                myAssignedRole = myTeamChamps[member]["pos"]
                if(myAssignedRole === ""){
                    myAssignedRole = "middle"
                    used_champ_ids = middle_ids
                }

                if (myAssignedRole === "utility") {
                    myAssignedRole = "support"
                    used_champ_ids = support_ids
                }

                if (myAssignedRole === "bottom") {
                    myAssignedRole = "bottom"
                    used_champ_ids = bottom_ids
                }

                if (myAssignedRole === "middle") {
                    myAssignedRole = "middle"
                    used_champ_ids = middle_ids
                }

                if (myAssignedRole === "jungle") {
                    myAssignedRole = "jungle"
                    used_champ_ids = jungle_ids
                }

                if (myAssignedRole === "top") {
                    myAssignedRole = "top"
                    used_champ_ids = top_ids
                }
            }

            else {
                
                let res = {
                    "cid": myTeamChamps[member]["cid"],
                    "position": myTeamChamps[member]["pos"]
                }

                if(likelyTeamPositions.length > 0) {
                    res["cid"] = likelyTeamPositions[member]["cid"];
                    res["position"] = likelyTeamPositions[member]["pos"];
                }

                if(res["position"] === ""){
                    /*
                    maybe find likely pos
                    */
                }

                if (res["position"] === "utility") {
                    if(res["cid"].toString() in supportChampInfoData) {
                        let damage_type = supportChampInfoData[res["cid"].toString()]["damage_type"]
                        if(!myTeamDamage.includes(damage_type)){
                            myTeamDamage.push(damage_type)
                        }

                        let roles = supportChampInfoData[res["cid"].toString()]["role"]
                        for (let role in roles) {
                            if(!myTeamComp.includes(roles[role])){
                                myTeamComp.push(roles[role]);
                            }
                        }
                    }
                }

                if (res["position"] === "bottom") {
                    if(res["cid"].toString() in bottomChampInfoData) {
                        let damage_type = bottomChampInfoData[res["cid"].toString()]["damage_type"]
                        if(!myTeamDamage.includes(damage_type)){
                            myTeamDamage.push(damage_type)
                        }

                        let roles = bottomChampInfoData[res["cid"].toString()]["role"]
                        for (let role in roles) {
                            if(!myTeamComp.includes(roles[role])){
                                myTeamComp.push(roles[role]);
                            }
                        }
                    }
                }

                if (res["position"] === "middle") {
                    if(res["cid"].toString() in middleChampInfoData) {
                        let damage_type = middleChampInfoData[res["cid"].toString()]["damage_type"]
                        if(!myTeamDamage.includes(damage_type)){
                            myTeamDamage.push(damage_type)
                        }

                        let roles = middleChampInfoData[res["cid"].toString()]["role"]
                        for (let role in roles) {
                            if(!myTeamComp.includes(roles[role])){
                                myTeamComp.push(roles[role]);
                            }
                        }
                    }
                }

                if (res["position"] === "jungle") {
                    if(res["cid"].toString() in jungleChampInfoData) {
                        let damage_type = jungleChampInfoData[res["cid"].toString()]["damage_type"]
                        if(!myTeamDamage.includes(damage_type)){
                            myTeamDamage.push(damage_type)
                        }

                        let roles = jungleChampInfoData[res["cid"].toString()]["role"]
                        for (let role in roles) {
                            if(!myTeamComp.includes(roles[role])){
                                myTeamComp.push(roles[role]);
                            }
                        }
                    }
                }

                if (res["position"] === "top") {
                    if(res["cid"].toString() in topChampInfoData) {
                        let damage_type = topChampInfoData[res["cid"].toString()]["damage_type"]
                        if(!myTeamDamage.includes(damage_type)){
                            myTeamDamage.push(damage_type)
                        }

                        let roles = topChampInfoData[res["cid"].toString()]["role"]
                        for (let role in roles) {
                            if(!myTeamComp.includes(roles[role])){
                                myTeamComp.push(roles[role]);
                            }
                        }
                    }
                }
            }
        }
        if(!found) {
            used_champ_ids = middle_ids
        }

        //console.log("myassignedRole: " + myAssignedRole)

        var result = []
        var all_suggestions = []
        // FIX CASES WHERE UNLIKELY PICK ON ENEMY TEAM AND DATA FOR CHAMP ON ROLE CANT BE FOUND!!!
        
        var theirTeamRoles = getLikelyPositions(theirTeamChamps);
        //console.log(theirTeamRoles)

        for (id in used_champ_ids) {
            //console.log(bottom_ids[id])
            let suggestion = {"champId": used_champ_ids[id], "score": 0, "winrate": 0, "counter_wr": [], "average_counter_wr": 0, "good_counter_vs": [], "missing_roles": [], "missing_damage": []}
            
            for (enemyRole in theirTeamRoles) {
                //console.log(theirTeamRoles[enemyRole]["role"])
                if(theirTeamRoles[enemyRole]["pos"] == "none") {
                    continue
                }
                let rawEnemyCounterData = fs.readFileSync(path.resolve(__dirname,'champData\\matchupInfo\\lolalytics_counter_'+theirTeamRoles[enemyRole]["pos"]+'.json'));
                let enemyCounterData = JSON.parse(rawEnemyCounterData)
                let counter_data = {}
                
                if (theirTeamRoles[enemyRole]["cid"].toString() in enemyCounterData) {
                    counter_data = enemyCounterData[theirTeamRoles[enemyRole]["cid"].toString()]["enemy_"+myAssignedRole]
                }
                

                if (counter_data !== undefined && used_champ_ids[id] in counter_data) {
                    let counter_val = 100 - counter_data[used_champ_ids[id]]["wr"]
                    if(counter_val > 51) {
                        suggestion["good_counter_vs"].push(theirTeamRoles[enemyRole]["cid"])
                    }
                    suggestion["counter_wr"].push(counter_val)
                }
            }

            let rawChampData = fs.readFileSync(path.resolve(__dirname,'champData\\champInfo\\champ_info_'+myAssignedRole+'.json'));
            let champData = JSON.parse(rawChampData);

            

            let champs_data = champData
            if (used_champ_ids[id] in champs_data) {
                suggestion["winrate"] = champs_data[used_champ_ids[id]]["winrate"]  

                for(role in champs_data[used_champ_ids[id]]["role"]) {
                    if(!myTeamComp.includes(champs_data[used_champ_ids[id]]["role"][role])){
                        let lost_role = champs_data[used_champ_ids[id]]["role"][role];
                        suggestion["missing_roles"].push(lost_role)
                    }
                }
                let myChampDamage =  champs_data[used_champ_ids[id]]["damage_type"]
                if(!myTeamDamage.includes("hybrid") && !myTeamDamage.includes("physical")) {
                    if (myChampDamage === "hybrid" || myChampDamage === "physical") {
                        suggestion["missing_damage"].push("physical")
                    }
                }
                if(!myTeamDamage.includes("hybrid") && !myTeamDamage.includes("magic")) {
                    if (myChampDamage === "hybrid" || myChampDamage === "magic") {
                        suggestion["missing_damage"].push("magic")
                    }
                }

            }
            
            //CALC FINAL VALUE HERE PROBABLY
            if (suggestion["counter_wr"].length > 0) {
                suggestion["average_counter_wr"] =  suggestion["counter_wr"].reduce((a, b) => a + b) / suggestion["counter_wr"].length
            }

            suggestion["score"] = 
            suggestion["winrate"] * 0.45 + 
            suggestion["average_counter_wr"] * 0.35 + 
            (suggestion["missing_roles"].length > 0 ? 0.1 : 0.0) +
            (suggestion["missing_damage"].length > 0 ? 0.1 : 0.0)

            all_suggestions.push(suggestion)
        }
        //**** ADD MISSING DAMAGE TEXT */
        all_suggestions = all_suggestions.filter((a) => selectableChampions.includes(parseInt(a["champId"])))
        all_suggestions.sort((a, b) => b.score - a.score)
        
        //console.log(all_suggestions.slice(0, 3))
        //console.log(bottomChampData);
        for (let i=0; i < 3; i++){
            //result.push(parseInt(all_suggestions[i]["champId"]))
            result.push(all_suggestions[i])
        }

        //console.log(result)
        return result;
    }
  };

  function getLikelyPositions(teamChamps) {
    let roleResult = []
    let roleLikelihood = []
    
    let rawRoleData = fs.readFileSync(path.resolve(__dirname,'champData\\roleInfo\\full_role_data.json'));
    let RoleData = JSON.parse(rawRoleData);


    for (champ in teamChamps) {
        //console.log(theirTeamChamps[champ]["cid"])
        if(teamChamps[champ]["cid"] === 0 || teamChamps[champ]["cid"] === "0") {
            roleLikelihood.push({
                "top": -1,
                "jungle": -1,
                "middle": -1,
                "bottom": -1,
                "support": -1
              })
              roleResult.push({"cid": 0, "pos": "none"})
            continue
        }
        roleLikelihood.push(RoleData[teamChamps[champ]["cid"].toString()]);   
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
        let res = {
            "cid": teamChamps[currentLike]["cid"],
            "pos": largest_role
        }
        roleResult.push(res)
        numTakenChamps += 1;
    }

    return roleResult
}