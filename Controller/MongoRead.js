
/**
 * Module dependencies.
 */

var Db = require('mongodb').Db,
 MongoClient = require('mongodb').MongoClient,
 Server = require('mongodb').Server,
 ReplSetServers = require('mongodb').ReplSetServers,
 ObjectID = require('mongodb').ObjectID,
 Binary = require('mongodb').Binary,
 GridStore = require('mongodb').GridStore,
 Grid = require('mongodb').Grid,
 Code = require('mongodb').Code,
 BSON = require('mongodb').pure().BSON,
 assert = require('assert');
 fs = require('fs');

//var mkpath = require('mkpath');
var request = require('request');

exports.do_work = function mongo_read(req, res, fileId) {
//MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
MongoClient.connect('mongodb://cis550:cis550@ds053688.mongolab.com:53688/cis550', function(err, db) {
  // Create a new instance of the gridstore
  var gridStore = new GridStore(db , fileId, "r");
  // Open the file
  gridStore.open(function(err, gridStore) {

             // request('http://www.tracks-trails.com/stuff/contentmgr/files/0/855076f9bcfce4c1a591b5332e3c495c/files/yellowstone___grand_prismatic.jpg', function (error, response, body) {
            //request(url, function (error, response, body) {
                    // image = new Buffer(body, 'binary');

                    // // Write some data to the file
                    // gridStore.write(image, function(err, gridStore) {
                    //   assert.equal(null, err);

                    //   // Close (Flushes the data to MongoDB)
                    //   gridStore.close(function(err, result) {
                    //     assert.equal(null, err);

                    //     // Verify that the file exists
                    //     GridStore.exist(db, 'ourexamplefiletowrite.txt', function(err, result) {
                    //       assert.equal(null, err);
                    //       assert.equal(true, result);
                          
                          // Read back all the written content and verify the correctness
                            GridStore.read(db, fileId, function(err, fileData) {
                            console.log("Load data...")
                            var img = fileData
                            res.writeHead(200, {'Content-Type': 'image/jpg'});
                            res.end(img, 'binary');


                            // mkpath('./public/tempFile', function (err) {
                            //     if (err) throw err;
                            //     fs.writeFile('./public/tempFile/' + fileId +'.jpg',fileData,function(err){
                            //     if(err) throw err;
                            //     console.log("Read to file!")
                                
                            //   });
                           
                            //      });
                            db.close();
                            console.log('Done');


                          });                     
                    //     });
                    //   });
                    // });

               // });
  });



});
}


//