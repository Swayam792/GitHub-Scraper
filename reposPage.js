let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio"); 
const getIssuePageHtml = require("./issue");

const getRepoPageHtml = (url, topic) => {
    request(url, (err, res, html) => {
        if(err) {
            console.log(err);
        }else if(res.statusCode === 404){
            console.log("Page not found");
        }
        else {
           getReposLink(html);         
        }
    });
    const getReposLink = (html) => {
        let $ = cheerio.load(html);
        let headingsArr = $(".f3.color-fg-muted.text-normal.lh-condensed");     
        for(let i = 0; i < 8; i++){
            let twoAnchors = $(headingsArr[i]).find("a");
            let link = $(twoAnchors[1]).attr("href");
            let fullLink = `https://github.com/${link}/issues`;
            let repoName = link.split("/").pop();
            getIssuePageHtml(fullLink, topic, repoName);
        }
        
    }
}

module.exports = getRepoPageHtml;