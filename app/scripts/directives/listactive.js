'use strict';

angular.module('blueYieldLoanLoungeCompanionApp')
.directive('activeList', function () {
    return {
        restrict: 'A',
         link: function (scope, element) {
        	 element.click(function(){
        		 	$('li').removeClass('list-active');
        			element.addClass('list-active');
                });
         }
    }
});