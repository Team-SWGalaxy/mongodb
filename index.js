var scanf = require('scanf');

var addItems = require('./add-items');
var deleteItem = require('./delete-item');
var getAllItems = require('./get-all-items');
var getItemByBarcode = require('./get-item-by-barcode');
var updateItem = require('./update-item');

displayMenu();

var chioce = scanf('%d');

switch (chioce){
    case 1: addItems(); break;
    case 2: deleteItem(); break;
    case 3: getAllItems(); break;
    case 4:selectItemMenu(); break;
    case 5: updateItem(); break;

}


function displayMenu() {

    console.log('请选择要进行的操作:\n' +
        '1. 增加商品\n' +
        '2. 删除商品\n' +
        '3. 查看所有商品信息\n' +
        '4. 查看指定商品信息\n' +
        '5. 修改商品信息');
}

function selectItemMenu() {
    console.log('1.按barcode进行查找 ' + '\t' + '2.按商品名字进行查找');

    switch(scanf('%d')){
        case 1:getItemByBarcode();
        // case 2:getItemsByname();
    }
}

// operateItems();