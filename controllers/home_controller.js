// module.exports.home = function(req,res){
//     return res.end('<h1>Express is up for Codeial!</h1>');
// }
module.exports.home = function(req,res){
   /* console.log(req.cookies);
    res.cookie('user_id',25);
    return res.render('home',{
        title : 'Home'
    });*/
    if(req.isAuthenticated()){
        return res.render('home',{
            title : 'Home'
        });
    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}