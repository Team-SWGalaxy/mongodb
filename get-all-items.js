var mongoClient = require('mongodb').MongoClient;
var dbConnectStr = 'mongodb://localhost:27017/items';

var findAllItems = function (db, callback) {
    
    var collection = db.collection('items');

    collection.find({},{'_id':0}).toArray(function(err, result){
        if (err){
            throw err;
        }
        callback(result);
    });
};

mongoClient.connect(dbConnectStr, function (err, db) {
    if (err){
        throw err;
    }
    findAllItems(db, function (result) {
        console.log(result);
        db.close();
    })
});