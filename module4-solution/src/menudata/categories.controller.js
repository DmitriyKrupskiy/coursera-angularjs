(function () {
'use strict';

angular.module('MenuData')
.controller('CategoryController', CategoryController);

CategoryController.$inject = ['items'];
function CategoryController(items) {
	var mainList = this;
	mainList.items = items;
}

})();