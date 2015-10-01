'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('StipBorrowerCtrl', function ($scope, $modal) {
    $scope.open = function () {
    	var modalInstance = $modal.open({
      	animation: true,
      	templateUrl: 'views/stipborrowerpopup.html',
      	controller: 'stipborrowerPopupCtrl'
    	 }
  	)};	

  });
