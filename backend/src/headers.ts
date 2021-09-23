import { IncomingMessage, ServerResponse } from "http"

export function sendHeaders(res: ServerResponse){
    res.setHeader('Access-Control-Allow-Methods', "PUT,PATCH,DELETE,POST,GET")
        res.setHeader("Access-Control-Allow-Headers", "API-Key,Content-Type,If-Modified-Since,Cache-Control,Access-Control-Allow-Methods, Authorization")
        res.setHeader("Access-Control-Max-Age", "86400")
        res.setHeader('Access-Control-Allow-Origin', '*')
}