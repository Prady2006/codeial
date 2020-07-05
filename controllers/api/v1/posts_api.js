const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req ,res ){
    
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate: {
            path: 'user'
        }
    });

    // let user = await User.find({});
    
    return res.json({
        message: "List of posts",
        posts: posts
    });
};



module.exports.destroy = async function(req , res ){
    try {
        let post = await Post.findById(req.params.id);


        if (post.user == req.user.id ){
            // mongoose converts object id to string format and is accessible through .id 
            post.remove();

            console.log("post deleted " );

            await Comment.deleteMany({post: req.params.id});

            console.log("comments deleted ");
            
            return res.json(200,{
                message: "Post and commenst associated are deleted"
            });
        }else {
            console.log("user not authorised ");
            res.json(401,{
                message: "cant delete post .Not authorized"
            });
        }
    
    }catch(err){
        console.log("*******",err);
        res.json(500,{
            message: "Internal server error"
        });
    }
}