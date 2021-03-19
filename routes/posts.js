const express = require('express');
const router = express.Router();
const Passport = require('passport');

const postController = require('../controllers/posts_controller');

router.post('/create',Passport.checkAuthentication,postController.create);

module.exports = router;