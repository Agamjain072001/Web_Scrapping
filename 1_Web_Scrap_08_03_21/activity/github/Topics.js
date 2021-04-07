let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");
let extractRepoListObj = require("./extractRepoList")

request("https://github.com/topics", cb);

function cb(err, response, html){
    let cheerioSelector = cheerio.load(html);
    let TopicsCard = cheerioSelector(".topic-box.position-relative.hover-grow.height-full.text-center.border.color-border-secondary.rounded.color-bg-primary.p-5 a");
    // console.log(TopicsCard.length);
    for(let i=0;i<TopicsCard.length;i++){
        let TopicNames = cheerioSelector(TopicsCard[i]).text();
        TopicNames = TopicNames.trim().split("\n")[0];
        let link = cheerioSelector(TopicsCard[i]).attr("href");
        // console.log(TopicNames);
        // console.log(link);
        // console.log("......................................");
        let fullLink = "https://github.com" + link;
        extractRepoListObj.extractRepoLinks(fullLink);
    }
}

