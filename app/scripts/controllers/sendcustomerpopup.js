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
	  $scope.applicantInfo = dataService.applicantInfo;
	
    $scope.ok = function () {
    	var obj = {};
    	obj.name = $scope.file.name;
    	obj.type = $scope.file.type;
    	obj.url = "/images/material-design.pdf"; // right now static for demo purposes
    	obj.date = new Date();
    	obj.checked = false;
    	$modalInstance.close(obj);
  	};

    $scope.cancel = function () {
    	var obj = {};
    	obj.name = $scope.file.name;
    	obj.type = $scope.file.type;
    	obj.date = null;
    	obj.url = "/images/relativity.pdf";  // right now static for demo purposes
    	obj.checked = false;
    	$modalInstance.dismiss(obj);
    };
});