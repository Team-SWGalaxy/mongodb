var scanf = require('scanf');
var addItems = require('./add-items');

function operateItems() {
    displayMenu();
   
    var chioce = scanf('%d');
    if (chioce === 1){
        addItems.addItems();
    }
    // console.log(chioce);
}

function displayMenu() {

    console.log( '请选择:\n' +
        '1. 增加商品\n' +
        '2. 删除商品\n' +
        '3. 查看商品信息\n' +
        '4. 修改商品信息');
}

operateItems();