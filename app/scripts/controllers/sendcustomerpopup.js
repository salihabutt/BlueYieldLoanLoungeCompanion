'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:sendCustomerCtrl
 * @description
 * # sendCustomerCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */

angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('sendCustPopupCtrl', function ($scope, $modal, $modalInstance) {

	
    $scope.ok = function () {
    	$modalInstance.dismiss('cancel');
  	};

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});