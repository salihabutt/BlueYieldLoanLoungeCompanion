'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:HomeCtrl
 * @description # HomeCtrl Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp').controller('HomeCtrl',
		function() {
			this.loanPkgChecklist = [ {
				name : 'Loneliner Application',
				type : 'pdf'
			}, {
				name : 'Tier Addendum',
				type : 'pdf'
			}, {
				name : 'Agreement to Provide Insurance',
				type : 'pdf'
			}, {
				name : 'Lone Summary Statement',
				type : 'pdf'
			}, {
				name : 'Title Application',
				type : 'pdf'
			}, {
				name : 'Authorization for Payoff',
				type : 'pdf'
			}, {
				name : 'Gaurantee of Title(Dealer)',
				type : 'pdf'
			}, {
				name : 'Warranty Contract',
				type : 'pdf'
			}, {
				name : 'Vehicle Bill of Sale',
				type : 'pdf'
			}, {
				name : 'Power of Attorney(Seller)',
				type : 'pdf'
			}, {
				name : 'Credit/Security Agreement',
				type : 'pdf'
			}, {
				name : 'Fixed Rate Promotion Addendum',
				type : 'pdf'
			} ];
			this.employee= {
					date: "",
					phone: "",
					time: "",
					position: "",
					name:""
			}
			
			this.customer= {
					date: "",
					time: "",
					name:""
			}
			this.myOptions = ["AM", "PM"];
			this.myModel = "AM";
		});