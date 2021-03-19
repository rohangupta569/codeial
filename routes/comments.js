const express = require('express');
const router = express.Router();
const Passport = require('passport');

const commentController = require('../controllers/comments_controller');

router.post('/create',Passport.checkAuthentication,commentController.create);

module.exports = router;