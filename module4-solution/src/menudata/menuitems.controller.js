(function () {
'use strict';

angular.module('MenuData')
.controller('MenuItemsController', MenuItemsController);

MenuItemsController.$inject = ['item'];
function MenuItemsController(item) {
	
	var menuitems = this;
	console.log("item" + item);
	menuitems.items = item.data.menu_items;
	menuitems.category = item.data.category.name;

}

})();