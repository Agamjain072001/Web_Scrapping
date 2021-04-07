let cheerio = require("cheerio");
let request = require("request");
let path = require("path");
let fs = require("fs");

function extractRepoList(url) {
    request(url, cb);
}

function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        extractData(html);
    }
}

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

function extractData(html){
    let setTool = cheerio.load(html);
    let topicElementArr = setTool("h1");
    let topicName = setTool(topicElementArr[0]).text().trim().split("\n")[0];
    // console.log(topicName);
    let pathOfFolder = path.join(__dirname, topicName);
    dirCreator(pathOfFolder);
    let repoLinkArr = setTool("h1.f3.color-text-secondary.text-normal.lh-condensed");
    for(let i = 0;i <8 ; i++){
        let aArr = setTool(repoLinkArr[i]).find("a");
        let repoLink = setTool(aArr[1]).attr("href");   
        // console.log(link);
        let fileName = repoLink.split("/").pop();   //-> pop removes last element and returns it
        let filePath = path.join(pathOfFolder, fileName + ".json");
        createFile(filePath);
        let issuesFullLink = "https://github.com" + repoLink + "/issues";
        getIssueData(issuesFullLink, filePath); 
    }
    console.log("'''''''''''''''''''''''''''''''''");
}

function getIssueData(url, filePath){
    request(url, IssuePageCb);
    function IssuePageCb(err, response,html){
        if(err){
            console.log(err);
        }else{
            extractIssues(html);
        }
    }
    function extractIssues(html){
        let setTool = cheerio.load(html);
        let arr = [];
        let issuesAnchorArr = setTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        for(let i =0; i<issuesAnchorArr.length; i++){
            let link = setTool(issuesAnchorArr[i]).attr("href");
            let issuesName = setTool(issuesAnchorArr[i]).text();
            let issueObj = {
                Link: "https://github.com" + link,
                IssueName: issuesName
            }
            arr.push(issueObj);
        }
        console.table(arr);
    }
}

module.exports = {
    extractRepoLinks: extractRepoList
}