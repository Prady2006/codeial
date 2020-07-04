const User = require('../models/user');
const multer = require('multer');

const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){

    User.findById(req.params.id , function(error, user){

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user 
        });

    });

 
}

module.exports.update = async function(req , res ){
    // if(req.user.id == req.params.id ){
    //     User.findByIdAndUpdate(req.params.id , req.body , function(err,user) {
            
    //         return res.redirect('back');
    //     });
    // }else {
    //     return res.status(401).send('Unauthorized');
    // }
    
    if(req.user.id == req.params.id ){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res , function(err){
                // if(err){ console.log('*****Multer error : ', err)};
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    console.log("inside instance  ", err);
                  } else if (err) {
                    // An unknown error occurred when uploading.
                    console.log("unknown error : ",err);
        
                }
                console.log(req.file);
                user.name = req.body.name ;
                user.email = req.body.email ;
                if(req.file){

                    if(user.avatar){
                        let pathToImg = path.join(__dirname ,'../assets', user.avatar ) ;
                        if(fs.existsSync(pathToImg)){
                            fs.unlinkSync( pathToImg );
                        }
                    }

                    // saving the path of uploaded file into avatar field in the user 
                    user.avatar = User.avatarPath + '/' + req.file.filename ;
                }
                user.save() ;
                res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else {

        return res.status(401).send('Unauthorized');

    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                req.flash('success','You signed up successfully ');
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged inSuccessfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have successfully logged out');
    return res.redirect('/');
}