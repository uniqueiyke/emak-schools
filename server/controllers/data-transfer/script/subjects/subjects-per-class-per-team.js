const { readdir } = require('fs/promises');
const { join, basename } = require('path');
const oneSubjectPerClass = require('./one-subject-per-class.js');

const DIR_PATH = 'C:/Users/Unique_Iyke/Documents/emak schools/md_atlas_collections/subjects/json';
const subjectsPerClass = async (cts) => {
    try {
        const fileDirents = await readdir(DIR_PATH, { encoding: 'utf-8', withFileTypes: true });
        const subjects = [];
        for (const dirent of fileDirents) {
            if (dirent.isFile()) {
                const splitPath = basename(dirent.name).split('_');
                if (splitPath.length === 6 || splitPath.length === 7) {
                    const cts0 = splitPath.length === 6 ? `${splitPath[1]}_${splitPath[2]}_${splitPath[3]}_${splitPath[4]}_${splitPath[5].split('.')[0]}`
                        : `${splitPath[2]}_${splitPath[3]}_${splitPath[4]}_${splitPath[5]}_${splitPath[6].split('.')[0]}`;

                    if (cts0 === cts) {
                        const subject = await oneSubjectPerClass(join(DIR_PATH, dirent.name));
                        subjects.push(subject);

                    }

                }
            }
        }
        return subjects;
    } catch (err) {
        throw err.message;
    }
}

module.exports = subjectsPerClass; 

// subjectsPerClass('jss1_a_1st_2021_2022')
// .then(a => console.log(a[0].grades))
// .catch(e => console.log(e));