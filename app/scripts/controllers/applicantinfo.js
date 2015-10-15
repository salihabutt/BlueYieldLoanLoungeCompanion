'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:ApplicantCtrl
 * @description
 * # ApplicantCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('AppInfoCtrl', function ($scope,dataService,$modal) {
	
	var self = this;
    self.account = "209005";
    self.appliedBy = "09/12/2015";
    self.timeSinceApplied = "2days, 3hrs.";
    self.product = "REFINANCE";
    self.applicantInfo = dataService.applicantInfo;
    
    self.openCustInfoModal = function () {
    		var modalInstance = $modal.open({
	    		animation: false,
		    	templateUrl: 'views/customerinfopopup.html',
		    	controller: 'custInfoPopupCtrl',
		    	windowClass: 'modal-custinfo'
	    	});
    };
    
  })  
  .controller('custInfoPopupCtrl', function ($scope,dataService,$modal) {
	  $scope.customerInfo = {
			  name: 'Karley Test',
			  lc: 'Ryan Cowan',
			  fundAssTo: 'Shawn levin',
			  lender: 'Ally Financial Services',
			  docAtCust: '9/10/2015',
			  payExpDate: '9/10/2015',
			  appExpDate: '10/10/2015',
			  lienHolder: 'Chryslar Financial Services',
			  gap: 'Yes',
			  esc: 'yes'
	  };
  });