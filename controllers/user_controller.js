// module.exports.profile = function(req,res){
//     return res.end('<h1>Users Profile !!</h1>');
// }
// module.exports.post = function(req,res){
//     return res.end('<h1>Users Post !!</h1>');
// }
//Import the user model from the models folder
const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id , function(err,user){
            if(user){
                return res.render('user_profile',{
                    title :'User Profile',
                    user : user
                })
            }
            else{
                 return res.redirect('/users/sign_in');
            }
        });
    }
    else 
    {
        return res.redirect('/users/sign_in');
    }
}
module.exports.post = function(req,res){
    return res.render('user_profile',{
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
    //steps to authenticate
   //find the user 

   User.findOne({email : req.body.email} , function(err,user){
       if(err){ console.log('error in finding user in signing in'); return }

       //handle user found 
       if(user){
           //handle password which doesnt match
           if(user.password != req.body.password){
               return res.redirect('back');
           }

           //handle session creation
           res.cookie('user_id' , user.id);
           return res.redirect('/users/profile');

       }
       //handle user not found 
       else{
           return res.redirect('back');
       }

   });

}

//sign out the session 
module.exports.signOut = function(req,res)
{
   res.cookie('user_id' , 0);
   return res.redirect('back');
}