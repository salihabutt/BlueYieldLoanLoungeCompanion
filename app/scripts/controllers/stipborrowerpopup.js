'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */

angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('stipborrowerPopupCtrl', function ($scope, $modal, $modalInstance, items, subject) {

	$scope.items = items;
	$scope.subject = subject;
    $scope.ok = function () {
      var checkedBoxes = getCheckedBoxes("stipCheckbox");
      console.log(checkedBoxes);
  	};

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});