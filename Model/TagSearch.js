// Connect string to Oracle
var oracle =  require("oracle");
var DBconnection = require("./OracleDB");
var search_control = require("../Controller/basicsearch");

/////
// Query the oracle database, and call output_actors on the results
//
// res = HTTP result object sent back to the client
// name = Name to query for
function query_db(req,res,name) {
var str = name;
console.log(str);
var arr = str.split(",");
//arr = arr.map(function (val) { return +val + 1; });
//name=arr[0];
console.log("split here");
console.log(arr);
//name=arr[0];
console.log(arr.length);

//for(i=0;i<arr.length;i++)
//{
//console.log(i);

 oracle.connect(DBconnection.DBinfo, function(err, connection) {

 console.log("output1");
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("SELECT T.objectID,T.sourceID,Ob.url FROM Tag T, Object Ob WHERE tag='" + arr[0] + 
	  			"' AND T.objectID=Ob.objectID AND T.sourceID=Ob.sourceID ", 
	  			   [], 
	  			   function(err, results) {
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    	connection.close(); // done with the connection
				//console.log(results);
	  	    	//search_control.output_result(req, res, name, results);
				 console.log("output2");
				 if (arr.length==1)
				 {search_control.output_result(req, res, name, results);}
				 else
				{merge(req,res,name,results,arr,1);}
				
								
	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
 // } // end the for loop
}



/////

function merge(req,res,name,pre_result,arr,k)
{
//console.log(pre_result);

	search_value=arr[k];
	 oracle.connect(DBconnection.DBinfo, function(err, connection) {

		if ( err ) {
			console.log(err);
		} else {
			// selecting rows
			connection.execute("SELECT T.objectID,T.sourceID,Ob.url FROM Tag T, Object Ob WHERE tag='" + search_value + 
					"' AND T.objectID=Ob.objectID AND T.sourceID=Ob.sourceID ",
	//				"Union"+
	//				"(SELECT Ob.objectID,Ob.sourceID,Ob.url FROM Object Ob where Ob.objectID=pre_result.objectID and Ob.sourceID=pre_result.sourceID)", 
					   [], 
					   function(err, results) {
				if ( err ) {
					console.log(err);
				} else {
				console.log("output4");
					connection.close(); // done with the connection
					//console.log(results);
					//search_control.output_result(req, res, name, results);
					
					var inx2 = pre_result.length;
                    for (var inx = 0; inx < results.length; inx++)
				    {
					      //console.log(resultsForMongo[inx].OBJECTID);
					      //resultsForMongo[inx].URL = '/showimage?objectid=' + resultsForMongo[inx].OBJECTID;
					     // console.log(resultsForMongo[inx].URL)
					      pre_result[inx2] = results[inx];
					      inx2 = inx2 + 1;
					}
					
					//console.log(pre_result);
					
					if (k>=arr.length-1)
					
					{console.log("output5");
					search_control.output_result(req, res, name, pre_result);}
					else
					{merge(req,res,name,pre_result,arr,k+1);}
									
				}
		
			}); // end connection.execute
		}
	  });
	  

}

// This is what's called by the main app 
exports.do_work = function(req, res){
	query_db(req,res,req.query.name);
};