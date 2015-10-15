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
				$scope.loanPackNote(); 
			}; 
			$scope.selFileCount = 0;
			$scope.showFile = false;
			$scope.isPdf = false;
			$scope.fileToDisplay = {};
			$scope.showThumbnail = false;
			$scope.loanPkgChecklist = [ {
				name : 'Loanliner Application',
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
					selected: "AM",
					value: 'CUSTOMER VERIFIED',
					verified: false
			};
			
			$scope.customer = {
					date : "",
					time : "",
					name :"",
					options: ["AM", "PM"],
					selected: "AM",
					value: 'CUSTOMER IDENTIFICATION VERIFIED',
					verified: false
			};
			
			$scope.LoanPackText = "";
			
			$scope.loanPackNote = function () {
				var note = "The following items are missing from your Loan Package:";
				for (var i=0;i<$scope.loanPkgChecklist.length;i++){
					if(!$scope.loanPkgChecklist[i].check){
						note = note + "\n" + $scope.loanPkgChecklist[i].name;
					}
				}
				$scope.LoanPackText = note;
			};
			
			$scope.loanPkgCheck = function () {
				$scope.loanPackNote();	
			};	 

			$scope.loadNewFile = function(url) {
			     var a= pdfDelegate
			        .$getByHandle('my-pdf-container')
			        .load(url);							
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
				modalInstance.result.then(function () {
					$scope.deleteFiles();
				})
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
			
			$scope.previewDoc =  function (obj) {
				$scope.showFile = true;
				$scope.fileToDisplay.name = obj.name;
				if(obj.type === 'application/pdf'){
					$scope.isPdf = true;
					$scope.loadNewFile(obj.url);
				}else{
					$scope.isPdf = false;
					$scope.fileToDisplay.src = obj.src; 
				}
				
			};	
			$scope.getFormattedName = function (name){
				if(name.length>16){
					name=name.substring(0,16);
					name = name+'...';
				}
				return name;
			};
			$scope.toggleThumbnail =  function (val){
				$scope.showThumbnail = val;
			};
			$scope.deleteFiles = function () {
				if($scope.selFileCount>0){
					$scope.removeSendCustData();
					$scope.removeRecCustData();
					$scope.$broadcast('deleteFiles');
				}
			};
			$scope.removeSendCustData = function () {
				var temp = [];
				for(var i =0;i<$scope.sendCustfiles.length;i++){
					if(!$scope.sendCustfiles[i].checked){
						temp.push($scope.sendCustfiles[i]);
					}else{
						$scope.selFileCount--;
					}
				}
				$scope.sendCustfiles = temp;
			}
			
			$scope.removeRecCustData = function () {
				var temp = [];
				for(var i =0;i<$scope.recCustfiles.length;i++){
					if(!$scope.recCustfiles[i].checked){
						temp.push($scope.recCustfiles[i]);
					}else{
						$scope.selFileCount--;
					}
				}
				$scope.recCustfiles = temp;
			}
			$scope.pdfForPrint = [];
			$scope.imagesForPrint = [];
			$scope.printMultipleFiles = function () {
				var popupWin = window.open('', '_blank', 'width=800,height=600');
				var printContents = document.getElementById('printImages').innerHTML;
				popupWin.document.open();
		        popupWin.document.write('<html><body onload="window.print()">' + printContents + '</html>');
		        popupWin.document.close();
			};
			
			$scope.saveDocForPrinting = function (item) {
				if(item.checked){
				if(item.type== 'application/pdf'){
					$scope.pdfForPrint.push(item);
				}else{
					item.url = 'images/im_logo.png';
					$scope.imagesForPrint.push(item);
				}
				}
			};
			
			
			
		init();
		
		/************** Data for Loan Package *************************/
		$scope.sendCustfiles = [];
 	   	$scope.recCustfiles = [];
 	   	
 	    $scope.bData = [];
 	    $scope.cData = [];
 	    $scope.sData = [];
		/****************** MOdel END *********************************/				
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
			    	$modalInstance.close();
			  	};

			    $scope.cancel = function () {
			      $modalInstance.dismiss('cancel');
			    };
			});
