(function () {
'use strict';

angular.module('MenuData')
.controller('MenuItemsController', MenuItemsController);

MenuItemsController.$inject = ['MenuDataService', '$stateParams', 'items'];
function MenuItemsController(MenuDataService, $stateParams, items) {
	var menuitems = this;
	menuitems.items = null;
	menuitems.category;
	var item = items[$stateParams.itemId];
	var promise = MenuDataService.getItemsForCategory(item.short_name);
	
	promise.then(function (response) {
		console.log(response.data);
		menuitems.items = response.data.menu_items;
		menuitems.category = response.data.category.name;
  });
}

})();