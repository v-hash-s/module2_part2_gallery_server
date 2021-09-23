import { UsersDB, Token, ErrorMessage } from "./interfaces"
import { sendGalleryObject } from "./gallery";
import { ServerResponse } from "http";

import * as fs from 'fs'
import * as path from 'path'
import * as url from 'fs'


const token: Token = {
    'token': 'token',
}

const users: UsersDB = {
    'asergeev@flo.team': 'jgF5tn4F',
    'vkotikov@flo.team': 'po3FGas8',
    'tpupkin@flo.team': 'tpupkin@flo.team',
}

const authorizationError: ErrorMessage = {
    errorMessage: "Incorrect login or password",
}

export function sendToken(body: string) {
    let userTemp = JSON.parse(body);
    if (userTemp.email in users && userTemp.password === users[userTemp.email]){
        console.log(JSON.stringify(token));
        return JSON.stringify(token)
    } else {
        return JSON.stringify(authorizationError);
    }
}

export function sendStream(res: ServerResponse, url: string){
    let stream = fs.createReadStream(path.resolve(".." + url!));
    res.setHeader("Content-Type", "image/jpg");
    stream.pipe(res);
}