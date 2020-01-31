const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const Admin = require('../models/Admin');
const Post = require('../models/Posts');
const Comment = require('../models/Comments'); 
const OffensiveWords = require('../models/OffensiveWords');
const validatorHelper = require('../helpers/offWordValidator');
const adminController = {};

// Create Admin 
adminController.create = async (req,res) => {
    let { name, userName, email, password, confirm_password, job_profile } = req.body;
        // Check password
        if(password !== confirm_password) {
            return res.status(400).json({msg: "Password do not match"});
        };
        // Check for the unique email
      const mail = await Admin.findOne({email:email});
      if(mail) {
        return res.status(400).json({msg :"Email is already taken"});
      };
      // Check unique userName
      const searchAdmin = await Admin.findOne({userName:userName})
      if(searchAdmin) {
        return res.status(400).json({msg :"userName is already taken"});
      }
       // Register the user before validated
       let newAdmin = new Admin({
        name,
        userName,
        password,
        email,
        job_profile
    });
    // Hash the password with bcrypt
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, async(err,hash) => {
            if(err) throw err;
            newAdmin.password = hash;
            await newAdmin.save()         // Important here we save the user
            return res.status(200).json({success: true, message: "Admin is now register!"});         
        });
    });
};
// Login Admin 
adminController.login = async (req,res) => {

    const admin = await Admin.findOne({userName:req.body.userName});
    if(!admin) {
        res.status(400).json({msg: "This userName don't exist", success: false})
    }
// If there is admin we are now going to compare the password
bcrypt.compare(req.body.password, admin.password).then(isMatch => {
    if (isMatch) {
        // Admin's password is correct and we need to send the JSON Token for that admin
        const payload = {
            _id: admin._id,
            userName: admin.userName,
            name: admin.name,
            email: admin.email,
            job_profile: admin.job_profile
        }
        // Here we create the TOKEN
        jwt.sign(payload, key.secret, { expiresIn: 604800}, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                success: true,
                Admintoken: `Bearer ${token}`,
                admin: admin,
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
// Get all Users
adminController.getAllUsers = async (req, res) => {
    
}

// Create new Post
adminController.createPost =  async(req,res) => {
    let admin = await Admin.findById(req.params.adminId);
    if(!admin) {
        res.status(400).json({success: false, msg: "Admin not found"})
    }
    let { image, title, text, comments } = req.body;
    const arrOffWords = await validatorHelper.getOffWords(OffensiveWords); // Find in bd the offWords and return this array
    const checkOffWords = validatorHelper.offWordValidator(text,arrOffWords);
    if(checkOffWords.length > 0) {
        res.status(400).json(`Post contains this offWords : ${checkOffWords}`);
    }else {
        let newPost = new Post({
            author: admin.author,
            userName: admin.userName,
            image,
            title,
            text,
            comments
        });
        await newPost.save();
        res.status(200).json({success: true, message: "Post is create correctly!"});
    }
    
};
// Get a post
adminController.getPost = async(req,res) =>{
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    }
    const post= await Post.findById(req.params.idPost);
    if(!post) {
        res.status(400).json({success: false, message: "Post not found"});
    } else {
        res.status(200).json({success: true, post: post});
    }
};
// Get All Post  without comments
adminController.getAllPost = async(req,res) =>{
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"User not found"});
    } else {
        const posts= await Post.find({},['author','userName','image','title', 'text'])
        if(!posts) {
            res.status(400).json({success: false, message: "The are not Post yet"});
        } else {
            res.status(200).json({success: true, posts: posts});
        }
    }   
};
// Edit a Post
adminController.editPost = async(req,res) => {
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
    const post = await Post.findById(req.params.idPost);
    // Check if post realy exist
    if(!post) {
        res.status(200).json({success: false, message: "Post not found"})
    } else {
    // Check if contains offensive words
    const arrOffWords = await validatorHelper.getOffWords(OffensiveWords); 
    const checkOffWords = validatorHelper.offWordValidator(req.body.text,arrOffWords);
    if(checkOffWords.length > 0) {
        res.status(400).json({success: false, message: `Post contains this offWords!,{${checkOffWords}}`})
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
adminController.deletePost = async(req,res) => {
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
    const post = await Post.findOne({_id : req.params.idPost});
    if(!post) {
        res.status(400).json({success: false, message: "Post not found"});
    } else {
        await post.remove();
        res.status(200).json({success: true, message: "Post delete correctly"});
    }
};

// Create a Comment
adminController.createComment = async(req,res) => {
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
    const {text} = req.body;
    const arrOffWords = await validatorHelper.getOffWords(OffensiveWords); 
    const checkOffWords = validatorHelper.offWordValidator(text,arrOffWords);
    if(checkOffWords.length > 0) {
        res.status(400).json({success: false, message: `Post contains this offWords!,{${checkOffWords}}`})
    }else{
        const post = await Post.findById(req.params.idPost);
        if(!post){
            res.status(400).json({success: false, message: "Post not found"});
        } else {
            let newComment = new Comment({
                userName:admin.userName,
                text,
                email:admin.email
                });
                const comment = await newComment.save(); 
                post.comments.push({userName:admin.userName,comment: text});
                await post.save();
                res.status(200).json({success: true, message: "Comment is create correctly!"})
        }  
    }
    
    
};
// Update Comment
adminController.editComment = async(req,res) => {
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
    const arrOffWords = await validatorHelper.getOffWords(OffensiveWords); 
    const checkOffWords = validatorHelper.offWordValidator(req.body.text,arrOffWords);
    if(checkOffWords.length > 0) {
        res.status(400).json({success: false, message: `Post contains this offWords!,{${checkOffWords}}`})
    }else{
        const comment = await Comment.findOne({_id : req.params.idComment});
        //const post = await Post.findById(req.params.idPost); !! TAREA hacer que se borre tmb en la entrada
        if(!comment) {
            res.status(400).json({success: false, message: "Comment not found"});
        } else {
            const editComment = {
                text: req.body.text,
            };
            await Comment.updateOne({_id: req.params.idComment}, {
                $set: editComment
            });
            res.status(200).json({success: true, message: "Comment edit correctly"})
        }
    }
    
}
// Delete a Commen
adminController.deleteComment = async(req,res) => {
       
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
    const comment = await Comment.findOne({_id : req.params.idComment});
    if(!comment) {
        res.status(400).json({success: false, message: "Comment not found"});
    } else {
        await comment.remove();
        const postComment = await Post.findById(req.params.idPost);
        
        postComment.comments.forEach((element,index) => {
            
            if(element.commentId == req.params.idComment){
                postComment.comments.splice(index,1)
                console.log("element.commentId",element.commentId);
                console.log("req.params.idComment",req.params.idComment);
            }
        });
        await postComment.save();
       
        res.status(200).json({success: true, message: "Comment delete correctly"});
    }
}

// Create an OffensiveWord
adminController.createWord = async(req,res) => {
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
    let {word, level} = req.body;
    const offensiveWord = await OffensiveWords.findOne({word:word});
    if(offensiveWord){
        res.status(400).json({success: false, message: "Word already exist"});
    } else {
        let newOffensiveWord = new OffensiveWords({
            word,
            level
            });
            await newOffensiveWord.save(); 
            res.status(200).json({success: true, message: "OffensiveWord is create correctly!"})
    }
    
};
// Get All OffensiveWords
adminController.getAllOffWords = async(req,res) => {
    const admin = await Admin.find({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
    const offensiveWord = await OffensiveWords.find({});
    if(!offensiveWord) {
        res.status(400).json({success: false, message: "Words not found"});
    }else {
        res.status(200).json({success: true,msg: offensiveWord});
    }
};
// Get an OffensiveWord
adminController.getWord = async(req,res) => {
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
    const offensiveWord = await OffensiveWords.findOne({_id : req.params.idOffensiveWord});
    if(!offensiveWord) {
        res.status(400).json({success: false, message: "Word not found"});
    }else {
        res.status(200).json({success: true,msg: offensiveWord});
    }
};
// Edit an OffensiveWord
adminController.editWord = async(req,res) => {
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
    const offensiveWord = await OffensiveWords.findOne({_id : req.params.idOffensiveWord});
    if(!offensiveWord) {
        res.status(400).json({success: false, message: "Word not found"});
    } else {
        const newOffWord = {
            word: req.body.word,
            level: req.body.level
        };
        await OffensiveWords.updateOne({_id: req.params.idOffensiveWord}, {
            $set: newOffWord
        });
        res.status(200).json({success: true, message: "Word edit correctly"})
    } 
};
// Delete an OffensiveWord
adminController.deleteWord = async(req,res) => {
    const admin = await Admin.findOne({_id:req.params.adminId});
    if(admin == null) {
        res.status(400).json({success:false, msg:"Admin not found"});
    } 
const offensiveWord = await OffensiveWords.findOne({_id : req.params.idOffensiveWord});
if(!offensiveWord) {
    res.status(400).json({success: false, message: "OffensiveWord not found"});
} else {
    await offensiveWord.remove();
    res.status(200).json({success: true, message: "OffensiveWord delete correctly"});
}

}

module.exports = adminController;
