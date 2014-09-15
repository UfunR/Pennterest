var oracle =  require("oracle");
var DBconnection = require("./OracleDB")

function query_db(req, res, objectID, sourceID, tag) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("INSERT INTO Tag VALUES("+ objectID + ",'" + sourceID + "','" + tag + "')", 
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

exports.do_work = function(req, res, objectID, sourceID, tag){
	query_db(req, res, objectID, sourceID, tag);
};