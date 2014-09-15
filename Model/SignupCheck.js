var oracle =  require("oracle");
var DBconnection = require("./OracleDB")
var control = require("../Controller/signup");

function query_db(req, res,login,password,email,givenname,surname,affiliation,birthday) {
  oracle.connect(DBconnection.DBinfo, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute("INSERT INTO users VALUES('"+ login +"','" + email + "','" + givenname + "','" + surname + "','" + affiliation + "',to_date('" + birthday + "', 'dd/mm/yyyy'),'" + password +"')", 
	  			   [], 
	  			   function(err, results) {
	  			   // console.log('Im here');
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    		connection.close(); // done with the connection
	  	    		req.session.firstload = 0;
	  	    		req.session.userlogin = login;
	  	    		control.view(req, res, login);

	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

exports.do_work = function(req, res){
	query_db(req, res, req.body.login, req.body.password, req.body.email, req.body.givenname, req.body.surname, req.body.affiliation,req.body.birthday);
};