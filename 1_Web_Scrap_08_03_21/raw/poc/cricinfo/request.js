let request = require("request");
let cheerio = require("cheerio");
//console.log("before");
//yha se request jaa rhi hai particular site p jisko 
//scrap rna hai
// Find last ball commentry
// https://www.espncricinfo.com/series/england-tour-of-india-2020-21-1243364/india-vs-england-2nd-odi-1243394/ball-by-ball-commentary

// Find the name of highest wicket taker and no of wickets taken
// https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard

// Leaderboard of winning teams batsman
// https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results
request("https://www.google.com/", cb);
//response is superset -> body
// cb function ka content jaada hai isliye vo before or after k baad chalta hai
// Yha p bhi multithreading vala concept chalta hai
function cb(err, response, html){
    //html m html ki body aati hai
    //response m pure object ka response aata hai
    // err m agar koi error aa jae to vo aati hai
    let cheerioSelector = cheerio.load(html);
    let element = cheerioSelector("#SIvCob");   //Particular id ->  #SIvCob
    //Google ki website p jaakr inpect krna kisi bhi text pr
    // Us text m jo bhi chij unique mile use copy krke yha chipka dena
    // Isse tum web ki scrappping se vo content apne pass le aaoge
    // console.log(element.html());
    // html laakr dega ^
    console.log(element.text());
    // text laakr dega ^
}
// console.log("After");