// Highest wicket takers from both the teams in a particular innings
let request = require("request");
let cheerio = require("cheerio");


let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url, cb);
// Static content can only be scrapped by node js

function cb(err, response, html){
    let cSelector = cheerio.load(html);
    //Taking key for both the bowlers table present in page
    let tables = cSelector(".table.bowler");
    // Two tables are there so length will be two
    // console.log(tables.length); 
    // let bowlersHtmlString = "";
    for(let i=0; i<tables.length; i++){
        let hwtname = "";
        let hwicket = 0;
        // Taking data in the form of string
        // bowlersHtmlString += cSelector(tables[i]).html();
        // find function is used to find a element inside a element
        // Here I am finding table row from a table and storing it in teamBowlers
        // Here find will return the array of rows.
        let teamBowlers = cSelector(tables[i]).find("tr");
        // Now print all team bowlers text or html with the help of looping
        for(let j =0; j < teamBowlers.length; j++){
            // let bolHtml = cSelector(teamBowlers[j]).text();
            // console.log(bolHtml);
            let eachbowlcol = cSelector(teamBowlers[j]).find("td");
            let playerName = cSelector(eachbowlcol[0]).text();
            let wickets = cSelector(eachbowlcol[4]).text();
            console.log(playerName ,"                    ", wickets);
            if(hwicket <= Number.parseInt(wickets)){
                hwicket = wickets;
                hwtname = playerName;
            }
        }
        console.log("Bowler ", hwtname, "takes highest no of wickets : ", hwicket);
        console.log(".......................................");
    }
    // Print all html data in the form of string
    // Pasting it in bowlerData
    // Check it there will be two tables
    // console.log(bowlersHtmlString);
}

