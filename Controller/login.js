var login_info = require("../Model/LoginCheck");
var mainpage = require("./showmain");

// function enter_to_main(res,name,results) {
// 	res.render('individualpage.jade',
// 		   { title: "Welcome " + name,
// 		     results: results }
// 	  );
// }

exports.do_work = function(req, res){
	login_info.do_work(req, res);
};
exports.view = function(req, res, name, results){
	// enter_to_main(res, name, results);
	// console.log("Here is in login.js");
	mainpage.do_work(req, res, name, results)
};
