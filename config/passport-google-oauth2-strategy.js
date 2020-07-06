const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');


passport.use(new googleStrategy({
    clientID: "302162156750-mktlj2ng4vo2ol9lqnh8hkjmobelgf79.apps.googleusercontent.com",
    clientSecret: "i4rsRwC1oz3lVHQCQllSbAIK",
    callbackURL: "http://localhost:8000/users/auth/google/callback"

},
    function(accessToken , refreshToken, profile , done ){
        // find a user in mongodb 
        User.findOne({ email: profile.emails[0].value }).exec(function(err,user){
            if(err){
                console.log(`error in google strategy passport: ${err}`);
                return ;
            }
            console.log(accessToken , refreshToken);
            console.log(profile);
            // if found set this user as req.user 
            if(user){
                done(null,user);
            }else {

                // if not found create user and set user as req.user 
                User.create({

                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')

                },function(err,user){
                    if(err){
                        console.log(`error in creating user: ${err}`);
                        return;
                    }
                    return done(null ,user );
                });
            }
        });
    }
));

module.exports = passport ;