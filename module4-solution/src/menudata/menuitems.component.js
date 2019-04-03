(function () {
'use strict';

angular.module('MenuData')
.component('menuitems', {
  templateUrl: 'src/menudata/templates/menuitems.template.html',
  bindings: {
    menuItems: '<'
  }
});

})();