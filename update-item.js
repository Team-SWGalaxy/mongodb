var mongoClient = require('mongodb').MongoClient;
var dbConnectStr = 'mongodb://localhost:27017/items';
var scanf = require('scanf');
var data;

var updateItem = function () {

    var alterItem = function (db, callback) {

        var collection = db.collection('items');

        console.log('请输入要修改的商品的barcode');
        var queryStr = {"barcode": scanf('%d')};

        getData();

        if (data) {
            data = setData(data);

            collection.update(queryStr, {$set: data}, function (err) {
                if (err) {
                    throw err;
                }
                callback(queryStr);
            });
        }
        else {
            db.close();
        }
    };

    mongoClient.connect(dbConnectStr, function (err, db) {

        if (err) {
            throw err;
        }
        alterItem(db, function (queryStr) {

            db.collection('items').findOne(queryStr, {'_id': 0}, function (err, result) {
                if (err) {
                    throw err;
                }
                console.log(result);
                db.close();
            });

        });
    });

    function getData() {

        console.log('请输入要修改的信息,并以逗号隔开(不改则输入逗号)：\n' +
            'name  price  unit  memo');

        data = scanf('%s').split(',');
        
        judgeType();
    }

    function judgeType() {

        if (data[0] === '' && data[1] === '' && data[2] === '' && data[3] === '') {
            data = null;
        }
        else if (data[1] != '') {
            if (!parseFloat(data[1])) {

                console.log('必填项输入格式有误，请重新输入\n');
                getData();
            }
        }
    }

    function setData(data) {
        var updatedata = {};

        if (data[0]) {
            updatedata.name = data[0];
        }
        if (data[1]) {
            updatedata.price = parseFloat(data[1]);
        }
        if (data[2]) {
            updatedata.unit = data[2];
        }
        if (data[3]) {
            updatedata.memo = data[3];
        }

        return updatedata;
    }
};

module.exports = updateItem;