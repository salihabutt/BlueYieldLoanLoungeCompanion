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
   /* $scope.borrowerStip = stipDataService.getBorData();
    $scope.coborrowerStip = stipDataService.getCobData();
    $scope.sellerStip = stipDataService.getSellerData();*/
    $scope.open = function (type) {
    	var modalInstance = $modal.open({
    		animation: true,
    		templateUrl: 'views/stipborrowerpopup.html',
    		controller: 'stipborrowerPopupCtrl',
    		resolve: {
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
