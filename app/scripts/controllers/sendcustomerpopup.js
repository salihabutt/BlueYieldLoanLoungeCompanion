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
	  $scope.sendCustfiles = dataService.getSendCustFile();
	
    $scope.ok = function () {
    	var obj = {};
    	obj.name = $scope.file.name;
    	obj.type = $scope.file.type;
    	obj.date = new Date();
    	$scope.sendCustfiles.push(obj);
    	$modalInstance.close();
  	};

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});