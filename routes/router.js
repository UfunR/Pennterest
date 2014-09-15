var index_page = require('../Controller');
var login_check = require('../Controller/login');
var signup_check = require('../Controller/signup');
var pin = require('../Controller/pin');
var search = require('../Controller/basicsearch');
var board = require('../Controller/boardoperation');
var mainpage = require("../Controller/showmain");
var mongoRead = require("../Controller/MongoRead");
var mongoSaveLarge = require("../Controller/MongoSaveLarge");
var rateAdd = require("../Model/RateAdd");
var friendRead = require("../Model/FriendRead");

var rateRead = require("../Model/RateRead");
var rateUpdate = require("../Model/RateUpdate");
var reconmmendation = require("../Model/RecommendationCheck");


exports.postRequest = function(req, res){
  if (req.body.submitButton == 'Login') {
  		login_check.do_work(req, res);
  };
  // else if(req.query.submitButton == 'Show movies'){
  // 		movie.do_work(req, res);
  // };
  // else{

  // };
};
exports.getRequest = function(req, res){};

exports.signupRequest = function(req, res) {
	if (req.body.login == '') {
		console.log('Please enter login');
		signup_check.goback(res, "Please enter login");
	} 
	else if (req.body.password == '') {
		console.log('Please enter password');
		signup_check.goback(res, "Please enter password");
	} 
	else if (req.body.email == '') {
		console.log('Please enter email');
		signup_check.goback(res, "Please enter email");
	} 
	else if (req.body.givenname == '') {
		console.log('Please enter givenname');
		signup_check.goback(res, "Please enter givenname");
	} 
	else if (req.body.surname == '') {
		console.log('Please enter surname');
		signup_check.goback(res, "Please enter surname");
	} 
	else if (req.body.affiliation == '') {
		console.log('Please enter affiliation');
		signup_check.goback(res, "Please enter affiliation");
	} 
	else if (req.body.birthday == '') {
		console.log('Please enter birthday');
		signup_check.goback(res, "Please enter birthday");
	} 
	else if (req.body.password != req.body.password2) {
		signup_check.goback(res, "The passwords you entered do not match. Please re-enter your passwords");
	} 
	else {
		var day = req.body.birthday.substring(8,10);
		var month = req.body.birthday.substring(5,7);
		var year = req.body.birthday.substring(0,4);
		req.body.birthday = day+"/"+month+"/"+year;
		console.log(req.body.birthday);
		signup_check.do_work(req,res);
	}
};

exports.readBoadNames = function(req, res){
	console.log(req.body);
	pin.check_board(req,res);
};
exports.readMoreImages = function(req,res){
	console.log("loading more images");
};
exports.realPin = function(req,res){
	console.log(req.body);
	pin.do_pin(req,res);
};
exports.doSearch = function(req,res){
	search.do_work(req,res);
}
exports.createBoard = function(req,res){
	board.create_board(req,res);
}

exports.returnHome = function(req,res){
	// console.log('Router:'+req.session.userlogin);
	req.session.firstload = 0;
	mainpage.do_work(req, res, [], []);
}

exports.logOut = function(req,res){
	req.session.destroy();
	index_page.do_work(req,res,[]);
}

exports.showimagefrommongo = function(req,res){

    mongoRead.do_work(req,res, parseInt(req.query.objectid, 10));

}

exports.loadBoard = function(req,res){
	board.read_images(req,res);
}

exports.rateCheck = function(req, res) {
	var rateUserID = req.session.userlogin
	rateRead.do_work(req, res, req.body.rate_objectID, req.body.rate_sourceID, req.session.userlogin);

}

exports.rateUpdate = function(req, res) {
	var rateUserID = req.session.userlogin
	rateUpdate.do_work(req, res, req.body.rate_objectID, req.body.rate_sourceID, req.session.userlogin, req.body.rate_value);

}

exports.rateit = function(req,res){
    var rateUserID = req.session.userlogin
    rateAdd.do_work(req, res, req.body.rate_objectID, req.body.rate_sourceID, req.session.userlogin, req.body.rate_value);
}

exports.returnFriend = function(req,res){
	friendRead.do_work(req, res);
}

exports.reconmmendation = function (req, res) {
	reconmmendation.do_work(req, res);
}
