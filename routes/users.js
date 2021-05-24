const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
const User = require('../models/user');


router.get('/profile/:id', passport.checkAuthentication ,userController.profile);
router.post('/update/:id', passport.checkAuthentication ,userController.update);
// router.get('/post',passport.checkAuthentication,userController.post); created posts route seprately 
router.get('/sign_in',userController.signIn);
router.get('/sign_up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign_out',userController.destroySession);

//use passport as a middleware to authenticate 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign_in'}
), userController.createSession);


router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign_in'}), userController.createSession);



module.exports = router ;