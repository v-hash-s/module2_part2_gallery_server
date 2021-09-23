import { IncomingMessage, ServerResponse } from "http";
import { sendGalleryObject } from "./gallery.js"
import { sendHeaders } from "./headers.js";
import { sendStream, sendToken } from './login.js'

import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'

const requestListener = async function (req: IncomingMessage, res: ServerResponse) {
  let url = req.url;

  if (req.method == "OPTIONS")
    {
        sendHeaders(res)
        res.writeHead(200);
      console.log(url)
        res.end();
    }
  else if (req.method === "POST") {
        let body = "";
        req.on("data", (data) => {
            body += data.toString();
            console.log(body);
        });

        req.on("end", () => {
            let token = sendToken(body)
            sendHeaders(res)
            res.writeHead(200);
            res.end(token)
        });
    
  }
  else if (req.method === "GET") {
    console.log(url)
    sendHeaders(res)
    if (url! == "/") {
      res.setHeader("Content-Type", "text/html");
        let stream = fs.createReadStream(path.resolve("../static/pages/index.html"));
        stream.pipe(res);
    } else if (url?.startsWith("/gallery")) {
      res.setHeader("Content-Type", "text/html");
        let stream = fs.createReadStream(path.resolve("../static/pages/gallery.html"));
        stream.pipe(res);
    }
    else if (url?.startsWith("/photos")) {
      sendStream(res, "/static" + url)
    } else if(url?.startsWith("/api/gallery")) {
      let gallery = await sendGalleryObject(url);
      console.log(JSON.stringify(gallery))
      res.end(JSON.stringify(gallery))

    } else if (url?.startsWith("/static") && fs.existsSync(path.resolve(".." + url!))) {
        if (url?.endsWith(".js")) {
          res.setHeader("Content-Type", "text/javascript");
        } else {
        res.setHeader("Content-Type", "text/html");
        }
        let stream = fs.createReadStream(path.resolve(".." + url!));
        stream.pipe(res);
    } else {
      res.setHeader("Content-Type", "text/html");
      res.statusCode = 404;
      let stream = fs.createReadStream(path.resolve("../static/pages/not_found.html"));
      stream.pipe(res);
    }
  } 
}

const server = http.createServer(requestListener);
console.log("I'm started");
server.listen(8080);

