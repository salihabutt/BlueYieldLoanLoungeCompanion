'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('StipBorrowerCtrl', function ($scope, $modal, stipDataService) {
    $scope.borrowerStip = stipDataService.getData();
    $scope.open = function (type) {
    	var modalInstance = $modal.open({
    		animation: true,
    		templateUrl: 'views/stipborrowerpopup.html',
    		controller: 'stipborrowerPopupCtrl',
    		resolve: {
    			items: function () {
    				return $scope.borrowerStip;
    			},
    			subject: function () {
    				var subject="";
    				switch (type) {
            	 		case "borrower":
            	 			subject = "Borrower";
            	 		break;
            	 		case "co-borrower":
            	 			subject = "Co-borrower";
            	 		break;
            	 		default:
            	 			subject = "Seller";
            	 		break;
    				}
    				return subject;
    			}
    		}
    	}
  	)};

});
