var mongoClient = require('mongodb').MongoClient;
var dbConnectStr = 'mongodb://localhost:27017/items';
var scanf = require('scanf');

var deleteItem = function () {

    var removeItem = function (db, callback) {

        var collection = db.collection('items');

        console.log('请输入要删除的商品的barcode');
        var barcode = scanf('%d');
        var queryStr = {"barcode": barcode};

        collection.remove(queryStr, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(result);
        });
    };

    mongoClient.connect(dbConnectStr, function (err, db) {
        if (err) {
            console.log(err);
        }
        removeItem(db, function (result) {

            if (result.result.n) {
                console.log('删除成功');
            }
            else {
                console.log('not found');
                deleteItem();
            }
            db.close();
        });
    });
};

module.exports = deleteItem;
