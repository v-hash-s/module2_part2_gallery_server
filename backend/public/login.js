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
exports.sendStream = exports.sendToken = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const token = {
    'token': 'token',
};
const users = {
    'asergeev@flo.team': 'jgF5tn4F',
    'vkotikov@flo.team': 'po3FGas8',
    'tpupkin@flo.team': 'tpupkin@flo.team',
};
const authorizationError = {
    errorMessage: "Incorrect login or password",
};
function sendToken(body) {
    let userTemp = JSON.parse(body);
    if (userTemp.email in users && userTemp.password === users[userTemp.email]) {
        console.log(JSON.stringify(token));
        return JSON.stringify(token);
    }
    else {
        return JSON.stringify(authorizationError);
    }
}
exports.sendToken = sendToken;
function sendStream(res, url) {
    let stream = fs.createReadStream(path.resolve(".." + url));
    res.setHeader("Content-Type", "image/jpg");
    stream.pipe(res);
}
exports.sendStream = sendStream;
