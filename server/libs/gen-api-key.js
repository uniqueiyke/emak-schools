const StaffRegToken = require('../models/staff-registration-token');

const generateCodeOfLenth = require('./generate-random-code');

const notDuplicateKey = async (apiKeys) => {
    const newApiKey = await generateCodeOfLenth(35);
    const retVal = apiKeys.find(v => v.api_key === newApiKey)
    if (!retVal) {
        return newApiKey;
    }
    await notDuplicateKey(apiKeys);
}

async function getApikey () {
    try {
        const apiKeys = await StaffRegToken.find({},{_id: false, token: true});
        return await notDuplicateKey(apiKeys)
    } catch (error) {
        throw error;
    }
}

module.exports = getApikey;
