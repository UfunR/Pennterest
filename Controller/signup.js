var signup_info = require("../Model/SignupCheck")
var showmain = require("./showmain")

exports.do_work = function(req, res){
	signup_info.do_work(req, res);
};
exports.view = function(req,res, name){
	showmain.do_work(req, res, req.session.userlogin,[]);
};

exports.goback= function(res, title){
  res.render('signup.jade', { 
	  title: title 
  });
};