var oracle =  require("oracle");
var DBconnection = require("./OracleDB")
var createNewObject = require("../Model/CreateNewObject")

function query_db(req, res, sourceID, url) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("select max(o.objectID) as OBJECTID from Object o", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log('Im here');
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    		connection.close(); // done with the connection
	  	    		console.log(results);
	  	    		createNewObject.do_work(req, res, results[0].OBJECTID, sourceID, url);
	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res, sourceID, url){
	query_db(req, res, sourceID, url);
};