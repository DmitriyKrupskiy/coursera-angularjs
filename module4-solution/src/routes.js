(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menudata/templates/home.template.html'
  })

  // Premade list page
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/menudata/templates/main-categories.template.html',
    controller: 'CategoryController as mainList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
		  console.log('resolve');
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Item detail
  .state('mainList.menuitems', {
    url: '/item-detail/{itemId}',
    templateUrl: 'src/menudata/templates/menuitems.template.html',
    controller: 'MenuItemsController as menuitems',
	 params: {
      itemId: null
    }
  });

}

})();
