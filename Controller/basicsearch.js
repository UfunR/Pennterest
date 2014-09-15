var search_query = require("../Model/TagSearch");
var request = require('request');
// this somewhere at the top of your code:
var acctKey = 'ktUaT3/N3dwk1i2JvJt1f0ZxEnI4zvA3KVgKMZIBdEA';
var rootUri = 'https://api.datamarket.azure.com/Bing/Search';
var auth    = new Buffer([ acctKey, acctKey ].join(':')).toString('base64');
var bingrequest = request.defaults({
  headers : {
    'Authorization' : 'Basic ' + auth
  }
});

// here's how to perform a query:
function bing_search(req, res, name, results) {
  var service_op  = 'Image';
  var query       = req.query.name;
  bingrequest.get({
    url : rootUri + '/' + service_op,
    qs  : {
      $format : 'json',
      Query   : "'" + query + "'", // the single quotes are required!
    }
  }, function(err, response, body) {
	    if (err)
	      console.log(err);
	    else{
	    	var bingreturn = JSON.parse(response.body);
	    //res.send(results.d.results);
				//res.render('bingimages.jade',{results:bingreturn.d.results});
				view_generator(req,res,name,{queryresult:results,bingresult:bingreturn.d.results});
	    }
  });
}
function view_generator(req,res,name,results){
	// console.log('Information From "basicsearch.js"');
	// console.log(results);
	res.render('searchresult.jade',
		   { title: "Photos with tag " + name,
		     results: results });
}


exports.do_work = function(req,res){
	search_query.do_work(req,res);
}

exports.output_result = function(req,res,name,results){
	bing_search(req, res, name, results);
}