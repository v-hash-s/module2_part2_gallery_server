import { IncomingMessage } from "http"
import { basename, dirname } from "path/posix"
import { GalleryResponse, ErrorMessage  } from "./interfaces"
import * as util from 'util';

// const fs = require('fs')
import * as fs from 'fs'
// const path = require('path')
import * as path from 'path'
// const querystring = require('querystring')
import * as querystring from 'querystring'

const readdir = util.promisify(fs.readdir);

enum folders {
    first_page = 1,
    second_page,
    third_page,
    fourth_page,
    fifth_page,
}


let photos: Array<string> = [];


export async function sendGalleryObject(url: any): Promise<GalleryResponse | ErrorMessage>{

    photos = [];
    let str = querystring.parse(url, "?")
    let pageNumber: number = Number(`${str['page']}`);
    if (isNaN(Number(pageNumber)) || Number(pageNumber) > 5 || Number(pageNumber) < 1) {
        console.log("Wrong page number")
        return {
            errorMessage: "Invalid page number"
        };
    }
    let dir = '../static/photos/' + folders[pageNumber];
    dir = path.resolve(dir);
    let files = await readdir(dir)

    files.forEach((file: any) => {
        photos.push(file)
    });

    let galleryResponse: GalleryResponse = {
        objects: mappedArray(photos, pageNumber),
        page: pageNumber.toString(),
        total: 5
    }

    console.log(galleryResponse)

    return galleryResponse;
}    

function mappedArray(arr: Array<string>, pageNumber: number): Array<string>{
    let newArr: Array<string> = []
    
    newArr = arr.map((img) => {
        return `photos/${folders[pageNumber]}/` + img;
    })

    return newArr;
}


