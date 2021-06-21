// module.exports.home = function(req,res){
//     return res.end('<h1>Express is up for Codeial!</h1>');
// }
const Post = require('../models/post');
const User = require('../models/user');

//using async await 
module.exports.home = async function(req,res){

  try {
    //populate the user of each post
    //CHANGE :: populate the likes of each post and comment
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path : 'comments',
        populate: {
          path :'user'
        },
        populate:{
          path :'likes'
        }
   }).populate('likes');
 
   let users = await User.find({});
 
   return res.render('home',{
    title : 'Codeial | Home',
    posts: posts,
    all_users: users
    });
  } catch (err) {
    console.log('Error',err);
  }
}


//before we were using async await
// module.exports.home = function(req,res){
//     // console.log(req.cookies);
//     // res.cookie('user_id',25);

//     //here we can only access the user id stored in our posts user , but by populating user we can access whole user object
//     // Post.find({},function(err,posts){
//     //     return res.render('home',{
//     //         title : 'Codeial | Home',
//     //         posts: posts
//     // });
//     //Populate the user of each post 
//     Post.find({})
//     .populate('user')
//     .populate({
//       path : 'comments',
//       populate: {
//         path :'user'
//       }
//     })
//     .exec(function(err,posts){

//       User.find({},function(err,users){
//         return res.render('home',{
//           title : 'Codeial | Home',
//           posts: posts,
//           all_users: users
//       });
        
//     });
//   });
//     // if(req.isAuthenticated()){
//     //     return res.render('home',{
//     //         title : 'Home'
//     //     });
//     // }

//     // return res.render('user_sign_in',{
//     //     title: "Codeial | Sign In"
//     // });
// }


//using then 
//Post.find({}).populate('comments').then(function());

//using promise
// let posts = Post.find({}).populate('comments').exec();
//posts.then();