"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const gallery_js_1 = require("./gallery.js");
const headers_js_1 = require("./headers.js");
const login_js_1 = require("./login.js");
// import { UsersDB, Token } from "./interfaces"
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// const token: Token = {
//   'token': 'token',
// }
// const users: UsersDB = {
//   'asergeev@flo.team': 'jgF5tn4F',
//   'vkotikov@flo.team': 'po3FGas8',
//   'tpupkin@flo.team': 'tpupkin@flo.team',
// }
const requestListener = async function (req, res) {
    let url = req.url;
    if (req.method == "OPTIONS") {
        //In case of an OPTIONS, we allow the access to the origin of the petition
        // res.setHeader('Access-Control-Allow-Methods', "PUT,PATCH,DELETE,POST,GET")
        // res.setHeader("Access-Control-Allow-Headers", "API-Key,Content-Type,If-Modified-Since,Cache-Control,Access-Control-Allow-Methods, Authorization")
        // res.setHeader("Access-Control-Max-Age", "86400")
        // res.setHeader('Access-Control-Allow-Origin', '*')
        headers_js_1.sendHeaders(res);
        res.writeHead(200);
        console.log(url);
        res.end();
    }
    else if (req.method === "POST") {
        let body = "";
        req.on("data", (data) => {
            body += data.toString();
            console.log(body);
        });
        req.on("end", () => {
            // let userTemp = JSON.parse(body);
            // if (userTemp.email in users && userTemp.password === users[userTemp.email]) {
            //   console.log(JSON.stringify(token));
            //   res.end(JSON.stringify(token));
            // } 
            let token = login_js_1.sendToken(body);
            headers_js_1.sendHeaders(res); // HEADERS
            res.writeHead(200);
            res.end(token);
        });
    }
    else if (req.method === "GET") {
        console.log(url);
        headers_js_1.sendHeaders(res);
        if (url == "/") {
            res.setHeader("Content-Type", "text/html");
            let stream = fs.createReadStream(path.resolve("../static/pages/index.html"));
            stream.pipe(res);
        }
        else if (url?.startsWith("/gallery")) {
            res.setHeader("Content-Type", "text/html");
            let stream = fs.createReadStream(path.resolve("../static/pages/gallery.html"));
            stream.pipe(res);
        }
        else if (url?.startsWith("/photos")) {
            login_js_1.sendStream(res, "/static" + url);
            // let stream = fs.createReadStream(path.resolve("." + url!));
            // res.setHeader("Content-Type", "image/jpg");
            // stream.pipe(res);
        }
        else if (url?.startsWith("/api/gallery")) {
            let gallery = await gallery_js_1.sendGalleryObject(url);
            console.log(JSON.stringify(gallery));
            res.end(JSON.stringify(gallery));
        }
        else if (url?.startsWith("/static") && fs.existsSync(path.resolve(".." + url))) {
            if (url?.endsWith(".js")) {
                res.setHeader("Content-Type", "text/javascript");
            }
            else {
                res.setHeader("Content-Type", "text/html");
            }
            let stream = fs.createReadStream(path.resolve(".." + url));
            stream.pipe(res);
        }
        else {
            res.setHeader("Content-Type", "text/html");
            res.statusCode = 404;
            let stream = fs.createReadStream(path.resolve("../static/pages/not_found.html"));
            stream.pipe(res);
        }
    }
};
const server = http.createServer(requestListener);
console.log("I'm started");
server.listen(8080);
