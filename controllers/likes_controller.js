const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req, res)  {
    try{
        
        // likes/toggle/?id=1o43kd&type=Post
        let likeable , deleted = false ;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // checking if a like already exists 
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        if(existingLike){
            // if like exists then delete it 
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true ;
        }else {
            // else create a like 
            let newLike = await Like.create({
                user: req.user._id,
                onModel: req.query.type,
                likeable: req.query.id
            });
            likeable.likes.push(newLike); 
            likeable.save();
        }
        return res.json(200,{
            message: "successful",
            data: {
                deleted: deleted
            }
        })

    }catch(err){
        console.log(`error in togglinglike: ${err}`);
        res.json(500,{
            message: "Internal server error"
        });
    }
}