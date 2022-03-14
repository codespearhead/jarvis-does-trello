import fs from 'fs';

export function listFilesInFolder (args: {folder: string, enconding: any}) {
    let encoding = args["enconding"];
    if (encoding)
        encoding = "UTF-8"
    return new Promise(function(resolve, reject) {
        fs.readdir(args["folder"],encoding, function(err, filenames){
            if (err) 
                reject(err)
            else 
                resolve(filenames)
        });
    });
};