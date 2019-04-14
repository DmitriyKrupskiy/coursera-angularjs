(function () {
'use strict';

angular.module('MenuData')
.component('menudetails', {
  templateUrl: 'src/menudata/templates/menu-details.template.html',
  bindings: {
    items: '<'
  }
});

})();