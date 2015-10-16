'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
	.service('stipDataService', function () {
		this.borData = [{
			name: "Driver License Front",
			checked: true
		},
		{
			name: "Driver License Back",
			checked: true
		},
		{
			name: "Registration",
			checked: true
		},
		{
			name: "Insurance Card",
			checked: true
		},
		{
			name: "Social Security Card",
			checked: false
		},
		{
			name: "Resident Card",
			checked: false
		},
		{
			name: "Title Front",
			checked: false
		},
		{
			name: "Title Back",
			checked: false
		},
		{
			name: "Paystub",
			checked: false
		},
		{
			name: "Marriage Certificate",
			checked: false
		},
		{
			name: "Death Certificate",
			checked: false
		},
		{
			name: "Passport",
			checked: false
		},
		{
			name: "Income Taxes",
			checked: false
		},
		{
			name: "Bank Statement",
			checked: false
		}];

		this.cobData = [{
			name: "Driver License Front",
			checked: true
		},
		{
			name: "Driver License Back",
			checked: true
		},
		{
			name: "Registration",
			checked: true
		},
		{
			name: "Insurance Card",
			checked: true
		},
		{
			name: "Social Security Card",
			checked: false
		},
		{
			name: "Resident Card",
			checked: false
		},
		{
			name: "Title Front",
			checked: false
		},
		{
			name: "Title Back",
			checked: false
		},
		{
			name: "Paystub",
			checked: false
		},
		{
			name: "Marriage Certificate",
			checked: false
		},
		{
			name: "Death Certificate",
			checked: false
		},
		{
			name: "Passport",
			checked: false
		},
		{
			name: "Income Taxes",
			checked: false
		},
		{
			name: "Bank Statement",
			checked: false
		}];
		
		this.selData = [{
			name: "Driver License Front",
			checked: true
		},
		{
			name: "Driver License Back",
			checked: true
		},
		{
			name: "Registration",
			checked: true
		},
		{
			name: "Insurance Card",
			checked: true
		},
		{
			name: "Social Security Card",
			checked: false
		},
		{
			name: "Resident Card",
			checked: false
		},
		{
			name: "Title Front",
			checked: false
		},
		{
			name: "Title Back",
			checked: false
		},
		{
			name: "Paystub",
			checked: false
		},
		{
			name: "Marriage Certificate",
			checked: false
		},
		{
			name: "Death Certificate",
			checked: false
		},
		{
			name: "Passport",
			checked: false
		},
		{
			name: "Income Taxes",
			checked: false
		},
		{
			name: "Bank Statement",
			checked: false
		}];

		this.getBorData = function () {
			
			return this.borData;
		};
		
		this.getCobData = function () {
			
			return this.cobData;
		};
		
		this.getSellerData = function () {
			
			return this.selData;
		};
		
		
	});