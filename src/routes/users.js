const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users');
const path = require('path');
const commentController = require('../controllers/comments');
const User = require('../models/Users');
const fs = require('fs-extra');

// Create User
router.post('/users/register', usersController.create);

// Login User
router.post('/users/login', usersController.login);

// Return User's Data (Private Route) => protegemos la ruta con el middleWare passport que comprueba que hay token
router.get('/users/profile', passport.authenticate('jwt', { session: false}), (req, res) => {
    return res.json({
        user: req.user
    });
});
// Get user by id
router.get('/users/:userId',async(req,res) =>{
    const user = await User.findById(req.params.userId);
    if(!user) {
        res.status(400).json({success: false, msg: "User not found"})
    }
    res.status(200).json({success:true, user: user})
});

// Create a Post
router.post('/users/createpost', passport.authenticate('jwt', { session: false}),usersController.createPost);
// Get a Post 
router.get('/users/:userId/post/:idPost',passport.authenticate('jwt', { session: false}),usersController.getPost);
// Get All Post from AllUsers without comments for home's view
router.get('/users/:userId/posts', usersController.getAllPost);
// Get All Post from User without comments
router.get('/users/:userId/post',passport.authenticate('jwt', { session: false}), usersController.getAllUserPost);
// Edit a Post
router.put('/users/:userId/post/:idPost',passport.authenticate('jwt', { session: false}),usersController.editPost);
// Delete a Post
router.delete('/users/:userId/post/:idPost',passport.authenticate('jwt', { session: false}),usersController.deletePost);

// Create a comment
router.post('/users/post/:idPost/comment',passport.authenticate('jwt', { session: false}), commentController.createComment);

// Add a like
router.post('/users/post/:idPost/like',passport.authenticate('jwt', { session: false}),usersController.addLike)

// Upload Image
router.post('/upload', async(req,res) => {
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/uploads/${req.file.originalname}`);
    if (ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.gif') {
        await fs.rename(imageTempPath, targetPath);
    };
    await fs.unlink(imageTempPath);
    res.json({msg:"Upload Ok"})
});
// User Statistics
router.get('/users/:id/Statistics', passport.authenticate('jwt', { session: false}),usersController.getUserStatistics)
module.exports = router;