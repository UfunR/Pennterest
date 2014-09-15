var oracle =  require("oracle");
var DBconnection = require("./OracleDB")
var loginController = require("../Controller/login");
// var showmain = require("../Controller/showmain");

function query_db(req, res, login, password) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("update users set password  = '"+ password +"' where login = '" + login + "'", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log('Im here');
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    		connection.close(); // done with the connection
	  	    		req.session.userlogin = login;
	  	    		req.session.firstload = 0;
	  	    		// console.log("Here is in LoginCheckForNoPass.js");
	  	    		loginController.view(req, res, login, []);
	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res, login, password){
	query_db(req, res, login, password);
};