const crypto = require('crypto');
const Reset = require('../models/reset_token');
const User = require('../models/user');
const nodeMailer = require('../config/nodemailer');
const resetMailer = require('../mailers/reset_mailer');

module.exports.index = function(req ,res ){
    return res.render('user_reset',{
        title: "Codeial | Home"
    });
};


module.exports.reset = async function(req, res){
    
    try {
        console.log(req.body);

        let user = await User.findOne({email: req.body.email}) ;

        if(!user){
            req.flash('error','User not found');
            res.redirect('back');
        }

        let reset = await Reset.create({
            user: user,
            accesstoken: crypto.randomBytes(25).toString('hex'), 
            isValue: true 
        });
        console.log("after reset"  , reset);
        reset =await reset.populate('user','email').execPopulate();

        resetMailer.reset_mail(reset);
        
        console.log("reset value : " , reset);

        return res.render('reset_page_confirmation',{
            title: 'Codeial | Home'
        });
    }catch(err){
        console.log('error in reset controller: ', err);
        return res.redirect('back');
    }
}

module.exports.updateForm = async function(req,res){
    console.log("inside updateForm in reset_controller.js : ",req.params);
    let reset = await Reset.findOne({accesstoken: req.params.accesstoken});
    console.log(reset);
    if(reset && reset.isValue){
        
        reset = await Reset.findOneAndUpdate({accesstoken: req.params.accesstoken},{isValue: false });
        return res.render('user_update',{
            accesstoken: req.params.accesstoken,
            title: "Codeial | Home"
        });
    }
    return res.redirect('/reset');
}


module.exports.update = async function(req,res){
    console.log("inside update method : " , req.params);
    if(req.body.password !== req.body.confirm_password){
        req.flash('error','Password mismatch');
        return res.redirect('back');
    }
    let reset = await  Reset.findOne({accesstoken: req.params.accesstoken}).populate('user');
    await User.findByIdAndUpdate(reset.user , {password: req.body.password} ,{useFindAndModify: false}  );
    await Reset.deleteOne({_id: reset._id});
    
    req.flash('success','Account Updated Successfully');
    res.redirect('/');
}