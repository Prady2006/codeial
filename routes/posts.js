const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/post', passport.checkAuthentication, postsController.post);


module.exports = router;
// wait broo 
