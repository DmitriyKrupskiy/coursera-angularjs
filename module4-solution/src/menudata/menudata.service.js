(function () {
'use strict';

angular.module('MenuData')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$q', '$http', 'ApiBasePath']
function MenuDataService($q, $http, ApiBasePath) {
	var service = this;
	
	service.getAllCategories = function () {
		var deferred = $q.defer();
		
		console.log('getAllCategories');
		$http({
		  method: "GET",
		  url: (ApiBasePath + "/categories.json")
		}).then(function (response) {
			console.log(response.data);
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};
	
	/*service.getItemsForCategory = function () {
		var deferred = $q.defer();
		
		console.log('getItemsForCategory');
		$http({
		  method: "GET",
		  url: (ApiBasePath + "//menu_items.json"),
		  params: {
			category: shortName
		  }
		}).then(function (response) {
			console.log(response.data);
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};*/
	
	service.getItemsForCategory = function (shortName) {
		console.log("sort_name" + shortName);
		
		var response = $http({
		  method: "GET",
		  url: (ApiBasePath + "/menu_items.json?category="),
		  params: {
			category: shortName
		  }
		});
		return response;
	};

}

})();
