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
 		case 'Borrower':
 			$scope.borrowerStip[index].check=false;
 		break;
 		case 'Co-borrower':
 			$scope.coborrowerStip[index].check=false;
 		break;
 		case 'Seller':
 			$scope.sellerStip[index].check=false;
 		break;
	}
    }
});