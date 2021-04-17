let fs = require("fs");

function dirCreator(src){
    if(fs.existsSync(src) == false){
        fs.mkdirSync(src);
    }
}

function createFile(src){
    if(fs.existsSync(src) == false){
        fs.openSync(src , "w");            //-> From Internet
    }
}

let path = require("path");
let request = require("request");
let cheerio = require("cheerio");
let pathOfFolder = path.join(__dirname, "ipl");
dirCreator(pathOfFolder);

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595", cb);

function cb(err, response, html){
    let cheerioSelector = cheerio.load(html);
    let viewAllResultsAnchor = cheerioSelector(".list-unstyled.mb-0 .widget-items.cta-link a");
    let link = cheerioSelector(viewAllResultsAnchor[0]).attr("href");
    let fullLink = "https://www.espncricinfo.com" + link;

    request(fullLink, cbSingle);
}

function cbSingle(err, response, html){
    let cSelector = cheerio.load(html);
    let matchCard = cSelector(".col-md-8.col-16");
    // console.log(matchCard.length);
    for(let i =0 ; i < matchCard.length; i++){
        let allAnchorsOfACard = cSelector(matchCard[i]).find(".match-cta-container a");
        let link = cSelector(allAnchorsOfACard[2]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;
        
        request(fullLink, cbDouble);
    }
}



function cbDouble(err, response, html){
    let cSelector = cheerio.load(html);
    let teamname = cSelector(".match-header .match-info.match-info-MATCH .teams .team");
    for(let i=0;i<teamname.length;i++){
        let myTeamElem = cSelector(teamname[i]).find(".name-detail a");
        let myTeam = myTeamElem.text();
        let pathOfInFolder = path.join(pathOfFolder, myTeam);
        dirCreator(pathOfInFolder);
        let collapsibleElem = cSelector(".Collapsible");
        let bothteamInning = cSelector(collapsibleElem[i]).html();
        let opponentTeamName;
        if(i == 0){
             opponentTeamName = cSelector(teamname[1]).find(".name-detail a");
        }else{
             opponentTeamName = cSelector(teamname[0]).find(".name-detail a");
        }
        getBothTeamInningBatsman(bothteamInning, cSelector, pathOfInFolder, opponentTeamName);
    }
}

function getBothTeamInningBatsman(bothteamInning, cSelector, pathOfFolder, opponentTeamName){
    let allRows = cSelector(bothteamInning).find(".table.batsman tbody tr");
    for(let j = 0; j < allRows.length; j++){
        let allCol = cSelector(allRows[j]).find("td");
        if(allCol.length == 8){
            let playerName = cSelector(allCol[0]).text();
            let pName = playerName;
            playerName = playerName.trim();
            playerName = playerName + ".json";
            let pathOfFile = path.join(pathOfFolder, playerName);
            createFile(pathOfFile);
            let venue = cSelector(".match-info.match-info-MATCH .description").text().split(",")[1].trim();
            let date = cSelector(".match-info.match-info-MATCH .description").text().split(",")[2].trim();
            let run = cSelector(allCol[2]).text();
            let bowl = cSelector(allCol[3]).text();
            let fours = cSelector(allCol[5]).text();
            let sixes = cSelector(allCol[6]).text();
            let strikeRate = cSelector(allCol[7]).text();
            let opTeamName = opponentTeamName.text();
            let result = cSelector(".event .match-info.match-info-MATCH .status-text span").text();

            let content = fs.readFileSync(pathOfFile);
            if(Buffer.byteLength(content) == 0){
                    let arr = [];
                    arr.push({
                        PlayerName: pName,
                        Venue: venue,
                        Date: date,
                        Run: run,
                        Bowls: bowl,
                        Fours: fours,
                        Sixes: sixes,
                        StrikeRate: strikeRate,
                        OpponentTeamName: opTeamName,
                        Result: result
                    })
                    let contentinfile = JSON.stringify(arr);
                    fs.writeFileSync(pathOfFile, contentinfile);
            }else{
                let arr = JSON.parse(content);
                arr.push({
                    PlayerName: pName,
                    Venue: venue,
                    Date: date,
                    Run: run,
                    Bowls: bowl,
                    Fours: fours,
                    Sixes: sixes,
                    StrikeRate: strikeRate,
                    OpponentTeamName: opTeamName,
                    Result: result
                })
                let contentinfile = JSON.stringify(arr);
                fs.writeFileSync(pathOfFile, contentinfile);
            }
        }
    }
}