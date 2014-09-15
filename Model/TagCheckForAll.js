var oracle =  require("oracle");
var DBconnection = require("./OracleDB")

function query_db(req, res, objectID, sourceID) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("select t.tag from Tag t where t.objectID =  '" + objectID + 
	  		"' and t.sourceID =  '" + sourceID + "'", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log('Im here');
	  	    if ( err ) {
	  	    	console.log(err);
	  	    	res.send({state:false});
	  	    } else {
	  	    		connection.close(); // done with the connection
	  	    		//do something
	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res, objectID, sourceID){
	query_db(req, res, objectID, sourceID);
};