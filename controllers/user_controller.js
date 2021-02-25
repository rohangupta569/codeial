// module.exports.profile = function(req,res){
//     return res.end('<h1>Users Profile !!</h1>');
// }
// module.exports.post = function(req,res){
//     return res.end('<h1>Users Post !!</h1>');
// }
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