var oracle =  require("oracle");
var DBconnection = require("./OracleDB")
var control = require("../Controller/login");
var index_page = require("../Controller/index");
var mongoSaveLarge = require("../Controller/MongoSaveLarge")
function query_db(req,res,objID,souID,uID,bname) {
	// console.log('Information from "Pin.js"')
	// console.log('in the query');
	// console.log(objID);
	// console.log(souID);
	// console.log(uID);
	// console.log(bname);
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
     if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows\
	  	connection.execute("SELECT * FROM Pin WHERE objectID = "+objID+" AND sourceID = '"+souID+"' AND　userID = '"+uID+"' AND boardName = '"+bname+"'", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log(results);
	  	    if ( err ) {
	  	    	console.log('Error is in 1');
	  	    	console.log(err);
	  	    } 
	  	    else {
	  	    	// console.log(results.length);
						if (results.length==0)
						{
							connection.execute("INSERT INTO Pin VALUES("+objID+", '"+souID+"', '"+uID+"', '"+bname+"')",
									[], 
			  			   	function(err, results1) {
			  			   		if (err) {
			  			   			console.log('Error is in 2');
			  			   			console.log(err);
			  			   		}
			  			   		else{
			  			   			connection.execute("UPDATE Object SET counts = counts+1" +
			                    "WHERE objectID = "+objID+" AND sourceID = '"+souID+"' ",
			                    [], 
			  			   					function(err, results2) {
			  			   						if (err) {
			  			   							console.log('Error is in 3');
			  			   							console.log(err);
			  			   						}
			  			   						else{

			  			   							res.send({pinstate:true});
			  			   							connection.execute("SELECT counts, URL FROM Object WHERE objectID = "+objID+" AND sourceID = '"+souID+"' ",
					                    [], 
					  			   					function(err, results) {
					  			   						if (err) {
					  			   							console.log('Error is in 4');
					  			   							console.log(err);
					  			   						}
					  			   						else{
					  			   							if (results.COUNT>=5) {
                                                               mongoSaveLarge.do_work(req, res, results.OBJECTID, results.URL);
                                                               //console.log('1111');
					  			   							};
					  			   							connection.close(); // done with the connection
					  			   						}
					  			   					});
			  			   							// connection.close(); // done with the connection
			  			   						}
			  			   					});
			  			   		}
			  			   	});
						}
						else
						{ 
							connection.close(); // done with the connection
							res.send({pinstate:false});
						}
	  	    }
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res){
	query_db(req,res,req.body.objID,req.body.souID,req.session.userlogin,req.body.bname);
};