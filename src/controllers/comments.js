const Post = require('../models/Posts');
const Comment = require('../models/Comments');
const User = require('../models/Users');
const validatorHelper = require('../helpers/offWordValidator');
const OffensiveWords = require('../models/OffensiveWords');
const md5 = require('md5');
const commentController = {};

// Create a Comment
commentController.createComment = async(req,res) => {
    const user = await User.findOne({_id:req.user._id});
    if(user == null) {
        res.status(400).json({success:false, msg:"User not found"});
    } 
    const {text} = req.body;
    const arrOffWords = await validatorHelper.getOffWords(OffensiveWords); 
    const checkOffWords = validatorHelper.offWordValidator(text,arrOffWords);
    if(checkOffWords.length > 0) {
        res.status(400).json({success: false, message: `Comment contains this offWords!,{${checkOffWords}}`})
    }else{
        const post = await Post.findById(req.params.idPost);
        if(!post){
            res.status(400).json({success: false, message: "Comment not found"});
        } else {
            let newComment = new Comment({
                userName:user.userName,
                text,
                email:user.email,
                gravatar: md5(user.email)
                });
                await newComment.save(); 
                post.comments.push({commentId: newComment._id,userName:user.userName,comment: text,gravatar:md5(user.email)});
                await post.save();
                res.status(200).json({success: true, message: "Comment is create correctly!"})
        }  
    }
};
// Update Comment
commentController.editComment = async(req,res) => {
    const arrOffWords = await validatorHelper.getOffWords(OffensiveWords); 
    const checkOffWords = validatorHelper.offWordValidator(req.body.text,arrOffWords);
    if(checkOffWords.length > 0) {
        res.status(400).json({success: false, message: `Post contains this offWords!,{${checkOffWords}}`})
    }else{
        const comment = await Comment.findOne({_id : req.params.idComment});
        if(!comment) {
            res.status(400).json({success: false, message: "Comment not found"});
        } else {
            const editComment = {
                userName: req.body.userName,
                text: req.body.text,
                email:req.body.email
            };
            await Comment.updateOne({_id: req.params.idComment}, {
                $set: editComment
            });
            res.status(200).json({success: true, message: "Comment edit correctly"})
        }
    }
    
}
// Delete a Commen
commentController.deleteComment = async(req,res) => {
    const comment = await Comment.findOne({_id : req.params.idComment});
    if(!comment) {
        res.status(400).json({success: false, message: "Comment not found"});
    } else {
        await comment.remove();
        res.status(200).json({success: true, message: "Comment delete correctly"});
    }

}

module.exports = commentController;