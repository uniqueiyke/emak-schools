const mongoose = require('mongoose');

const dbConnection = (server = 'local') => {
    const objects = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }

    if (server === 'local') {
        objects.family = 4
    }

    const mongoDbURL = server === 'remote' ? process.env.mongodbURL : process.env.localMongoDB1;
    mongoose.connect(mongoDbURL, objects)
        .then(() => console.log(`mongoDB ${server} server conneted`))
        .catch(error => console.log('mongo connection error', error));
}

module.exports = dbConnection;