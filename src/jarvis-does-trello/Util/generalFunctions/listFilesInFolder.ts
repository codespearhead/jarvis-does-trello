import fs from 'fs';

export function listFilesInFolder (args: {pathTofolder: string, enconding: any}) {
    let encoding = args["enconding"];
    if (encoding)
        encoding = "UTF-8"
    return new Promise(function(resolve, reject) {
        fs.readdir(args["pathTofolder"],encoding, function(err, filenames){
            if (err) 
                reject(err)
            else 
                resolve(filenames)
        });
    });
};