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
			id: 1,
			name: "Driver's License Front",
			checked: true
		},
		{
			id: 2,
			name: "Driver's License Back",
			checked: true
		},
		{
			id: 3,
			name: "Registration",
			checked: true
		},
		{
			id: 4,
			name: "Insurance Card",
			checked: true
		},
		{
			id: 5,
			name: "Social Security Card",
			checked: false
		},
		{
			id: 6,
			name: "Resident Card",
			checked: false
		},
		{
			id: 7,
			name: "Title Front",
			checked: false
		},
		{
			id: 8,
			name: "Title Back",
			checked: false
		},
		{
			id: 9,
			name: "Paystub",
			checked: false
		},
		{
			id: 10,
			name: "Marriage Certificate",
			checked: false
		},
		{
			id: 11,
			name: "Death Certificate",
			checked: false
		},
		{
			id: 12,
			name: "Passport",
			checked: false
		},
		{
			id: 13,
			name: "Income Taxes",
			checked: false
		},
		{
			id: 14,
			name: "Bank Statement",
			checked: false
		}];

		this.cobData = [{
			id: 1,
			name: "Driver's License Front",
			checked: true
		},
		{
			id: 2,
			name: "Driver's License Back",
			checked: true
		},
		{
			id: 3,
			name: "Registration",
			checked: true
		},
		{
			id: 4,
			name: "Insurance Card",
			checked: true
		},
		{
			id: 5,
			name: "Social Security Card",
			checked: false
		},
		{
			id: 6,
			name: "Resident Card",
			checked: false
		},
		{
			id: 7,
			name: "Title Front",
			checked: false
		},
		{
			id: 8,
			name: "Title Back",
			checked: false
		},
		{
			id: 9,
			name: "Paystub",
			checked: false
		},
		{
			id: 10,
			name: "Marriage Certificate",
			checked: false
		},
		{
			id: 11,
			name: "Death Certificate",
			checked: false
		},
		{
			id: 12,
			name: "Passport",
			checked: false
		},
		{
			id: 13,
			name: "Income Taxes",
			checked: false
		},
		{
			id: 14,
			name: "Bank Statement",
			checked: false
		}];
		
		this.selData = [{
			id: 1,
			name: "Driver's License Front",
			checked: true
		},
		{
			id: 2,
			name: "Driver's License Back",
			checked: true
		},
		{
			id: 3,
			name: "Registration",
			checked: true
		},
		{
			id: 4,
			name: "Insurance Card",
			checked: true
		},
		{
			id: 5,
			name: "Social Security Card",
			checked: false
		},
		{
			id: 6,
			name: "Resident Card",
			checked: false
		},
		{
			id: 7,
			name: "Title Front",
			checked: false
		},
		{
			id: 8,
			name: "Title Back",
			checked: false
		},
		{
			id: 9,
			name: "Paystub",
			checked: false
		},
		{
			id: 10,
			name: "Marriage Certificate",
			checked: false
		},
		{
			id: 11,
			name: "Death Certificate",
			checked: false
		},
		{
			id: 12,
			name: "Passport",
			checked: false
		},
		{
			id: 13,
			name: "Income Taxes",
			checked: false
		},
		{
			id: 14,
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