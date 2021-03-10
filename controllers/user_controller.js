// module.exports.profile = function(req,res){
//     return res.end('<h1>Users Profile !!</h1>');
// }
// module.exports.post = function(req,res){
//     return res.end('<h1>Users Post !!</h1>');
// }
//Import the user model from the models folder
const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('users',{
        title : "Users profile"
    });
}
module.exports.post = function(req,res){
    return res.render('users',{
        title : "Users Post"
    });
}

//render the sign up page 
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    });
}

//render the sign in page 
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email} , function(err,user){
        if(err){ console.log('error in finding user in signing up'); return }

        if(!user){
            User.create(req.body , function(err,user){
                if(err){  console.log('error in finding user in signing up');return }

                return res.redirect('/users/sign_in');
            });
        }else {
            return res.redirect('back');
        }

    });
}

//Sign in and create a session for the user
module.exports.createSession = function(req,res){
    //TODO later
}