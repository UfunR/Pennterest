var oracle =  require("oracle");
var DBconnection = require("./OracleDB")

function query_db(req, res, objectID, sourceID, userID) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("select r.rating from Rating r WHERE r.objectID = "+ objectID + "and r.sourceID = '" + sourceID + "'and r.userID = '" + userID + "'", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log('Im here');
	  	    if ( err ) {
	  	    	console.log(err);
	  	    	res.send({state:false});
	  	    } else {
	  	    		connection.close(); // done with the connection
	  	    		//do something
	  	    		console.log('Sending Rate result');
	  	    		console.log(results);
	  	    		res.send({result: results});

	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res, objectID, sourceID, userID){
	query_db(req, res, objectID, sourceID, userID);
};