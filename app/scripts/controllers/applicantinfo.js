'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:ApplicantCtrl
 * @description
 * # ApplicantCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('AppInfoCtrl', function () {
    this.account = "209005";
    this.appliedBy = "09/12/2015";
    this.timeSinceApplied = "2days, 3hrs.";
    this.product = "ReFinance";
    this.applicantInfo = {
    		name: "Karley Test",
    		address: "1234 Vita St, Paramount, CA 90723",
    		name2: "Steven Test",
    		address2: "1234 Vita St, Paramount, CA 90723",
    		cellphone: "(123)456-7890",
    		home: "(123)456-7890",
    		work: "(123)456-7890",
    		email: "test@gmail.com"
    	
    };
  }) ;