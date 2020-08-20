const fs = require('fs');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.logs',{
    interval:'1d',
    path: logDirectory
});

const development = {
    name : "development",
    asset_path : '/public/assets',
    session_cookie_key: 'blahsomething',
    db:'mongodb+srv://Prady2006:12345@cluster0-44hjv.mongodb.net/codeial?retryWrites=true&w=majority',
    smtp: {

        service: 'google',
        host: 'smtp.gmail.com',
        port: 587 , 
        auth: {
            user: 'sharmaabhilashaa20.16@gmail.com',
            pass: 'abhilashaa_prady2016'
        }
    } ,
    google_clientID: "302162156750-mktlj2ng4vo2ol9lqnh8hkjmobelgf79.apps.googleusercontent.com",
    google_clientSecret: "i4rsRwC1oz3lVHQCQllSbAIK",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_key: 'codeial',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream
        }
    }
};

const production = {
    name: "production",
    asset_path : '/public/assets',
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {

        service: 'google',
        host: 'smtp.gmail.com',
        port: 587 , 
        auth: {
            user: process.env.CODEIAL_USER,
            pass: process.env.CODEIAL_PASS
        }
    } ,
    google_clientID: process.env.CODEIAL_GOOGLE_CLIENTID,
    google_clientSecret: process.env.CODEIAL_GOOGLE_CLIENTSECRET,
    google_callbackURL: "http://52.91.132.60:8000/users/auth/google/callback",
    jwt_key: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {
            stream: accessLogStream
        }
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = production;