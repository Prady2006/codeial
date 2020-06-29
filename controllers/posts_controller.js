const Post = require('../models/post'); 

const Comment = require('../models/comment');

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
                return res.redirect('/');
            }
            console.log(`post : ${post}`);
            // return res.render('posts',{
            //     user: user  
            // });
            return res.redirect('/');
        });
    }else{
        console.log("going back since user is not logged in ");
        return res.redirect('/');
    }
    // return res.redirect('/');
}

module.exports.destroy = function(req , res ){
    Post.findById(req.params.id , function(error , post ){
        
        if(error){
            console.log(`error in posts_controller ${error}`);
        }

        // mongoose converts object id to string format and is accessible through .id 
        if(post.user == req.user.id ){
            post.remove();
            console.log("post deleted " );
            Comment.deleteMany({post: req.params.id},function(error,post){
                if(error ){
                    console.log(`error in deleting from posts_controller : ${error}`);
                    return res.redirect('back');
                }
                console.log("comments deleted ");
                return res.redirect('back');
            });
        }else {
            return res.redirect('back');
        }

    });
}