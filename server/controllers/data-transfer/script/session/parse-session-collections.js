const { readdir } = require('fs/promises');
const { join } = require('path');
const sessionCollectionData = require('./pares-collection-data');
const executCollectionTransfer = require('./execut-collection-transfer');

const DIR_PATH = 'C:/Users/Unique_Iyke/Documents/emak schools/md_atlas_collections/results/srt-json';

const sessionCollections = async () => {
    try {
        const fileDirents = await readdir(DIR_PATH, {encoding: 'utf-8', withFileTypes: true});
        // const fileDirents = await readdir(dirPath, {encoding: 'utf-8', withFileTypes: true});
        for (const dirent of fileDirents){
            if(dirent.isFile()){
                const arrayOfSessions = await sessionCollectionData(join(DIR_PATH, dirent.name))
                await executCollectionTransfer(arrayOfSessions);
            }
        }
        console.log('all added successfully')
    } catch (err) {
        throw err;
    }
}

// sessionCollections()
// .catch(e => console.log(e));

module.exports = sessionCollections;
