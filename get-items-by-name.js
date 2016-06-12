var mongoClient = require('mongodb').MongoClient;
var dbconnectStr = 'mongodb://localhost:27017/items';
var scanf = require('scanf');

var getItemsByName = function () {
    
    var findItemsByName = function (db, callback) {

        var collection = db.collection('items');

        console.log('请输入商品名：');
        var name = scanf('%s');
        var queryStr = {name:name};

        collection.find(queryStr, function (err, result) {
            if (err){
                throw err;
            }
            callback(result);
        });
    };
    
    mongoClient.connect(dbconnectStr, function (err, db) {
        if (err){
            throw err;
        }
        findItemsByName(db, function (result) {
            console.log(result);
        });
        db.close();
    })
};

module.exports = getItemsByName;