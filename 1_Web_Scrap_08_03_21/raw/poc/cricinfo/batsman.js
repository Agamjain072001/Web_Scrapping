// Highest run scorers in innnings from both the teams
let request = require("request");
let cheerio = require("cheerio");


let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url, cb);


function cb(err, response, html){
    let cSelector = cheerio.load(html);
    let tables = cSelector(".table.batsman");
    for(let i=0;i<tables.length;i++){
        let hrsname = "";
        let hruns = 0;
        let teamBatsman = cSelector(tables[i]).find("tr");
        for(let j = 0; j<teamBatsman.length; j++){
            let eachBatCol = cSelector(teamBatsman[j]).find("td");
            if(eachBatCol.length == 8){
                let playerName = cSelector(eachBatCol[0]).text();
                let playerRun = cSelector(eachBatCol[2]).text();
                console.log(playerName, "                            ", playerRun);
                if(hruns <= Number.parseInt(playerRun)){
                    hruns = playerRun;
                    hrsname = playerName;
                }
            }
        }
        console.log("Player ", hrsname, "scores highest runs : ", hruns);
        console.log("------------------------------------------");
    }
}
