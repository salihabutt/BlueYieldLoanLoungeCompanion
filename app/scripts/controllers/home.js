'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:HomeCtrl
 * @description # HomeCtrl Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
.controller('HomeCtrl', ['$scope','$http','pdfDelegate','$modal',function($scope, $http, pdfDelegate, $modal) {
			var self = this,
			init = function (){
				self.loanPkgCheck(); 
			}; 
			$scope.selFileCount = 0;
			$scope.showFile = false;
			$scope.isPdf = false;
			$scope.fileToDisplay = {};
			$scope.imagesToDisplay = [];
			$scope.showThumbnail = false;
			$scope.LoanPackText = "";
			$scope.pdfToProcess = [];
			$scope.imagesToProcess = [];
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
				name : 'Gaurantee of Title (Dealer)',
				check : false
			}, {
				name : 'Warranty Contract',
				check : false
			}, {
				name : 'Vehicle Bill of Sale',
				check : false
			}, {
				name : 'Power of Attorney (Seller)',
				check : false
			}, {
				name : 'Credit/Security Agreement',
				check : false
			}, {
				name : 'Fixed Rate Promotion Addendum',
				check : false
			} ];
			
			$scope.employee = {
					date : '',
					phone : '',
					time : '',
					position : '',
					name : '',
					options: ['AM', 'PM'],
					selected: 'AM',
					value: 'VERIFY EMPLOYEMENT',
					verified: false
			};
			
			$scope.customer = {
					date : '',
					time : '',
					name :'',
					options: ['AM', 'PM'],
					selected: 'AM',
					value: 'VERIFY CUSTOMER IDENTIFICATION',
					verified: false
			};
			
/***************************** Methods for Home - some methods are being used in child controllers(fileupload,stipborrower etc)************************************************** */
				
			$scope.checkTime = function (type) {
				switch (type) {
				case 'customer':
					 if (!self.isEmpty($scope.customer.time)) {
						if ($scope.customer.time.substring(0,1) === '1') {
							if (parseInt($scope.customer.time.substring(1,2))>2) {
								$scope.customer.time = '';
							}
						}
					}
					 break;
				case 'employee':
					if (!self.isEmpty($scope.employee.time)) {
						if ($scope.employee.time.substring(0,1) === '1') {
							if (parseInt($scope.employee.time.substring(1,2))>2) {
								$scope.employee.time = '';
							}
						}
					}
					break;
				}
				
			};
			
			 self.isEmpty = function (obj) {
	    		   for (var prop in obj) {
	    			  if (obj.hasOwnProperty(prop)) {
	    		            return false;
	    			  }
	    		  	}
	    		    return true;
	    	};
	    	
			self.loanPkgCheck = function () {
				var note = "The following items are missing from your Loan Package:";
				var size = $scope.loanPkgChecklist.length;
				for (var i = 0; i < size; i++) {
					if (!$scope.loanPkgChecklist[i].check) {
						note = note + "\n" + $scope.loanPkgChecklist[i].name;
					}
				}
				$scope.LoanPackText = note;	
			};	 

			$scope.loadNewFile = function(url) {
			     pdfDelegate
			        .$getByHandle('my-pdf-container')
			        .load(url);		
			};
			
			$scope.openMergePopup = function () {
					$modal.open({
			    		animation: false,
				    	templateUrl: 'views/mergefilepopup.html',
				    	controller: 'mergefilePopupCtrl',
				    	windowClass: 'modal-mergefiles'
			    	});
					
			};
			
			$scope.openDeletePopup = function (type) {
				var modalInstance = $modal.open({
		    		animation: false,
			    	templateUrl: 'views/deletepopup.html',
			    	controller: 'delfilePopupCtrl',
			    	windowClass: 'modal-deletefiles'
		    	});
				modalInstance.result.then(function () {
					if (type === 'single') {
						self.deleteCurrent();
					}else{
					$scope.deleteFiles();
					}
				});
			};
			
			$scope.updateFileCount = function (e){
				var checkbox = e.target;
				checkbox.checked? $scope.selFileCount++: $scope.selFileCount--;
				self.saveDocForPrinting();
			};
		
			$scope.$on('updateFileCount',function (event,data) {
			if (data) {
				$scope.selFileCount++;
				self.saveDocForPrinting();
			}else {
				if ($scope.selFileCount > 0) {
					$scope.selFileCount--;
					self.saveDocForPrinting();
				}
			}
			});
			
			$scope.previewDoc =  function (obj,category) {
				$scope.imagesToDisplay = [];
				$scope.showFile = true;
				$scope.fileToDisplay= obj;
				$scope.fileToDisplay.category = category;
				if (obj.type === 'application/pdf') {
					$scope.isPdf = true;
					$scope.loadNewFile(obj.url);
				}else {
					$scope.isPdf = false;
					$scope.fileToDisplay.src = obj.src;
					obj.category = category;
					$scope.imagesToDisplay.push(obj);
				}
				
			};	
			
			$scope.preivewMergedImages = function (array) {
				$scope.imagesToDisplay = [];
				$scope.showFile = true;
				$scope.isPdf = false;
				var size = array.length;
				for (var i = 0; i < size; i++) {
					var obj = {};
					if (obj.type !== 'application/pdf') {
						obj.name = array[i].name;
						obj.src = array[i].src;
					}
					$scope.imagesToDisplay.push(obj);
				}
			}

			$scope.toggleThumbnail =  function (val){
				$scope.showThumbnail = val;
			};
			
			$scope.deleteFiles = function () {
				if ($scope.selFileCount>0) {
					self.removeSendCustData();
					self.removeRecCustData();
					$scope.$broadcast('deleteFiles');
					self.saveDocForPrinting();   // update files for other process like print,download
					self.updateFilesToProcess();
				}
			};
			
			self.removeSendCustData = function () {
				var temp = [];
				var size = $scope.sendCustfiles.length;
				for (var i = 0; i < size; i++) {
					 if (!$scope.sendCustfiles[i].checked) {
						temp.push($scope.sendCustfiles[i]);
					}else {
						$scope.selFileCount--;
					}
				}
				$scope.sendCustfiles = temp;
			};
			
			self.removeRecCustData = function () {
				var temp = [];
				var size = $scope.recCustfiles.length;
				for (var i = 0; i < size; i++) {
					if (!$scope.recCustfiles[i].checked) {
						temp.push($scope.recCustfiles[i]);
					}else {
						$scope.selFileCount--;
					}
				}
				$scope.recCustfiles = temp;
			};
			
			self.updateFilesToProcess = function () {
				var size = $scope.imagesToDisplay.length;
				var index = 0;
				var parentindex = 0;
				if($scope.fileToDisplay.type === 'application/pdf'){
					$scope.fileToDisplay = {};
					$scope.showFile = false;
				}
				for (var i = 0;i < size; i++) {
					switch ($scope.imagesToDisplay[i].category) {
					case 'SC':
						index = $scope.sendCustfiles.map(function(x) {return x.id; }).indexOf($scope.imagesToDisplay[i].id);
						if (index<0) {
							$scope.imagesToDisplay.splice(index,1);
							$scope.fileToDisplay = {};
							$scope.showFile = false;
						}
						break;
					case 'RC':
						index = $scope.recCustfiles.map(function(x) {return x.id; }).indexOf($scope.imagesToDisplay[i].id);
						if (index<0) {
							$scope.imagesToDisplay.splice(index,1);
							$scope.fileToDisplay = {};
							$scope.showFile = false;
						}
						break;
					case 'BO':
						parentindex = $scope.bData.map(function(x) {return x.id; }).indexOf($scope.imagesToDisplay[i].parentid);
						index = $scope.bData[parentindex].files.map(function(x) {return x.id; }).indexOf($scope.imagesToDisplay[i].id);
						if (index<0) {
							$scope.imagesToDisplay.splice(index,1);
							$scope.fileToDisplay = {};
							$scope.showFile = false;
						}
						break;
					case 'CO':
						parentindex = $scope.cData.map(function(x) {return x.id; }).indexOf($scope.imagesToDisplay[i].parentid);
						index = $scope.cData[parentindex].files.map(function(x) {return x.id; }).indexOf($scope.imagesToDisplay[i].id);
						if (index<0) {
							$scope.imagesToDisplay.splice(index,1);
							$scope.fileToDisplay = {};
							$scope.showFile = false;
						}
						break;
					case 'SE':
						parentindex = $scope.sData.map(function(x) {return x.id; }).indexOf($scope.imagesToDisplay[i].parentid);
						index = $scope.sData[parentindex].files.map(function(x) {return x.id; }).indexOf($scope.imagesToDisplay[i].id);
						if (index<0) {
							$scope.imagesToDisplay.splice(index,1);
							$scope.fileToDisplay = {};
							$scope.showFile = false;
						}
						break;
					}
				}
			};
			
			self.deleteCurrent = function () {
				var index = 0;
				var parentindex = 0;				
				switch ($scope.fileToDisplay.category) {
				case 'SC':
					index = $scope.sendCustfiles.map(function(x) {return x.id; }).indexOf($scope.fileToDisplay.id);
					if (index>=0) {
						$scope.sendCustfiles.splice(index,1);
					}
					break;
				case 'RC':
					index = $scope.recCustfiles.map(function(x) {return x.id; }).indexOf($scope.fileToDisplay.id);
					if (index>=0) {
						$scope.recCustfiles.splice(index,1);
					}
					break;
				case 'BO':
					parentindex = $scope.bData.map(function(x) {return x.id; }).indexOf($scope.fileToDisplay.parentid);
					index = $scope.bData[parentindex].files.map(function(x) {return x.id; }).indexOf($scope.fileToDisplay.id);
					if (index>=0) {
						$scope.bData[parentindex].files.splice(index,1);
					}
					break;
				case 'CO':
					parentindex = $scope.cData.map(function(x) {return x.id; }).indexOf($scope.fileToDisplay.parentid);
					index = $scope.cData[parentindex].files.map(function(x) {return x.id; }).indexOf($scope.fileToDisplay.id);
					if (index>=0) {
						$scope.cData[parentindex].files.splice(index,1);
					}
					break;
				case 'SE':
					parentindex = $scope.sData.map(function(x) {return x.id; }).indexOf($scope.fileToDisplay.parentid);
					index = $scope.sData[parentindex].files.map(function(x) {return x.id; }).indexOf($scope.fileToDisplay.id);
					if (index>=0) {
						$scope.sData[parentindex].files.splice(index,1);
					}
					break;
				}
				if ($scope.fileToDisplay.type === 'application/pdf'){
					$scope.fileToDisplay = {};
					$scope.showFile = false;
				}else {
					self.updateFilesToProcess();
				}
				
			};
	
			
			self.saveDocForPrinting = function () {
				$scope.pdfToProcess = [];
				$scope.imagesToProcess = [];
				self.addFilesForPrint($scope.sendCustfiles);
				self.addFilesForPrint($scope.recCustfiles);
				self.addBCSFilesForPrint($scope.bData);
				self.addBCSFilesForPrint($scope.cData);
				self.addBCSFilesForPrint($scope.sData);
			};
			
			self.addBCSFilesForPrint = function (array) {   //Borrower,Co Borrower,Seller files 
				var size = array.length;
				for (var i = 0; i < size ; i++) {
					self.addFilesForPrint(array[i].files);
				}
			};
			
			self.addFilesForPrint = function (array) {
				var size = array.length;
				for (var i = 0; i < size; i++) {
					 if (array[i].checked) {
						if (array[i].type === 'application/pdf') {
							$scope.pdfToProcess.push(array[i]);
						}else {
							$scope.imagesToProcess.push(array[i]);
						}
					}
				}
			};
			
			$scope.downloadFiles = function () {
				var fileToDownload = $scope.pdfToProcess;
				var size = $scope.pdfToProcess.length;
				for (var i = 0; i < size; i++) {
					self.downloadPdfDocs(fileToDownload[i]);
				}
				fileToDownload = $scope.imagesToProcess;
				var sizeimg = $scope.imagesToProcess.length;
				for (var j = 0; j < sizeimg; j++) {
					self.downloadImageDocs(fileToDownload[j]);
				}
				
			}
			
			// two functions are made just for demo purposes to show pdf and image download
			/* TODO: this function will get update once integration is done and url of files will plugin */
			self.downloadPdfDocs = function (item){
				  var xhr = new XMLHttpRequest();
				  xhr.responseType = 'blob';
				  xhr.onload = function() {
				    var a = document.createElement('a');
				    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
				    a.download = item.name; // Set the file name.
				    a.style.display = 'none';
				    document.body.appendChild(a);
				    a.click();
				    //delete a;
				  };
				  var curUrl = window.location.href;
				  curUrl = curUrl.split('#')[0];
				  xhr.open('GET', curUrl+'/images/material-design.pdf'); //TODO:url will be replaced here with actual file url coming from cloud
				  xhr.send();
			};
			
			self.downloadImageDocs = function (item){
				  var xhr = new XMLHttpRequest();
				  xhr.responseType = 'blob';
				  xhr.onload = function() {
				    var a = document.createElement('a');
				    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
				    a.download = item.name; // Set the file name.
				    a.style.display = 'none';
				    document.body.appendChild(a);
				    a.click();
				    //delete a;
				  };
				  var curUrl = window.location.href;
				  curUrl = curUrl.split('#')[0];
				  xhr.open('GET', curUrl+'images/im_logo@2x.png'); //url will be replaced here
				  xhr.send();
			};
			
			self.downloadCurrentFile = function (){
				var fileToDownload = $scope.fileToDisplay;
				  var xhr = new XMLHttpRequest();
				  xhr.responseType = 'blob';
				  xhr.onload = function() {
				    var a = document.createElement('a');
				    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
				    a.download = fileToDownload.name; // Set the file name.
				    a.style.display = 'none';
				    document.body.appendChild(a);
				    a.click();
				    //delete a;
				  };
				  var curUrl = window.location.href;
				  curUrl = curUrl.split('#')[0];
				  if (fileToDownload.type === 'application/pdf') {
					  xhr.open('GET', curUrl+'/images/material-design.pdf');
				  }else {
				  xhr.open('GET', curUrl+'images/im_logo@2x.png'); //url will be replaced here
				  }
				  xhr.send();
			};
			
			$scope.verifyCustomer = function () {
				$scope.customer.verified = true;
				$scope.customer.value= 'CUSTOMER IDENTIFICATION VERIFIED';
			};
			
			$scope.verifyEmployee =function () {
				$scope.employee.verified = true;
				$scope.employee.value='EMPLOYMENT VERIFIED';
			};
			
			$scope.sendLoanPkgEmail = function () {
				
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
