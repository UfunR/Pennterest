
/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res, results){
  res.render('index.jade', { 
	  title: 'Phantomer' ,
	  results: results
  });
};
