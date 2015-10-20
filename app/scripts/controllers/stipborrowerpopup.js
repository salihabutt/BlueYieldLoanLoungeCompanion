'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */

angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('stipborrowerPopupCtrl', function ($scope, $modal, $modalInstance, stipDataService, subject) {
	$scope.borrowerStip = stipDataService.getBorData();
	$scope.coborrowerStip = stipDataService.getCobData();
	$scope.sellerStip = stipDataService.getSellerData();
	$scope.subject = subject;
    $scope.ok = function () {
    	$modalInstance.close();
  	};

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
    $scope.removeCategory = function (index,type) {
    	switch (type) {
 		case 'BO':
 			$scope.borrowerStip[index].checked=false;
 			break;
 		case 'CO':
 			$scope.coborrowerStip[index].checked=false;
 			break;
 		case 'SE':
 			$scope.sellerStip[index].checked=false;
 			break;
    	}
    };
});