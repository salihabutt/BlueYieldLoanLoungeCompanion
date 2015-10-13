'use strict';


angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('verifyPopup', function ($scope, $modal, $modalInstance) {

	  $scope.ok = function () {
		$modalInstance.close();  
	  };
	  
	  $scope.cancel = function () {
		 $modalInstance.dismiss();
	  };
  });