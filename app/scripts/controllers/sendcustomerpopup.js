'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:sendCustomerCtrl
 * @description
 * # sendCustomerCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */

angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('sendCustPopupCtrl', function ($scope, $modal, $modalInstance, item, dataService) {

	  $scope.file = item;
	  $scope.sendCustFile = dataService.sendCustFile;
	  $scope.applicantInfo = dataService.applicantInfo;
	
    $scope.ok = function () {
    	$scope.sendCustFile.name = $scope.file.name;
    	$scope.sendCustFile.type = $scope.file.type;
    	$scope.sendCustFile.url = "/images/material-design.pdf"; // right now static for demo purposes
    	$scope.sendCustFile.date = new Date();
    	$modalInstance.close();
  	};

    $scope.cancel = function () {
    	$scope.sendCustFile.name = $scope.file.name;
    	$scope.sendCustFile.type = $scope.file.type;
    	$scope.sendCustFile.date = null;
    	$scope.sendCustFile.url = "/images/relativity.pdf";  // right now static for demo purposes
    	$modalInstance.dismiss('cancel');
    };
});