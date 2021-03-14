const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');


router.get('/profile', passport.checkAuthentication ,userController.profile);
router.get('/post',passport.checkAuthentication,userController.post);
router.get('/sign_in',userController.signIn);
router.get('/sign_up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign_out',userController.destroySession);

//use passport as a middleware to authenticate 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign_in'}
), userController.createSession);

module.exports = router ;