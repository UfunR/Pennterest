var oracle =  require("oracle");
var DBconnection = require("./OracleDB")
var showmainpage = require("../Controller/showmain");
// var showmainpage = require("../Controller/showmain");

function query_db(req, res) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("SELECT b.boardName FROM Board b WHERE b.userID =  '" + req.session.userlogin + "'", 
	  			   [], 
	  			   function(err, results) {
	  			   //console.log(results);
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    		connection.close(); // done with the connection

	  	    		// control.view(res, login);
	  	    		console.log(results);
	  	    		res.send(results);
	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

function query_db_call_view(req, res) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("SELECT b.boardName FROM Board b WHERE b.userID =  '" + req.session.userlogin + "'", 
	  			   [], 
	  			   function(err, results) {
	  			   //console.log(results);
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    		connection.close(); // done with the connection

	  	    		// control.view(res, login);
	  	    		console.log(results);
	  	    		// res.send(results);
	  	    		showmainpage.view_push_board(req, res, req.session.userlogin, results);
	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res){
	query_db(req, res);
};

exports.load_board = function(req,res){
	query_db_call_view(req, res);
};