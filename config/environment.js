const development = {
    name : "development",
    asset_path : '/assets',
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
};

const production = {
    name: "production"
}

module.exports = development;