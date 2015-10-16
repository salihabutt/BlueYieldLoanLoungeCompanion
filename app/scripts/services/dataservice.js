'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
	.service('dataService', function () {
		this.applicantInfo = {
	    		name: "Karley Test",
	    		address: "1234 Vita St, Paramount, CA 90723",
	    		name2: "Steven Test",
	    		address2: "1234 Vita St, Paramount, CA 90723",
	    		cellphone: "(123) 456-7890",
	    		home: "(123) 456-7890",
	    		work: "(123) 456-7890",
	    		email: "test@gmail.com"
	    	
	    };
		
	});