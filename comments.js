// Create web server

var http = require("http");
var url = require("url");
var fs = require("fs");
var querystring = require("querystring");
var comments = require("./comments.json");

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    var query = urlObj.query;
    var method = req.method;

    if (pathName === "/") {
        fs.readFile("./index.html", function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.setHeader("Content-Type", "text/html;charset=utf-8");
                res.end(data);
            }
        });
    } else if (pathName === "/getComments") {
        var comments = require("./comments.json");
        var comment = comments[query.index];
        var str = JSON.stringify(comment);
        res.end(str);
    } else if (pathName === "/addComment") {
        var str = "";
        req.on("data", function (chunk) {
            str += chunk;
        });
        req.on("end", function () {
            var comment = querystring.parse(str);
            comments.push(comment);
            fs.writeFile("./comments.json", JSON.stringify(comments), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.end("success");
                }
            });
        });
    } else {
        fs.readFile("." + pathName, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.end(data);
            }
        });
    }
});

server.listen(9090, function () {
    console.log("server is listening on 9090 port");
});