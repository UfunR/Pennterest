var oracle =  require("oracle");
var DBconnection = require("./OracleDB")
var showmainpage = require("../Controller/showmain");
var tagQuery = require("../Model/TagCheck");
var mongoRead = require("../Controller/MongoRead");
var mongoSaveLarge = require("../Controller/MongoSaveLarge");
var boardOP = require("../Controller/boardoperation");
// var mGlobal;

function query_db(req, res, boardName) {
	
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("select URL, COUNTS, TYPE, OBJECTID, SOURCEID, BOARDNAME, RATING, TAG from(SELECT URL, COUNTS, TYPE, OBJECTID, SOURCEID, BOARDNAME, RATING FROM ( SELECT o.url as URL, o.counts as COUNTS, oc.type as TYPE, o.objectID as OBJECTID, o.sourceID as SOURCEID, p.boardName as BOARDNAME FROM Pin p, Object o, ObjectClass oc WHERE p.userID =  '" + req.session.userlogin + "' and p.objectID = o.objectID and p.sourceID = o.sourceID and oc.objectID = o.objectID and oc.sourceID = o.sourceID and p.boardName = '" + boardName + "') LEFT JOIN ( SELECT r.objectID as OBJECTID2, r.sourceID as SOURCEID2, r.rating as RATING FROM Rating r ) ON OBJECTID = OBJECTID2 and SOURCEID = SOURCEID2) LEFT JOIN (select t.tag as TAG, t.objectID as tObjectID, t.sourceID as tSourceID from Tag t) ON tObjectID = OBJECTID and tSourceID = SOURCEID", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log(results);
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    		//Divide the results for server and mongo

	  	    		resultsForServer = [];
	  	    		resultsForMongo = [];

	  	    		var indforserver = 0;
	  	    		var indformongo = 0;
	  	    		
	  	    		for (var inx = 0; inx < results.length; inx++) 
	  	    		{
	  	    			
	  	    			if (results[inx].COUNTS <= 5 ) {
	  	    				resultsForServer[indforserver] = results[inx];
	  	    				indforserver = indforserver + 1;
	  	    			} 
	  	    			else{
	  	    				resultsForMongo[indformongo] = results[inx];
	

	  	    				indformongo = indformongo + 1;
	  	    			}
	  	    		}


	  	    		var inx2 = resultsForServer.length
                    for (var inx = 0; inx < resultsForMongo.length; inx++)
				    {
					      //console.log(resultsForMongo[inx].OBJECTID);
					      resultsForMongo[inx].URL = '/showimage?objectid=' + resultsForMongo[inx].OBJECTID;
					      //console.log(resultsForMongo[inx].URL)
					      resultsForServer[inx2] = resultsForMongo[inx];
					      inx2 = inx2 + 1;
					}

	  	    		//Add back the tags for the results
	  	    		// for (var inx = 0; inx < results.length; inx++) 
	  	    		// {
	  	    		// 	if (inx < (results.length - 1)) {
	  	    		// 		console.log(inx);
	  	    		// 		connection.execute("select t.tag from Tag t where t.objectID = '" + results[inx].OBJECTID + "' and t.sourceID = '" + results[inx].SOURCEID + "'",
			  	    // 	    	[], 
				  			 //    function(err, results1) {
				  			 //   // console.log('Im here');
								  // 	    if ( err ) {
								  // 	    	console.log(err);
								  // 	    } else {
							  	//     		// for (var index = 0; index < results1.length; index++) {
							  	//     		// 	results[inx].TAG = results[inx].TAG + ", " + results1[index].TAG
							  	//     		// }
							  	//     		console.log(inx + 11);
					  	  //   		//do something
						  	 //    	}
						  	 //      }
						  	 //    );

			  	    // 		}

			  	    // 	else {
	  	    		// 		connection.execute("select t.tag from Tag t where t.objectID = '" + results[inx].OBJECTID + "' and t.sourceID = '" + results[inx].SOURCEID + "'",
			  	    // 	    	[], 
				  			 //    function(err, results1) {
				  			 //   // console.log('Im here');
								  // 	    if ( err ) {
								  // 	    	console.log(err);
								  // 	    } else {

								  // 	    	// for (var index = 0; index < results1.length; index++) {
							  	//     		// 	results[inx].TAG = results[inx].TAG + ", " + results1[index].TAG
							  	//     		// }
					  	  //   				connection.close(); // done with the connection
					  	  //   		//do something
						  	 //    	}
						  	 //      }
						  	 //    );

			  	    // 		}
	  	    		// }


	  	    		}
	  	    		console.log('Select pictures');
    					console.log(boardName);
	  	    		console.log(resultsForServer);
							boardOP.return_images(req, res, boardName, resultsForServer);
	  	    		// showmainpage.view(req, res, req.session.userlogin, resultsForServer);
	  	    		// console.log(resultsForServer);
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res, boardName){
	query_db(req, res, boardName);
};