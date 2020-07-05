const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersapi = require('../../../controllers/api/v1/users_api');

router.post('/create-session', passport.authenticate('jwt',{session: false}), usersapi.createSession);

module.exports = router