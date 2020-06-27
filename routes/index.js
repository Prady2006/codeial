const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

const postController = require('../controllers/posts_controller');
console.log('router loaded');


router.get('/', homeController.home);
// router.use('/posts',require('./posts'))

// router.post('/', postController.post); //  this one
// if i post anything to '/' it will be handled by postcontroller 
// is it wrong ?

router.use('/users', require('./users'));
router.use('/posts',require('./posts'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;
//you have not created a route for posts
// i have created broo 

//is this sa separate route ?
// yeah broo see 
// open browser

