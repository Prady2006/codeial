const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');



let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'novella45@ethereal.email',
        pass: 'bFh1qZQkkMTUW5KR2q'
    }
});

let renderTemplate = (data , relativePath)=>{
    let mailHtml; 
    ejs.renderFile(
        path.join(__dirname , '../views/mailers' , relativePath ),
        data ,
        function(err, template ){
            if(err){
                console.log('error in rendering template in mail ');
                return ;
            }
            mailHtml = template 
        }
    );
    return mailHtml ;
}

module.exports = {
    transporter: transporter ,
    renderTemplate : renderTemplate 
}