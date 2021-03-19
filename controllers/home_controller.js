// module.exports.home = function(req,res){
//     return res.end('<h1>Express is up for Codeial!</h1>');
// }
const Post = require('../models/post');
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    //here we can only access the user id stored in our posts user , but by populating user we can access whole user object
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title : 'Codeial | Home',
    //         posts: posts
    // });
    //Populate the user of each post 
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title : 'Codeial | Home',
            posts: posts
    });
  });
    // if(req.isAuthenticated()){
    //     return res.render('home',{
    //         title : 'Home'
    //     });
    // }

    // return res.render('user_sign_in',{
    //     title: "Codeial | Sign In"
    // });
}