const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public');


// Get a Post 
router.get('/post/:idPost',publicController.getPost);

// Get All Post from AllUsers without comments for home's view
router.get('/posts', publicController.getAllPost);

// Get Statistics
router.get('/posts/statistics',publicController.getStatistics);

// Get Most Popular posts
router.get('/posts/popular', publicController.mostPopularPost )

module.exports=router;