const Comment = require('../models/comment');

const Post = require('../models/post');

const commentsMailer = require('../mailers/comment_mailers');

module.exports.create = async function (req , res ) {
    
    try{
        let post = await Post.findById( req.body.post );

        if( post ){

            let comment = await Comment.create({
                content: req.body.content, 
                post: req.body.post ,
                user: req.user._id
            });

            post.comment.push(comment);
            post.save();
            // comment = await comment.populate('user', 'name').execPopulate();
            comment = await comment.populate('user','email').execPopulate();
            commentsMailer.newComment(comment);
            res.redirect('/');

        }
    }catch(err){
        console.log(req.body);
        return res.render('/');
    }
}


module.exports.destroy = async function(req ,res ) {
    
    try{

        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id ){
        
            let postid = comment.post ;
            comment.remove();
            
            await Post.findByIdAndUpdate(postid , { $pull: {comment : req.params.id} });
            
            return res.redirect('back');
        
        }else {
            return res.redirect('back');
        }

    }catch(error){

        console.log("error in comments controller :", error);
   
    }
}



