'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:ApplicantCtrl
 * @description
 * # ApplicantCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('AppInfoCtrl', function ($scope,dataService) {
	
	var self = this;
    self.account = "209005";
    self.appliedBy = "09/12/2015";
    self.timeSinceApplied = "2days, 3hrs.";
    self.product = "ReFinance";
    self.applicantInfo = dataService.applicantInfo;
    
  });