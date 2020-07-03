const Post = require("../models/post");

const User = require('../models/user');

module.exports.home =  async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    // populate user of each post 
    // Post.find({}).populate('user').exec(function(error,posts){
        
    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    //     });
    
    // });
    try {
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });
    
        let user = await User.find({});
            
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: user 
        });

    }catch(err) {
        console.log("error :" , err);
        return ;
    }


}


// module.exports.actionName = function(req, res){}

