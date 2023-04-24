const ctsArray = require("./cts-array");
const transferClassScores = require("./students-scores-transfer");

ctsArray

const transferAllScores = async () => {
    for (const cts of ctsArray) {
        await transferClassScores(cts);
        console.log(`scores for ${cts} transfered`);
    }

    console.log('Scores for all classes for all years transfered')
}

module.exports = transferAllScores;

