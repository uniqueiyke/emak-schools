const { readdir } = require('fs/promises');
const { join } = require('path');
const resultsPerClassPerTerm = require('./results-per-class-per-term');
const transferResults = require('./results-transfer');

const DIR_PATH = 'C:/Users/Unique_Iyke/Documents/emak schools/md_atlas_collections/results/result-json'

const terms = {
    '1st': 'First Term',
    '2nd': 'Second Term',
    '3rd': 'Third Term'
};

const parseResult = async () => {
    try {
        const fileDirents = await readdir(DIR_PATH, {encoding: 'utf-8', withFileTypes: true});
        for (const dirent of fileDirents){
            if(dirent.isFile()){
                const splitPath = dirent.name.split('_');
                const className = `${splitPath[1]}_${splitPath[2]}`;
                const session = `${splitPath[3]}/${splitPath[4]}`;
                const term = terms[`${splitPath[5].split('.')[0]}`];
                const results = await resultsPerClassPerTerm(join(DIR_PATH, dirent.name));
                await transferResults(session, term, className, results);
            }
        } 
        console.log('All results inserted')      
    } catch (err) {
        throw err.message;
    }
}

// parseResult()
// .catch(e => console.log(e));

module.exports = parseResult;