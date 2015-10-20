'use strict';


angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('StipNotFoundCtrl', function ($scope, $modal, $modalInstance,stipnotFoundData) {
	  $scope.stipnotFoundData = stipnotFoundData;
  		$scope.setLocation = function (outerIndex, index) {
  			var obj = {};
  			obj.type = $scope.stipnotFoundData[outerIndex].type;
  			obj.subType = $scope.stipnotFoundData[outerIndex].subTypes[index];
  			$modalInstance.close(obj);
  		};	
  });
  