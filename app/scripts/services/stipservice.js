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
			check: true
		},
		{
			name: "Driver License Back",
			check: true
		},
		{
			name: "Registration",
			check: true
		},
		{
			name: "Insurance Card",
			check: true
		},
		{
			name: "Social Security Card",
			check: false
		},
		{
			name: "Resident Card",
			check: false
		},
		{
			name: "Title Front",
			check: false
		},
		{
			name: "Title Back",
			check: false
		},
		{
			name: "Paystub",
			check: false
		},
		{
			name: "Marriage Certificate",
			check: false
		},
		{
			name: "Death Certificate",
			check: false
		},
		{
			name: "Passport",
			check: false
		},
		{
			name: "Income Taxes",
			check: false
		},
		{
			name: "Bank Statement",
			check: false
		}];

		this.cobData = [{
			name: "Driver License Front",
			check: true
		},
		{
			name: "Driver License Back",
			check: true
		},
		{
			name: "Registration",
			check: true
		},
		{
			name: "Insurance Card",
			check: true
		},
		{
			name: "Social Security Card",
			check: false
		},
		{
			name: "Resident Card",
			check: false
		},
		{
			name: "Title Front",
			check: false
		},
		{
			name: "Title Back",
			check: false
		},
		{
			name: "Paystub",
			check: false
		},
		{
			name: "Marriage Certificate",
			check: false
		},
		{
			name: "Death Certificate",
			check: false
		},
		{
			name: "Passport",
			check: false
		},
		{
			name: "Income Taxes",
			check: false
		},
		{
			name: "Bank Statement",
			check: false
		}];

		this.selData = {};
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