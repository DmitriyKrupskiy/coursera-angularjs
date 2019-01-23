(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;

  list.toBuyItems = ShoppingListCheckOffService.getToBuyItems();


  list.itemName = "";
  list.itemQuantity = "";
  list.message2 = "Nothing bought yet."


  ShoppingListCheckOffService.addToBuyItem("1", "10");
  ShoppingListCheckOffService.addToBuyItem("2", "20");
  ShoppingListCheckOffService.addToBuyItem("3", "30");
  console.log(ShoppingListCheckOffService.getToBuyItems());

  list.removeToBuyItem = function (toBuyItemIndex) {
    ShoppingListCheckOffService.removeItemToBuy(toBuyItemIndex);
  };
  list.buyItem = function (toBuyItemIndex) {
    list.message2 = "";
    var item = ShoppingListCheckOffService.getToBuyItemByIndex(toBuyItemIndex);
    ShoppingListCheckOffService.addAlreadyBoughtItem(item.name, item.quantity);
	  try {
  		ShoppingListCheckOffService.removeItemToBuy(toBuyItemIndex);
	  } catch (error) {
  		list.message = "Everything is bought!";
	  }

  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list = this;

  list.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
  list.alreadyBoughtItems =  ShoppingListCheckOffService.getAlreadyBoughtItems();

  list.itemName = "";
  list.itemQuantity = "";


}


function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [];
  var alreadyBoughtItems = [];

  service.addAlreadyBoughtItem = function (itemName, quantity) {
   var item = {
		name: itemName,
		quantity: quantity
	  };
	  alreadyBoughtItems.push(item);
  };

  service.addToBuyItem = function (itemName, quantity) {
  	var item = {
  		name: itemName,
  		quantity: quantity
  	};
  	toBuyItems.push(item);
  };

  service.removeItemToBuy = function (itemToBuyIndex) {

	  if (toBuyItems.length == 1) {
      toBuyItems.splice(itemToBuyIndex, 1);
		  throw new Error("The list is empty");
	  } else {
		  toBuyItems.splice(itemToBuyIndex, 1);
	  }
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

  service.getToBuyItemByIndex = function (toBuyItemIndex) {
	   return toBuyItems[toBuyItemIndex];
  };
}

})();
