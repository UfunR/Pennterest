var oracle =  require("oracle");
var DBconnection = require("./OracleDB")

function query_db(req, res, login, boardName, pr) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("INSERT INTO board VALUES('"+ login + "','" + boardName + "'," + pr + ",'"+req.body.boardDescription[0]+"')", 
	  			   [], 
	  			   function(err, results) {
	  	    if ( err ) {
	  	    	console.log(err);
	  	    	res.send({state:false});
	  	    } else {
	  	    		connection.close(); // done with the connection
	  	    		//do something
	  	    		res.send({state:true});
	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res, login, boardName){
	console.log(req.body);
	var boardPrivateState;
	if (req.body.radio=='public') {
		boardPrivateState = 0;
		console.log('public board');
	}else{
		boardPrivateState = 1;
		console.log('private board');
	}
	query_db(req, res, login, boardName, boardPrivateState);
};