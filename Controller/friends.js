
exports.view = function(req,res,results){
	res.render('friend.jade', { 
	  title: 'Phantomer' ,
	  results: results
  });
}