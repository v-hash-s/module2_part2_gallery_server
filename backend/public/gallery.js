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
exports.sendGalleryObject = void 0;
const util = __importStar(require("util"));
// const fs = require('fs')
const fs = __importStar(require("fs"));
// const path = require('path')
const path = __importStar(require("path"));
// const querystring = require('querystring')
const querystring = __importStar(require("querystring"));
const readdir = util.promisify(fs.readdir);
var folders;
(function (folders) {
    folders[folders["first_page"] = 1] = "first_page";
    folders[folders["second_page"] = 2] = "second_page";
    folders[folders["third_page"] = 3] = "third_page";
    folders[folders["fourth_page"] = 4] = "fourth_page";
    folders[folders["fifth_page"] = 5] = "fifth_page";
})(folders || (folders = {}));
let photos = [];
async function sendGalleryObject(url) {
    photos = [];
    let str = querystring.parse(url, "?");
    let pageNumber = Number(`${str['page']}`);
    if (isNaN(Number(pageNumber)) || Number(pageNumber) > 5 || Number(pageNumber) < 1) {
        console.log("Wrong page number");
        return {
            errorMessage: "Invalid page number"
        };
    }
    let dir = '../static/photos/' + folders[pageNumber];
    dir = path.resolve(dir);
    // let files = fs.readdirSync(dir)
    let files = await readdir(dir);
    files.forEach((file) => {
        photos.push(file);
    });
    let galleryResponse = {
        objects: mappedArray(photos, pageNumber),
        page: pageNumber.toString(),
        total: 5
    };
    console.log(galleryResponse);
    return galleryResponse;
}
exports.sendGalleryObject = sendGalleryObject;
function mappedArray(arr, pageNumber) {
    let newArr = [];
    newArr = arr.map((img) => {
        return `photos/${folders[pageNumber]}/` + img;
    });
    return newArr;
}
