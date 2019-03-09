(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: MenuListDirectiveController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}


function MenuListDirectiveController() {

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.items = MenuSearchService.getMatchedMenuList();
  
  var origTitle = "Found menu items: ";
  menu.title = origTitle + " (" + menu.items.length + " items )";

  menu.searchTerm = "";
  menu.lastRemoved = "";

  menu.addItem = function () {
	console.log("'this' is: ", this);
	MenuSearchService.getMatchedMenuItems(menu.searchTerm).then(function() {
		 menu.title = origTitle + " (" + menu.items.length + " items )";
	});
	
   
  };

  menu.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    MenuSearchService.removeItem(itemIndex);
    this.title = origTitle + " (" + menu.items.length + " items )";
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
	var service = this;
	var menuList = [{}];
	var foundMenuItems = [];
	
	
	service.getMenuItems = function () {
		var response = $http({
		  method: "GET",
		  url: (ApiBasePath + "/menu_items.json")
		});
		
		return response;
	};
	
	service.getMatchedMenuItems = function (searchTerm) {
		console.log("MenuSearchService->getMatchedMenuItems->searchTerm->" + searchTerm);
		if (searchTerm === "") {
			return;
		}
		
		return $http({
		  method: "GET",
		  url: (ApiBasePath + "/menu_items.json")
		}).then(function (response) {
			foundMenuItems.splice(0, foundMenuItems.length);
			var menuList = response.data["menu_items"];
			for(var i=0; i < menuList.length; i++) {
				if (menuList[i]["description"].indexOf(searchTerm) !== -1) {
					foundMenuItems.push(menuList[i]);
				}
			}
			
			console.log("foundMenuItems.length->" + foundMenuItems.length);
		});
	};
	
	service.removeItem = function (itemIndex) {
		foundMenuItems.splice(itemIndex, 1);
	};
	
	service.getMatchedMenuList = function () {
		return foundMenuItems;
	};
}


})();
