// Given a series link You had to go to the all score cards 
// And then finding the leaderboard of batsman by calculating the total runs of particular batsmans

let request = require("request");
let cheerio = require("cheerio");
// Creating stats array to represent data in leaderbboard
let statsArr = [];
// gCount will holfd the no of match cards or no of matches held
let gCount;
// Count is a simple variable used to check whether we added batsmans from each and every match
let count = 1;


request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results", cb);

function cb(err, response, html){
    let cheerioSelector = cheerio.load(html);
    // All match cards
    let matchCard = cheerioSelector(".col-md-8.col-16");
    // console.log(matchCard.length);
    gCount = matchCard.length;
    for(let i=0;i<matchCard.length;i++){
        // Getinng all anchors from match card
        let allAnchorsOfAMatch = cheerioSelector(matchCard[i]).find(".match-cta-container .btn.btn-sm.btn-outline-dark.match-cta");
        // Getting href attributes from link
        let link = cheerioSelector(allAnchorsOfAMatch[2]).attr("href");
        // Creating fulllink from halflink
        let fullLink = "https://www.espncricinfo.com"+link;
        // console.log(fullLink);
        request(fullLink, cbSingle);
    }
}


function cbSingle(err, response, html){
    let cSelector = cheerio.load(html);
    // Taking the names of both the innings
    let bothMatches = cSelector(".match-header .match-info.match-info-MATCH .teams .team");
    // console.log(bothMatches.length);
    // Yha dono matches mtlb dono innings bothmatches m aaegi Iski length 2 hoggi
    for(let i=0;i<bothMatches.length; i++){
        // Jis team ki class m team-gray hai vo nhi jitegi
        let isLossing = cSelector(bothMatches[i]).hasClass("team-gray");
        // Agar isLossing false hai mtlb id team m team- gray nhi hai
        // Jo site p bold m likhi hui hai vo team jiti hai
        let myTeam;
        if(isLossing == false){
            // Uske baad humne team ki name detail nikal li
            let myTeamElem = cSelector(bothMatches[i]).find(".name-detail a");
            // console.log(myTeamElem.text());
            myTeam = myTeamElem.text();
            
        }
        
        // MI ka collapsible block
        // DC ka collapsible block
        let colInnings = cSelector('.Collapsible');
            // Team name 
            // MI name and DC name
        let bothTeamInningsName = cSelector(".Collapsible .header-title.label");
        // Array ki length
        for(let j=0; j<bothTeamInningsName.length; j++){
            // team name ka text
            let teamname = cSelector(bothTeamInningsName[j]).text();
            // Splitting the name by index
            let teamFirstName = teamname.split("INNINGS")[0];
            // Trim krenge team First name
            teamFirstName = teamFirstName.trim();
            // Agar team first name myTeam k barabar hai
            if(teamFirstName == myTeam){
                // Taking that collapsible block html of winning team
                let winningTeamInning = cSelector(colInnings[j]).html();
                // console.log(winningTeamInning);
                // Prints winning team name
                console.log(myTeam);
                // Calling function to get winning team stats
                winningTeamStats(winningTeamInning, cSelector);
            }
        }
    }

    if(gCount == count){
        // Prints data in unsorted order
        // console.table(statsArr);

        // This will print the data present in table in sorted order
        // This will print data descendingly on the basis of runs
        let sortable = [];
        for(let data in statsArr){
            // First argument should be the data which provides the data with the help of which it is sorted
            // Second argument should be the data which provides the data which is to be sorted
            // On the basis of players name we get the players runs and we had to sort the player runs
            sortable.push([statsArr[data].name, statsArr[data].runs]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];         // Descending order
            // Ascending order ->  a[1] -  b[1];
        });
        console.table(sortable);
    }else{
        count++;
    }
}

function winningTeamStats(winningTeamInning, cSelector){
    // Taking selectors from winning team
    let allRows = cSelector(winningTeamInning).find(".table.batsman tbody tr");
    // Selecting length of all rows
    for(let j = 0;j < allRows.length; j++){
        // Selecting colums from the batsman rows
        let allCol = cSelector(allRows[j]).find("td");
        // If columns has length 8
        if(allCol.length == 8){
            // Taking playernames text
            let playerName = cSelector(allCol[0]).text();
            // Taking players runs
            let runs = cSelector(allCol[2]).text();
            // Pushing them to add them to leader Board
            addToLeaderBoard(playerName, runs);
        }
    }
    console.log("....................................................");
}

function addToLeaderBoard(playerName, cRuns){
    let doesExist = false;
    for(let i= 0; i< statsArr.length; i++){
        if(statsArr[i].name == playerName){
            statsArr[i].runs += Number(cRuns);
            doesExist = true;
            break;
        }
    }
    if(doesExist == false){
        let playerObject = {
            name: playerName,
            runs: Number(cRuns)
        }
        statsArr.push(playerObject);
    }
}