const Post = require('../models/post'); 

const Comment = require('../models/comment');

module.exports.post = async function(req, res ){
    try {
        
        if(req.isAuthenticated()){
            await Post.create({
                content: req.body.content,
                user: req.user._id
            });
            req.flash('success', 'Post published !!!');
                return res.redirect('/');
        }else{
            console.log("going back since user is not logged in ");
            return res.redirect('/');
        }

    }catch(err){
        console.log("error in posts_controller : " , err) ;
        req.flash('error', err );
    }

}

module.exports.destroy = async function(req , res ){
    try {
        let post = await Post.findById(req.params.id);
        
        // mongoose converts object id to string format and is accessible through .id 
        if(post.user == req.user.id ){
            post.remove();

            console.log("post deleted " );

            await Comment.deleteMany({post: req.params.id});
            console.log("comments deleted ");
            req.flash('success','Post and associated comments deleted ');
            return res.redirect('back');

        }else {
            req.flash('error','You are not authorized to delete this post');
            return res.redirect('back');

        }


    }catch (err ) {
        console.log(`error in posts_controller ${error}`);
        req.flash('error', err );
        req.flash('error', err );
        return res.redirect('/');
    }

}