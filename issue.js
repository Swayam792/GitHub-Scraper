let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");  
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

const getIssuePageHtml = (url, topic, repoName) => {
    request(url, (err, res, html) => {
        if(err) {
            console.log(err);
        }else if(res.statusCode === 404){
            console.log("Page not found");
        }else {
            getIssues(html); 
        }
    });
    const getIssues = (html) => {
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr = [];
        for(let i = 0; i < issuesElemArr.length; i++){
            let link = $(issuesElemArr[i]).attr("href");
          
            arr.push(link);
        }
       
       let folderpath = path.join(__dirname, topic);
       dirCreater(folderpath);
       let filePath = path.join(folderpath, repoName+".pdf");
       let text = JSON.stringify(arr);
       let pdfDoc = new pdfkit();
       pdfDoc.pipe(fs.createWriteStream(filePath));
       pdfDoc.text(text);
       pdfDoc.end();      
    }
}

const dirCreater = (folderpath) => {
    if(fs.existsSync(folderpath) == false){
        fs.mkdirSync(folderpath);
    }
}

module.exports = getIssuePageHtml;