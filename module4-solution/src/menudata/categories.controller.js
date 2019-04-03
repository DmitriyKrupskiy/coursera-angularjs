(function () {
'use strict';

angular.module('MenuData')
.controller('CategoryController', CategoryController);

CategoryController.$inject = ['MenuDataService', 'items'];
function CategoryController(MenuDataService, items) {
	var mainList = this;
	mainList.items = items;
}

})();