if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbConnection = require('./db/db-connection');
const cors = require('./middlewares/cors');

dbConnection(process.env.NODE_ENV !== 'production' ? 'local' : 'remote');
// dbConnection('remote');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env.origin }));

app.use('/admin', require('./routes/admin'));
app.use('/staffs', require('./routes/staffs'));
app.use('/students', require('./routes/students'));
app.use('/gradebooks', require('./routes/grade-books'));

//serve static file if in production 
if (process.env.NODE_ENV === 'production') {
    const dirname = __dirname;
    const rootPath = dirname.replace('server', '');
    //Set static folder
    app.use(express.static(path.resolve(rootPath, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(rootPath, 'client', 'build', 'index.html'))
    });
}


module.exports = app;
