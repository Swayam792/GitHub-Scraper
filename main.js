let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getRepoPageHtml = require("./reposPage.js");
request(url, (err, res, html) => {
    if(err) {
        console.log(err);
    }else if(res.statusCode === 404){
        console.log("Page not found");
    }
    else {
        getTopicLinks(html);
    }
});

const getTopicLinks = (html) => {
    let $ = cheerio.load(html);
    let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    
    for(let i = 0; i < linkElemArr.length; i++){         
        let href = $(linkElemArr[i]).attr("href");
        let topic = href.split("/").pop();
        let fullLink = `https://github.com/${href}`;
        getRepoPageHtml(fullLink, topic);
    }
}