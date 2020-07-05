const User = require('../../../models/user');

const jwt = require('jsonwebtoken');

// sign in and create a session for the user
module.exports.createSession = async function(req, res){

    try{

        let user = await User.findOne({email: req.body.email});

        if(!user || user.password !== req.body.password){
            console.log("secodn dta ",user.password, req.body.password);
            return res.json(422,{
                message: "Invalid username or password"
            });
        }

        return res.json(200,{
            message: "Signed in successfull here is the token",
            data: {
                token: jwt.sign(user.toJSON(),'codeial',{expiresIn: 10000})
            }
        });

    }catch(err){

        console.log("*******",err);
        res.json(500,{
            message: "Internal server error"
        });

    }

}