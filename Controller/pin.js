var borad_check = require('../Model/BoardCheck');
var pin_execution = require('../Model/Pin');
var new_object = require('../Model/CreateNewObjectsWithMaxObjectID');

exports.check_board = function(req,res){
	borad_check.do_work(req, res);
}
exports.do_pin = function(req,res){
	// console.log('Information From "pin.js"');
	// console.log(req.body.bname);
	if (req.body.objID == 0) {
		// console.log('Information From "pin.js"');
		// console.log('add new item');
		new_object.do_work(req, res, 'phantom', req.body.imageurl);
	}else{
		pin_execution.do_work(req, res);
	}
}