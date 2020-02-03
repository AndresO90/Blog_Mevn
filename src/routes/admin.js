const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/admin');

// Create Admin
router.post('/admin/register', adminController.create);

// Login Admin
router.post('/admin/login', adminController.login);

router.get('/admin/profile', passport.authenticate('jwt', { session: false}), (req, res) => {

    return res.json({
        admin: req.user
    });
});

// Create a Post
router.post('/admin/:adminId/post', passport.authenticate('jwt', { session: false}),adminController.createPost);
// Get a post
router.get('/admin/:adminId/post/:idPost',adminController.getPost);
// Get All Post
router.get('/admin/:adminId/post/',adminController.getAllPost);
// Edit a Post
router.put('/admin/:adminId/post/:idPost',passport.authenticate('jwt', { session: false}),adminController.editPost);
// Delete a Post
router.delete('/admin/:adminId/post/:idPost',passport.authenticate('jwt', { session: false}),adminController.deletePost);


// Create a Comment
router.post('/admin/:adminId/post/:idPost/comment',passport.authenticate('jwt', { session: false}), adminController.createComment);
// Update Comment
router.put('/admin/:adminId/post/:idPost/comment/:idComment',passport.authenticate('jwt', { session: false}), adminController.editComment);
// Delete a Comment
router.delete('/admin/:adminId/post/:idPost/comment/:idComment',passport.authenticate('jwt', { session: false}), adminController.deleteComment);


// Create an OffensiveWord
router.post('/admin/:adminId/offword', adminController.createWord);
// Get a OffensiveWord
router.get('/admin/:adminId/offword/:idOffensiveWord', adminController.getWord);
// Get All OffensiveWords
router.get('/admin/:adminId/offwords',adminController.getAllOffWords)
// Edit OffensiveWord
router.put('/admin/:adminId/offword/:idOffensiveWord', adminController.editWord);
// Delete a OffensiveWord
router.delete('/admin/:adminId/offword/:idOffensiveWord', adminController.deleteWord);

module.exports = router;