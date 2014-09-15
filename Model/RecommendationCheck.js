var oracle =  require("oracle");
var DBconnection = require("./OracleDB")
var recommendationC = require("../Controller/RecommendationController")

function query_db(req, res) {

  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("select r.objectID, r.sourceID, avg(r.rating) as RATING, o.url from Rating r, Object o where r.objectID = o.objectID and r.sourceID = o.sourceID and rownum <= 20 group by r.objectID , r.sourceID, o.url order by RATING DESC", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log(results);
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    	    connection.execute("select t.objectID, t.sourceID, t.tag, o.url, o.counts from Tag t, Object o where t.objectID = o.objectID and t.sourceID = o.sourceID and t.tag in (select i.interest from Interests i where i.userID = '" + req.session.userlogin + "')",
	  	    	    	[], 
		  			   function(err, results1) {
		  			   // console.log('Im here');
				  	    if ( err ) {
				  	    	console.log(err);
				  	    } else {
				  	    	//append the results;
				  	    	var inx2 = results.length
		                    for (var inx = 0; inx < results1.length; inx++)
						    {
							      results[inx2] = results1[inx];
							      inx2 = inx2 + 1;
							}
				  	    	// console.log(RecommendationCheck);
				  	    	console.log('I am here');
				  	    	console.log(results[0].TAG);

				  	    	connection.close(); // done with the connection
				  	    	//do something
				  	    	recommendationC.do_work(req, res, results[0].TAG, results);
	  	    	}
	  	      }
	  	    );
	  	  }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res){
	query_db(req, res);
};