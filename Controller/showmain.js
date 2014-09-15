var readimage = require("../Model/IndivdualCheck");
var loadboards = require("../Model/BoardCheck");

function showmain(req, res, name, results){
	res.render('individualpage.jade',
		   { title: name,
		     results: results }
	  );
}
function imageupdate(req, res, name, results){
	res.send(results);
}

// This function is used to read relative url from database
exports.do_work = function(req, res, name, results){
	// console.log("Here is in login.js");
	loadboards.load_board(req, res);
	// readimage.do_work(req, res);
};

// This function is used to generate view
exports.view = function(req, res, name, results){
	if(req.session.firstload == 0){
		showmain(req, res, name, results);
		req.session.firstload = 1;
	}else{
		imageupdate(req, res, name, results);
	}
};

// This function is pushing all the boardname to the frontend
exports.view_push_board = function(req, res, name, results){
	showmain(req, res, name, results);
};