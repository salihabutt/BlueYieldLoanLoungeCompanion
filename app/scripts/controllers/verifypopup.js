'use strict';


angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('verifyPopup', function ($scope, $modal, $modalInstance) {

  		$scope.getData = {expirationType : "" ,getExpDate : "" };

		$scope.ok = function () {
		$modalInstance.close($scope.getData);  
		};

		$scope.cancel = function () {
		 $modalInstance.dismiss();
		};
  });