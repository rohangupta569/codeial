const nodeMailer = require('../config/nodemailer');


//this is another way of exporting a method
exports.newComment = (comment) => {
    //console.log('Inside newComment mailer');
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'rohanwebd2021@gmail.com',
        to: comment.user.email ,
        subject : 'New comment published',
        //html : '<h1> Yup, your comment is now published! </h1>'
        html: htmlString
    } , (err , info) =>{
        if(err){console.log('Error in sending mail',err); return ;}

        console.log('Message sent', info);
        return;
    });
}