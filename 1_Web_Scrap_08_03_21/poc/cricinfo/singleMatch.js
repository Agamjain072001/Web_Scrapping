// Batsman table of winning team in innnings from both the teams
let request = require("request");
let cheerio = require("cheerio");

// Url
// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
// request(url, cb);


function singlePageExtractor(url){
    request(url, cb);
}




// Exporting the function
module.exports = {
    sPe: singlePageExtractor,
}