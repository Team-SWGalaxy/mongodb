var mongoClient = require('mongodb').MongoClient;
var dbConnectStr = 'mongodb://localhost:27017/items';
var scanf = require('scanf');

var updateItem = function () {

    var alterItem = function (db, callback) {

        var collection = db.collection('items');

        console.log('请输入要修改的商品的barcode');
        var queryStr = {"barcode": scanf('%d')};

        console.log('请输入要修改的信息,并以逗号隔开(不填则仍为原值)：\n' +
            'name  price  unit  memo(选填)');
        var updateData = scanf('%s').split(',');

        var data = modifyItem(updateData);

        collection.updateOne(queryStr, {$set: data}, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        })
    };

    mongoClient.connect(dbConnectStr, function (err, db) {

        if (err) {
            throw err;
        }
        alterItem(db, function (result) {
            console.log(result);
            db.close();
        })
    });

    function modifyItem(updatedata) {
        var data = {};
        if (updatedata[0]) {
            data.name = updatedata[0];
        }
        if (updatedata[1]) {
            data.price = parseFloat(updatedata[1]);
        }
        if (updatedata[2]) {
            data.unit = updatedata[2];
        }
        if (updatedata[3]) {
            data.memo = updatedata[3];
        }

        return data;
    }
};

module.exports = updateItem;