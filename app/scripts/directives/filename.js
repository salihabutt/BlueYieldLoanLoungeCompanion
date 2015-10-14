'use strict';
var REGEXP = /^(?:(?![\\\?/\*<>|:]).)*$/;
app.directive('filenamecheck', function($q, $timeout) {
	  return {
	    require: 'ngModel',
	    link: function(scope, elm, attrs, ctrl) {

	      ctrl.$asyncValidators.filenamecheck = function(modelValue, viewValue) {

	        if (ctrl.$isEmpty(modelValue)) {
	          // consider empty model valid
	          return $q.when();
	        }

	        var def = $q.defer();

	        $timeout(function() {
	          if (REGEXP.test(viewValue)) {
	            def.resolve();
	          } else {
	            def.reject();
	          }

	        }, 1000);

	        return def.promise;
	      };
	    }
	  };
	});