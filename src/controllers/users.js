const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const User = require('../models/Users');
const Post = require('../models/Posts');
const Comment = require('../models/Comments')
const OffensiveWords = require('../models/OffensiveWords');
const validatorHelper = require('../helpers/offWordValidator');

const usersController = {};


// Create User 
usersController.create = async (req,res) => {
    let { name, userName, email, password, confirm_password } = req.body;
        // Check password
        if(password !== confirm_password) {
            return res.status(400).json({msg: "Password do not match"});
        };
        // Check for the unique email
      const mail = await User.findOne({email:email});
      if(mail) {
        return res.status(400).json({msg :"Email is already taken"});
      };
      // Check unique userName
      const searchUser = await User.findOne({userName:userName})
      if(searchUser) {
        return res.status(400).json({msg :"UserName is already taken"});
      }
       // Register the user before validated
       let newUser = new User({
        name,
        userName,
        password,
        email,
    });
    // Hash the password with bcrypt
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async(err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            await newUser.save()         // Important here we save the user
            return res.status(200).json({success: true, message: "User is now register!"});         
        });
    });
};
// Login User 
usersController.login = async (req,res) => {

    const user = await User.findOne({userName:req.body.userName});
    if(!user) {
        res.status(400).json({msg: "This UserName don't exist", success: false})
    }
// If there is user we are now going to compare the password
bcrypt.compare(req.body.password, user.password).then(isMatch => {
    if (isMatch) {
        // User's password is correct and we need to send the JSON Token for that user
        const payload = {
            _id: user._id,
            username: user.userName,
            name: user.name,
            email: user.email
        }
        // Here we create the TOKEN
        jwt.sign(payload, key.secret, { expiresIn: 604800}, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                user: user,
                msg: "Hurry! You are now logged in."
            });
        })
    } else {
        return res.status(404).json({
            msg: "Incorrect password.",
            success: false
        });
    }
})
};
// Create new Post
usersController.createPost =  async(req,res) => {
    let user = await User.findById(res.req.user._id);
    if(!user) {
        res.status(400).json({success: false, msg: "User not found"})
    }
    let { image, title, text, comments } = req.body;
    const arrOffWords = await validatorHelper.getOffWords(OffensiveWords); // Find in bd the offWords and return this array
    const checkTextOffWords = validatorHelper.offWordValidator(text,arrOffWords);
    const checkTitleOffWords = validatorHelper.offWordValidator(title,arrOffWords);

    if(checkTextOffWords.length > 0 ) {
        res.status(400).json(`Post contains this offWords : ${checkTextOffWords}`);
    }else if(checkTitleOffWords.length > 0){
        res.status(400).json(`Post contains this offWords : ${checkTitleOffWords}`);
    }else {
        let newPost = new Post({
            author: user.author,
            userName: user.userName,
            image,
            title:title.toUpperCase(),
            text,
            comments
        });
        await newPost.save();
        user.createdPosts.push(newPost._id);
        await user.save();
        res.status(200).json({success: true, message: "Post is create correctly!"});
    }
    
};
// Get a post
usersController.getPost = async(req,res) =>{
    let user = await User.findById(req.params.userId);
    if(!user) {
        res.status(400).json({success: false, msg: "User not found"})
    }
    const post= await Post.findById(req.params.idPost);
    if(!post) {
        res.status(400).json({success: false, message: "Post not found"});
    } else {
        res.status(200).json({success: true, post: post});
    }
};
// Get All Post for specific user  without comments
usersController.getAllUserPost = async(req,res) =>{
    const user = await User.findOne({_id:req.params.userId});
    if(user == null) {
        res.status(400).json({success:false, msg:"User not found"});
    } else {
        const posts= await Post.find({userName:user.userName},['author','userName','image','title', 'text'])
        if(!posts) {
            res.status(400).json({success: false, message: "The are not Post yet"});
        } else {
            res.status(200).json({success: true, posts: posts});
        }
    }   
};
// Get All Post in Db without comments
usersController.getAllPost = async(req,res) =>{
    const user = await User.findOne({_id:req.params.userId});
    if(user == null) {
        res.status(400).json({success:false, msg:"User not found"});
    }
    const posts= await Post.find({},['author','userName','image','title', 'text'])
    if(!posts) {
        res.status(400).json({success: false, message: "The are not Post yet"});
    } else {
        res.status(200).json({success: true, posts: posts});
    } 
};
// Edit a Post
usersController.editPost = async(req,res) => {
    const user = await User.findOne({_id:req.params.userId});
    if(user == null) {
        res.status(400).json({success:false, msg:"User not found"});
    } 
    const post = await Post.findOne({userName : user.userName});
    // Check if post realy exist
    if(!post) {
        res.status(200).json({success: false, message: "Post not found"})
    } else {
    // Check if contains offensive words
    const arrOffWords = await validatorHelper.getOffWords(OffensiveWords); 
    const checkOffWords = validatorHelper.offWordValidator(req.body.text,arrOffWords);
    const checkTitleOffWords = validatorHelper.offWordValidator(req.body.title,arrOffWords);

    if(checkOffWords.length > 0) {
        res.status(400).json({success: false, message: `Post contains this offWords!,{${checkOffWords}}`})
    }else if(checkTitleOffWords.length > 0){
        res.status(400).json(`Post contains this offWords : ${checkTitleOffWords}`);
    }else {
        const editPost = {
            image:req.body.image,
            title:req.body.title,
            text:req.body.text
        }
        await Post.updateOne({_id: req.params.idPost}, {
            $set: editPost
        });
        res.status(200).json({success: true, message: "Post edit correctly"})
    }
}
};
// Delete a Post
usersController.deletePost = async(req,res) => {
    const user = await User.findOne({_id:req.params.userId});
    if(user == null) {
        res.status(400).json({success:false, msg:"User not found"});
    } 
    const post = await Post.findOne({_id : req.params.idPost});
    if(!post) {
        res.status(400).json({success: false, message: "Post not found"});
    } else {
        for(let comment of post.comments) {

            let idComment = comment.commentId.toString()
            const findComment = await Comment.findByIdAndDelete(idComment)
            console.log("findComment",findComment);
           
        }
        await post.remove();

       
      
        res.status(200).json({success: true, message: "Post delete correctly"});
    }
};
// Add Likes  
usersController.addLike = async(req,res) => {
   
    const post = await Post.findOne({_id : req.params.idPost});
    if(!post) {
        res.status(400).json({success: false, message: "Post not found"});
    } else {
        const userIdString = req.user._id.toString();
        const findLike = post.likeOwner.findIndex(id=> id == userIdString);

        if(findLike === -1) {
            post.likes +=1;
            post.likeOwner.push(req.user._id);
            await post.save();
            res.status(200).json({success: true, message: "Like Added correctly"});
        } else {
            res.status(400).json({ success:false, message: "Just one like per user!!"})
        }
        
    }
};


// Get User Statistics
usersController.getUserStatistics = async(req,res) =>{
    const user = await User.findById(req.params.id);
    const postNumber = await Post.find({userName:user.userName}); 
    const commentsNumber = await Comment.find({userName:user.userName});
    const postviews = await Post.find({userName:user.userName},["views","likes"])

   let totalViews = 0;
   let totalLikes = 0;
    for(let postview of postviews) {
        totalViews += postview.views
        totalLikes += postview.likes
    };

    res.status(200).json({
        Posts: postNumber.length,
        Comments: commentsNumber.length,
        Views: totalViews,
        Likes: totalLikes
    })
    

};



module.exports = usersController;