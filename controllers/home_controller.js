const Post = require("../models/post");

const User = require('../models/user');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    // populate user of each post 
    // Post.find({}).populate('user').exec(function(error,posts){
        
    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    //     });
    
    // });

    Post.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){

        User.find({} , function(err , user){
            
            return res.render('home', {
                title: "Home",
                posts: posts,
                all_users: user 
            });
        
        });


    });
        



}


// module.exports.actionName = function(req, res){}