'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('stipborrowerPopupCtrl', function ($scope, $modal, $modalInstance) {

    $scope.ok = function () {
      console.log(this);
  	};

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});