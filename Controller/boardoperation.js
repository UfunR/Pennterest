var create_new_board = require('../Model/CreateNewBoard');
var load_images_from_board = require('../Model/IndivdualCheck');

exports.create_board = function(req,res){
	// console.log('Information from "boardoperation.js"');
	// console.log(req.session.userlogin);
	// console.log(req.body.boardName);
	// console.log(req.body);
	create_new_board.do_work(req,res,req.session.userlogin,req.body.boardName);
}

exports.read_images = function(req,res){
	load_images_from_board.do_work(req,res,req.body.boardname);
}

exports.return_images = function(req,res,bname,result){
	res.send({boardname:bname,results:result});
}