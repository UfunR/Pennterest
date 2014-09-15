var recommendationCheck = require("../Model/RecommendationCheck");
var request = require('request');
var acctKey = 'ktUaT3/N3dwk1i2JvJt1f0ZxEnI4zvA3KVgKMZIBdEA';
var rootUri = 'https://api.datamarket.azure.com/Bing/Search';
var auth    = new Buffer([ acctKey, acctKey ].join(':')).toString('base64');
var bingrequest = request.defaults({
  headers : {
    'Authorization' : 'Basic ' + auth
  }
});
function view_generator(req, res, results) {
	res.render('recommendation.jade',
		   { title: "Photos with tag ",
		     results: results });
}

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
				view_generator(req,res,{queryresult:results,bingresult:bingreturn.d.results});
	    }
  });
}

exports.do_work = function(req, res, name, results){
	bing_search(req, res, name, results)
	
};
