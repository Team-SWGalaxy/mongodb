var mongoClient = require('mongodb').MongoClient;
var dbConnectStr = 'mongodb://localhost:27017/items';
var scanf = require('scanf');

// exports.addItems = function() {

var insertItems = function (db, callback) {

    var collection = db.collection('items');

    // console.log('请输入以下信息,并以逗号隔开：\n' + 'barcode  name  price  unit  demo(选填)');
    // insertData = scanf('%s').split(',');
    //
    // var data = {
    //     "barcode": insertData[0],
    //     "name": insertData[1],
    //     "price": parseFloat(insertData[2]),
    //     "unit": insertData[3],
    //     "demo":insertData[4]
    // };

    var data = {};
    data = getItem();

        collection.insert(data, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
};

mongoClient.connect(dbConnectStr, function (err, db) {
    // console.log('连接成功');
    insertItems(db, function (result) {
        console.log(result);
        db.close();
    });
});
// };

function getItem() {

    console.log('请输入以下信息,并以逗号隔开：\n' + 'barcode  name  price  unit  demo(选填)');
    var insertData = scanf('%s').split(',');

    if (insertData[0] && insertData[1] && parseFloat(insertData[2]) && insertData[3]) {

        return {
            "barcode": insertData[0],
            "name": insertData[1],
            "price": parseFloat(insertData[2]),
            "unit": insertData[3],
            "demo": insertData[4]
        };
    }
    else {
        console.log('必填项未填写完整或输入格式有误，请重新输入\n');

    }
    getItem();
}

// function judgeType(data) {
//     if(data.barcode && data.name && data.price && data.unit){
//         return true;
//     }
//
//     return false;
// }
