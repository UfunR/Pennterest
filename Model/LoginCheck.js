var oracle =  require("oracle");
var DBconnection = require("./OracleDB");
var control = require("../Controller/login");
var index_page = require("../Controller/index");
var loginCheckForNoPass = require("../Model/LoginCheckForNoPass");

function query_db(req,res,name,password) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("SELECT u.login, u.password FROM Users u WHERE u.login = '"+name+"'" , 
	  			   [], 
	  			   function(err, results) {
	  			   //console.log(results);
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    	connection.close(); // done with the connection
	  	    	if (results != '') {
	  	    		// console.log(results);
	  	    		//connection.close(); // done with the connection
	  	    		if (password != results[0].PASSWORD) {
	  	    			if (results[0].PASSWORD == null) {
	  	    				// console.log("Information From 'LoginCheck.js'");
	  	    				// console.log(req.body.passwordComfirmation);
	  	    				if (!req.body.passwordComfirmation) {
	  	    					index_page.do_work(req,res, {state: 'case3', usernameEntered: name});
	  	    				}else{
	  	    					if (req.body.passwordComfirmation!=password) {
	  	    						index_page.do_work(req,res, {state: 'case4', usernameEntered: name});
	  	    					}else{
	  	    						// console.log("Here is in LoginCheck.js");
	  	    						//LoginCheckForNoPass
	  	    						loginCheckForNoPass.do_work(req, res, name, password);
	  	    					}
	  	    				}
	  	    			}else{
		  	    			index_page.do_work(req,res, {state: 'case2'});
		  	    		}
	  	    		}else{
	  	    			// console.log('Start rendering');
	  	    			// console.log(results[0].LOGIN);
	  	    			req.session.userlogin = results[0].LOGIN;
	  	    			req.session.firstload = 0;
	  	    			control.view(req, res, name, []);
	  	    		};
	  	    	}else{
	  	    		//index_page.do_work();
	  	    		index_page.do_work(req,res, {state: 'case1'});
	  	    	}
	  	    }
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res){
	query_db(req,res,req.body.username,req.body.password);
};