/**
 * Simple Homework 2 application for CIS 550
 * 
 * zives
 */

/**
 * Module dependencies.
 */
var express = require('express')
  , index_page = require('./Controller')
  , router = require('./routes/router')
  , http = require('http')
  , path = require('path')
  , stylus =  require("stylus")
  //, RedisStore = require('connect-redis')(express)
  , nib =     require("nib")
;

// Initialize express
var app = express();
// .. and our app
init_app(app);

// When we get a request for {app}/ we should call routes/index.js
app.get('/', index_page.do_work);
app.post('/', index_page.do_work);
// when we get a request for {app/actor} we should call routes/actor.js
// app.get('/actor', actor.do_work);

app.post('/router', router.postRequest);
app.post('/signup', router.signupRequest);
app.post('/readuserboard',router.readBoadNames);
app.post('/readmoreimages',router.readMoreImages);
app.post('/finishpin',router.realPin);
app.post('/boadCreation',router.createBoard);
app.post('/load_board',router.loadBoard);
app.post('/rateIt',router.rateit);
app.post('/rateCheck',router.rateCheck);
app.post('/rateUpdate',router.rateUpdate);

app.get('/basic_search',router.doSearch);
app.get('/home',router.returnHome);
app.get('/logout',router.logOut);
app.get('/Reconmmendation',router.reconmmendation);
app.get('/showimage',router.showimagefrommongo);
app.get('/readfriend',router.returnFriend);
// Listen on the port we specify
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

///////////////////
// This function compiles the stylus CSS files, etc.
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

//////
// This is app initialization code
function init_app() {
	// all environments
	app.set('port', process.env.PORT || 8080);
	
	// Use Jade to do views
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	// Inital session
	app.use(express.cookieParser());
	app.use(express.session({secret: "This is a secret"}));

	app.use(express.favicon());
	// Set the express logger: log to the console in dev mode
	app.use(express.logger('dev'));
	// add middle ware to parse the post data of the body
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	// app.use(express.session({
	//   // store: new RedisStore({
	//   //   host: "cis550project.cmob3vqbmmc4.us-east-1.rds.amazonaws.com",
	//   //   port: 1521,
	//   //   db: "PENNTR",
	//   //   pass: "cis550key"
	//   // }),
	//   secret: '1234567890QWERTY'
	// }));
	// Use Stylus, which compiles .styl --> CSS
	app.use(stylus.middleware(
	  { src: __dirname + '/public'
	  , compile: compile
	  }
	));
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

}