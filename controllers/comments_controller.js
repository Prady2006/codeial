const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req , res ) {
    Post.findById(req.body.post , function(error , post ){
        if(error){
            console.log(`error in comment controller and gettting post : ${error}`);
            return res.redirect('back');
        }
        if(post){
            Comment.create({
                content: req.body.content, 
                post: req.body.post ,
                user: req.user._id
            },function(error , comment){
                if(error){
                    console.log(`error in comment controller and in creating comment: ${error}`);
                    return res.redirect('back');
                }
                post.comment.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
    // console.log(req.body);
}


module.exports.destroy = function(req ,res ) {
    Comment.findById(req.params.id , function(error , comment ){
        if(comment.user == req.user.id ){
            let postid = comment.post ;
            comment.remove();
            
            Post.findByIdAndUpdate(postid , { $pull: {comment : req.params.id} } , function(err, post){
                return res.redirect('back');
            });
        }else {
            return res.redirect('back');
        }
    });
}