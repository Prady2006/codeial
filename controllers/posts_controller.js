const Post = require('../models/user');

module.exports.post = function(req, res ){
    if(req.isAuthenticated()){
        // console.log("inside method post " , req.user._id);
        // console.log(req.body);
        // console.log(req.user);
        Post.create({
            content: req.body.content,
            user: req.user._id
        },function(error , post){
            if(error){
                console.log(`error in creating the post ${error}`);
                return res.redirect('back');
            }
            console.log(`post : ${post}`);
            return res.render('posts',{
                user: user  
            });
        });
    }else{
        console.log("going back since user is not logged in ");
    }
    return res.redirect('/');
}