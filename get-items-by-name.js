var mongoClient = require('mongodb').MongoClient;
var dbConnectStr = 'mongodb://localhost:27017/items';
var scanf = require('scanf');

var getItemsByName = function () {

    var findItem = function (db, callback) {

        var collection = db.collection('items');

        console.log('请输入要查询的商品的名字');
        var name = scanf('%s');
        var queryStr = {name: new RegExp("^.*" + name + ".*$")};

        collection.find(queryStr, {'_id': 0}).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    };

    mongoClient.connect(dbConnectStr, function (err, db) {

        if (err) {

            throw err;
        }
        findItem(db, function (result) {
            console.log(result);
            db.close();
        })
    });
};

module.exports = getItemsByName;