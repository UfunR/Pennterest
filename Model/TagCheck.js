var oracle =  require("oracle");
var DBconnection = require("./OracleDB")

function query_db(req, res, results) {

	var newResults = [];
	// newResults[0] = results[0];
	var newResultsIndex = 0;
	
	for (var inx = 0; inx < results.length; inx++) {
		// newResults[inx] = results[inx]; 
		var flag = 0;
		for(var index = 0; index < newResults.length; index++) {
			if (results[inx].OBJECTID == newResults[index].OBJECTID && results[inx].SOURCEID == newResults[index].SOURCEID) {
				newResults[index].TAG = newResults[index].TAG + ", " + results[inx].TAG; 
				flag = 1;
			}
		}

		if(!flag) {
			newResults[newResultsIndex] = results[inx];
			newResultsIndex += 1;
		}
	}
	// console.log(results);
	// console.log('111111111');
	// console.log(newResults);
}

exports.do_work = function(req, res, results){
	query_db(req, res, results);
};

  // oracle.connect(DBconnection.DBinfo, function(err, connection) {
  //   if ( err ) {
  //   	console.log(err);
  //   } else {
	 //  	// selecting rows
	 //  	connection.execute("SELECT t.tag FROM Tag t WHERE t.objectID =  '" + objectID + "' and t.sourceID = '" + sourceID + "'", 
	 //  			   [], 
	 //  			   function(err, results) {
	 //  			   // console.log(results);
	 //  	    if ( err ) {
	 //  	    	console.log(err);
	 //  	    } else {
	 //  	    		connection.close(); // done with the connection
	 //  	    		for (var inx = 0; inx < results.length; inx++) {
	 //  	    			if (inx + 1 < results.length) {
	 //  	    				results[0].TAG = results[0].TAG + results[inx].TAG; 
	 //  	    			}
	 //  	    		}
	 //  	    		console.log(results[0].TAG);
	 //  	    		return results[0].TAG;
	 //  	    }
	
	 //  	}); // end connection.execute
  //   }
  // }); // end oracle.connect