const nodeMailer = require('../config/nodemailer');

exports.reset_mail = function(reset){
    console.log('inside reset_mailer.js beginning : ', reset );
    let htmlString = nodeMailer.renderTemplate({reset:reset},'/comments/reset_mail.ejs');
    // console.log('inside reset_mailer.js :',reset);
    nodeMailer.transporter.sendMail({
        from: 'sharmaabhilashaa20.16@gmail.com',
        to: reset.user.email,
        subject: "Reset Email",
        html: htmlString
     }, (err, info) => {
         if (err){
             console.log('Error in sending mail', err);
             return;
         }
 
         console.log('Reset mail send ', info);
         return;
     });
}