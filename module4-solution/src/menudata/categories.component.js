(function () {
'use strict';

angular.module('MenuData')
.component('categories', {
  templateUrl: 'src/menudata/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();