var mongoClient = require('mongodb').MongoClient;
var dbConnectStr = 'mongodb://localhost:27017/items';
var scanf = require('scanf');

var addItem = function () {

    var insertItems = function (db, callback) {

        var collection = db.collection('items');

        var data = {};
        data = getInputs();

        collection.insert(data, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });

    };

    mongoClient.connect(dbConnectStr, function (err, db) {

        insertItems(db, function (result) {
            console.log(result.ops[0]);
            db.close();
        });

    });

    function getInputs() {

        console.log('请输入以下信息,并以逗号隔开：\n' + 'barcode  name  price  unit  memo(选填)');
        var inputs = scanf('%s').split(',');

        var data = judgeType(inputs);
        if (data) {

            return data;
        }
        else {

            return getInputs();
        }
    }

    function judgeType(insertData) {
        if (parseInt(insertData[0]) && insertData[1] && parseFloat(insertData[2]) && insertData[3]) {

            return {
                barcode: parseInt(insertData[0]),
                name: insertData[1],
                price: parseFloat(insertData[2]),
                unit: insertData[3],
                memo: insertData[4]
            };
        }
        else {
            console.log('必填项未填写完整或输入格式有误，请重新输入\n');
            return null;
        }
    }
};

module.exports = addItem;
