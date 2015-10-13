'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:HomeCtrl
 * @description # HomeCtrl Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
.controller('HomeCtrl', ['$scope','pdfDelegate','$modal',function($scope, pdfDelegate, $modal) {
			var self = this,
			init = function (){
				self.loanPackNote(); 
			}; 
			$scope.selFileCount = 0;
			$scope.showFile = true;
			self.loanPkgChecklist = [ {
				name : 'Loneliner Application',
				check : false
			}, {
				name : 'Tier Addendum',
				check : false
			}, {
				name : 'Agreement to Provide Insurance',
				check : false
			}, {
				name : 'Lone Summary Statement',
				check : false
			}, {
				name : 'Title Application',
				check : false
			}, {
				name : 'Authorization for Payoff',
				check : false
			}, {
				name : 'Gaurantee of Title(Dealer)',
				check : false
			}, {
				name : 'Warranty Contract',
				check : false
			}, {
				name : 'Vehicle Bill of Sale',
				check : false
			}, {
				name : 'Power of Attorney(Seller)',
				check : false
			}, {
				name : 'Credit/Security Agreement',
				check : false
			}, {
				name : 'Fixed Rate Promotion Addendum',
				check : false
			} ];
			$scope.employee = {
					date : "",
					phone : "",
					time : "",
					position : "",
					name : "",
					options: ["AM", "PM"],
					selected: "AM"
			};
			
			$scope.customer = {
					date : "",
					time : "",
					name :"",
					options: ["AM", "PM"],
					selected: "AM"
			};
			
			$scope.LoanPackText = "";
			
			self.loanPackNote = function () {
				var note = "the following items are missing from your Loan Package:";
				for (var i=0;i<self.loanPkgChecklist.length;i++){
					if(!self.loanPkgChecklist[i].check){
						note = note + "\n" + self.loanPkgChecklist[i].name;
					}
				}
				$scope.LoanPackText = note;
			};
			
			self.loanPkgCheck = function () {
				self.loanPackNote();	
			};	 

			$scope.loadNewFile = function(url) {
			//	debugger;
			   /*  var a= pdfDelegate
			        .$getByHandle('my-pdf-container')
			        .load(url);	
			        
			     self.generateThumbnail(url);*/
		
				
			    };
			$scope.openMergePopup = function () {
					var modalInstance = $modal.open({
			    		animation: false,
				    	templateUrl: 'views/mergefilepopup.html',
				    	controller: 'mergefilePopupCtrl',
				    	windowClass: 'modal-mergefiles'
			    	});
					
				};
			$scope.openDeletePopup = function () {
				var modalInstance = $modal.open({
		    		animation: false,
			    	templateUrl: 'views/deletepopup.html',
			    	controller: 'delfilePopupCtrl',
			    	windowClass: 'modal-deletefiles'
		    	});
			};
			$scope.updateFileCount = function (e){
				var checkbox = e.target;
				checkbox.checked? $scope.selFileCount++: $scope.selFileCount--;	
			};
			$scope.$on('updateFileCount',function (event,data) {
			if(data){
				$scope.selFileCount++;
			}else{
				$scope.selFileCount--;
			}
			});
				
		init();
						
		}])
		  .controller('mergefilePopupCtrl', function ($scope, $modal, $modalInstance) {
				$scope.mergeFileName = "";
				
			    $scope.ok = function () {
			    	$modalInstance.dismiss('cancel');
			  	};

			    $scope.cancel = function () {
			      $modalInstance.dismiss('cancel');
			    };
			})
			 .controller('delfilePopupCtrl', function ($scope, $modal, $modalInstance) {
		
				
			    $scope.ok = function () {
			    	$modalInstance.dismiss('cancel');
			  	};

			    $scope.cancel = function () {
			      $modalInstance.dismiss('cancel');
			    };
			});
