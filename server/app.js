if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();  
}

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');

// import and create the mongoDB connection
mongoose.connect(process.env.mongodbURL, {  
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
})
.then(()=> console.log('mongo conneted'))
.catch(error => console.log('mongo connection error', error));

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: process.env.origin}));
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/staffs', require('./routes/staffs'));
app.use('/students', require('./routes/students'));

//serve static file if in production 
if(process.env.NODE_ENV === 'production'){
    const dirname = __dirname;
    const rootPath = dirname.replace('server', '');
    //Set static folder
    app.use(express.static(path.resolve(rootPath, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(rootPath, 'client', 'build', 'index.html'))
    });
}

module.exports = app;
