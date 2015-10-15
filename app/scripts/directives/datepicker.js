'use strict';

angular.module('blueYieldLoanLoungeCompanionApp')
.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element,attrs, ngModel) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (date) {
                	  ngModel.$setViewValue(date);
                	  scope.$apply();
                }
            });
        }
    };
});