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
		this.sendCustFiles=[];

		this.getSendCustFile= function () {
			return this.sendCustFiles;
		};
	
		
		
	});