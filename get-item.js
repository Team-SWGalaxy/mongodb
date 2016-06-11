var mongoClient = require('mongodb').MongoClient;
var dbConnectStr = 'mongodb://localhost:27017/items';
var scanf = require('scanf');

var getItem = function () {


    var findItem = function (db, callback) {

        var collection = db.collection('items');

        console.log('请输入要查询的商品的barcode');
        var barcode = scanf('%d');
        var queryStr = {"barcode": barcode};

        collection.findOne(queryStr, {'_id': 0}, function (err, result) {
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

module.exports = getItem;