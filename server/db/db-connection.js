const mongoose = require('mongoose');

const dbConnection = (server = 'local') => {
    const mongoDbURL = server === 'remote' ? process.env.mongodbURL : process.env.localMongoDB1;
    mongoose.connect(mongoDbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(() => console.log(`mongoDB ${server} server conneted`))
        .catch(error => console.log('mongo connection error', error));
}

module.exports = dbConnection;