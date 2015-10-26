'use strict';
angular.module('blueYieldLoanLoungeCompanionApp')
.directive('buttonsRadio', function() {
    return {
        restrict: 'E',
        scope: { model: '=', options:'='},
        controller: function($scope){
            $scope.activate = function(option){
                $scope.model = option;
            };      
        },
        template: "<button type='button' class='btn btn-success' "+
                    "ng-class='{active: option == model}'"+
                    "ng-repeat='option in options' "+
                    "ng-click='activate(option)' style='height:40px;outline:none'>{{option}} "+
                  "</button>"
    };
});