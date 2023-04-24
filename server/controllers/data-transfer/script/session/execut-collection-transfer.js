// const { reCreateGradeBookSession } = require('../data-transfer-controller');

const collectionTransfer = require("./collection-transfer");

const executCollectionTransfer = async arrayOfData => {
    try {
        for await (const data of arrayOfData) {
            await collectionTransfer(data);
            console.log('successful');
        }
    } catch (error) {
        console.log('failed');
        throw error;
    }
}

module.exports = executCollectionTransfer;
