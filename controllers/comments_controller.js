const Comment = require('../models/comment');
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

//using async await 
module.exports.create = async function(req,res){
    try {
        let post = await Post.findById(req.body.post);

      if(post){
        let comment = await Comment.create({
            content: req.body.content,
            post : req.body.post,
            user: req.user._id
        });
        post.comments.push(comment);
        post.save();

        comment = await comment.populate('user', 'name email').execPopulate();
        //commentsMailer.newComment(comment);
        let job = queue.create('emails', comment).save(function(err){
            if(err){
                console.log('Error in sending to the queue',err);
                return;
            }
            console.log('job enqueued',job.id);
        });
        if (req.xhr){
            // Similar for comments to fetch the user's id!
           // comment = await comment.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Post created!"
            });
        }

        req.flash('success','Comment Published!');
        res.redirect('/');
      } 
    } catch (err) {
        //console.log('Error',err);
        //return ;  
        req.flash('error','You cannot comment on this post!');
        res.redirect('back');
    }
}

// module.exports.create = function(req,res){
//     Post.findById(req.body.post , function(err,post){

//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post : req.body.post,
//                 user: req.user._id
//             },function(err,comment){
//                 if(err){console.log('error in commenting '); return;}

//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }
//     });
// }

module.exports.destroy = async function(req,res){
    try {
        let comment =  await Comment.findById(req.params.id);
        if(comment.user == req.user.id){

            let postId = comment.post;

            Comment.remove();

            let post = await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});

            //CHANGE :: destroy the asscoiated likes for this comment
            await Like.deleteMany({likeable :comment._id, onModel: 'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            
            req.flash('success','Comment deleted!');
            return res.redirect('back');
        }else{
            req.flash('error','Comment cannot be deleted by you!');
            return res.redirect('back');
        }  
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
        //console.log('Error',err);
        //return ; 
    }
}

// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id, function(err,comment){
//         if(comment.user == req.user.id){

//             let postId = comment.post;

//             Comment.remove();

//             Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,comment){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }