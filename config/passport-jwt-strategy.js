const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

//Once users jwt has been generated this function is used to authenticate Jwt
passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    console.log(`This is the jwtpayload: ${jwtPayload}`);
    User.findById(jwtPayload._id,function(error,user){
        if(error){
            console.log(`error in finding user from jwt : ${error}`);
        }
        if(user){
            return done(null,user);
        }
        else {
            return done(null ,false);
        }
    });
}));

module.exports= passport