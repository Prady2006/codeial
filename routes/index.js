const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

const postController = require('../controllers/posts_controller');
console.log('router loaded');


router.get('/', homeController.home);
// router.use('/posts',require('./posts'))

// router.post('/', postController.post); 

router.use('/users', require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments', require('./comment'));

// for api different routes 
router.use('/api', require('./api'));

module.exports = router;
