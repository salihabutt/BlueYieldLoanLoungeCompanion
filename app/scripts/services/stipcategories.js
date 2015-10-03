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
		this.data = [{
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

		this.getBorData() = function () {
			return this.data;
		};
		
		this.getgeCobtData() = function () {
			return this.data;
		};
		
		this.getSellerData() = function () {
			return this.data;
		};
		// Pass the checkbox name to the function
   /*   function getCheckedBoxes(chkboxName) {
        var checkboxes = document.getElementsByName(chkboxName);
        var checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<checkboxes.length; i++) {
           // And stick the checked ones onto an array...
           if (checkboxes[i].checked) {
              checkboxesChecked.push(checkboxes[i]);
           }
        }
        // Return the array if it is non-empty, or null
        return checkboxesChecked.length > 0 ? checkboxesChecked : null;
      }*/
		
		
	});