var oracle =  require("oracle");
var DBconnection = require("./OracleDB")
var friends = require("../Controller/friends")

function query_db(req, res, login) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("select f.following from Friend f where f.userID =  '" + login + "'", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log('Im here');
	  	    if ( err ) {
	  	    	console.log(err);
	  	    	res.send({state:false});
	  	    } else {
	  	    		connection.close(); // done with the connection
	  	    		//do something
	  	    		// res.send(results);
	  	    		friends.view(req,res,results);
	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res){
	query_db(req, res, req.session.userlogin);
};