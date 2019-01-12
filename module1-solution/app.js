(function () {
'use strict';

angular.module('LunchChecker', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];
function LunchCheckerController($scope) {
  $scope.checkLunchMenu = function () {
    if (!$scope.lunchMenu) {
      return;
    }
    var menues = $scope.lunchMenu.split(',');
    if (menues.length > 3) {
      $scope.infoLunchMessage = "Too much!";
    } else {
      $scope.infoLunchMessage = "Enjoy!";
    }
  };
};
})();
