var oracle =  require("oracle");
var DBconnection = require("./OracleDB")
var pin = require("./Pin")

function query_db(req, res, objectID, sourceID, url) {
	console.log(objectID);
	console.log(objectID);
	console.log(sourceID);
	console.log(url);
	objectID++;
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("INSERT INTO Object VALUES("+ objectID + ",'" + sourceID + "','" + url + "','" + 0 +"')", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log('Im here');
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    	    connection.execute("INSERT INTO ObjectClass VALUES("+ objectID + ",'" + sourceID + "','" + "photo" + "')",
	  	    	    	[], 
		  			   function(err, results1) {
		  			   // console.log('Im here');
				  	    if ( err ) {
				  	    	console.log(err);
				  	    } else {
				  	    		connection.execute("INSERT INTO Tag VALUES("+ objectID + ",'" + sourceID + "','" + "noTags" + "')",
					  	    	    	[], 
						  			   function(err, results1) {
						  			   // console.log('Im here');
								  	    if ( err ) {
								  	    	console.log(err);
								  	    } else {
					  	    		connection.close(); // done with the connection
					  	    		//do something
					  	    		req.body.objID = objectID;
					  	    		req.body.souID = sourceID;
					  	    		pin.do_work(req,res);
					  	    	}
					  	      }
					  	    );
	  	    
	  	    	}
	  	      }
	  	    );
	  	  }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res, objectID, sourceID, url){
	query_db(req, res, objectID, sourceID, url);
};