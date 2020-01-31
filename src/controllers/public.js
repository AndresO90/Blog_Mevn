const Post = require('../models/Posts');
const Comment = require('../models/Comments');

const publicController = {};

// Get a post
publicController.getPost = async(req,res) =>{
    const post= await Post.findById(req.params.idPost);
    if(!post) {
        res.status(400).json({success: false, message: "Post not found"});
    } else {
        post.views +=1;
        await post.save();
        res.status(200).json({success: true, post: post, id:req.params.idPost});
    }
};
// Get All Post in Db without comments
publicController.getAllPost = async(req,res) =>{
    const posts= await Post.find({},['author','userName','image','title', 'text']).limit(15).sort({ date : -1});
    if(!posts) {
        res.status(400).json({success: false, message: "The are not Post yet"});
    } else {
        res.status(200).json({success: true, posts: posts});
    } 
};
// Get Most Popular posts
publicController.mostPopularPost = async(req,res) => {
    const posts= await Post.find({},['title','image']).limit(3).sort({views: -1});
    if(!posts) {
        res.status(400).json({success: false, message: "The are not Post yet"});
    } else {
        res.status(200).json({success: true, posts: posts});
    } 
}

// Get All Post Statistics
publicController.getStatistics = async(req,res) =>{
    const postNumber = await Post.countDocuments(); 
    const commentsNumber = await Comment.countDocuments();
    const countForViews = await Post.aggregate([{$group: { //de cada post va tomando las vistas y las va sumando
        _id: '1',
        viewsTotal : {$sum: '$views'} //viewsTotal = la suma de las views
    }}]);
    const viewCount = countForViews[0].viewsTotal;
    const countForLikes = await Post.aggregate([{$group: {
        _id: '1',
        likesTotal : {$sum: '$likes'}
    }}]);
    const likesCount = countForLikes[0].likesTotal;
    res.status(200).json({
        postNumber: postNumber,
        commentsNumber: commentsNumber,
        viewCount: viewCount,
        likesCount: likesCount
    })
};

module.exports = publicController