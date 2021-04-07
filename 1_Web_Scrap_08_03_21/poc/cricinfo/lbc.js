//Last ball comments
let request = require("request");
let cheerio = require("cheerio");

// https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
request(url, cb);
// Static content can only be scrapped by node js

function cb(err, response, html){
    let cSelector = cheerio.load(html);
    let element = cSelector(".match-comment .d-flex.match-comment-padder.align-items-center .match-comment-long-text p");
    // let element = cSelector(".mb-5 .match-comment .match-comment-long-text.match-comment-padder p");
    // console.log(element);
    let text = cSelector(element[0]).text();
    console.log(text);
}
