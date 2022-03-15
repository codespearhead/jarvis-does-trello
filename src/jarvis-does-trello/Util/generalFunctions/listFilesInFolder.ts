import fs from 'fs';

export function listFilesInFolder (args: {pathToFolder: string, enconding: any}) {
    let encoding = args["enconding"];
    if (encoding)
        encoding = "UTF-8"
    return new Promise(function(resolve, reject) {
        fs.readdir(args["pathToFolder"],encoding, function(err, filenames){
            if (err) 
                reject(err)
            else 
                resolve(filenames)
        });
    });
};
