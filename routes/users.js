const express = require('express');
const { user } = require('../config/mongoose');
const router = express.Router();
const userController = require('../controllers/user_controller');


router.get('/profile',userController.profile);
router.get('/post',userController.post);
router.get('/sign_in',userController.signIn);
router.get('/sign_up',userController.signUp);
router.post('/create',userController.create);
router.post('/create-session',userController.createSession);
router.post('/sign_out',userController.signOut);

module.exports = router ;