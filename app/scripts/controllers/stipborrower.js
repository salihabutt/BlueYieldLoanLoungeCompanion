'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('StipBorrowerCtrl', function ($scope, $modal, stipDataService) {
	var self = this,
	 init = function () {
    	self.addBoCategory();
    	self.addCoCategory();
    	self.addSeCategory();
    };
    $scope.borrowerStip = stipDataService.getBorData();
    $scope.coborrowerStip = stipDataService.getCobData();
    $scope.sellerStip = stipDataService.getSellerData();
    self.index = 0;
    $scope.selectedSubCategory = {};
    $scope.verifyBtnCheck = false;
  
   

    self.open = function (type) {
    	var modalInstance = $modal.open({
    		animation: true,
    		templateUrl: 'views/stipborrowerpopup.html',
    		controller: 'stipborrowerPopupCtrl',
    		resolve: {
    			subject: function () {
    				var subject = '';
    				switch (type) {
            	 		case 'BO':
            	 			subject = 'Borrower';
            	 		break;
            	 		case 'CO':
            	 			subject = 'Co-borrower';
            	 		break;
            	 		default:
            	 			subject = 'Seller';
            	 		break;
    				}
    				return subject;
    			}
    		}
    	});
    	modalInstance.result.finally(function () {
    		self.updateBoCategory();
    		self.updateCoCategory();
    		self.updateSeCategory();
    	});
  	};
  	
  /* *********************** Dropzone File Configurations ************************************/
  	 $scope.fileBoUploadConfig = {
   	      init: function() {
   	      this.on('addedfile',function (file){
   	    	  $scope.addFiletoCategory(file,self.index,'BO');
   	      });
   	      this.on('sending',function (file,xhr,formData){
	    	  formData.append('data','value');
	      });
   	  	this.on('success',function (){
	      });
   	
   	      }
  	};
  	 
  	 $scope.fileCoUploadConfig = {
  	   	      init: function() {
  	   	      this.on('addedfile',function (file){
  	   	    	  $scope.addFiletoCategory(file,self.index,'CO');
  	   	      });
  	   	      this.on('sending',function (file,xhr,formData){
  		    	  formData.append('data','value');
  		      });
  	   	  	this.on('success',function (){
  		      });
  	   	
  	   	      }
  	  	};
  	 
	 $scope.fileSeUploadConfig = {
 	   	      init: function() {
 	   	      this.on('addedfile',function (file){
 	   	    	  $scope.addFiletoCategory(file,self.index,'SE');
 	   	      });
 	   	      this.on('sending',function (file,xhr,formData){
 		    	  formData.append('data','value');
 		      });
 	   	  	this.on('success',function (){
 		      });
 	   	
 	   	      }
 	  	};
  	 
	 /* this function is setting index of category whose file upload is clicked. 
	  	this way we can make one file config that will operate for all categories available*/
  	 $scope.setcatIndex = function (index) {
  		self.index = index;
  	 };
 /* ************************* ADDING IN CATEGORY ****************************/	 
  	self.addBoCategory = function () {
  		var size =  $scope.borrowerStip.length;
  		for (var i = 0; i < size; i++) {
			if ($scope.borrowerStip[i].checked) {
					var obj = {};
					obj.id = $scope.borrowerStip[i].id;
					obj.name = $scope.borrowerStip[i].name;
					obj.checked = false;
					obj.files = [];
					$scope.bData.push(obj);
			}
		} 
  		$scope.bData.sort(function(a, b){
  		    if (a.name < b.name) {
  		    	return -1;
  		    }
  		    if (a.name > b.name) { 
  		    	return 1;
  		    }  
  		    return 0;
  		});
  	 };
  	 
  	self.addCoCategory = function () {
  		var size = $scope.coborrowerStip.length;
	  		for (var i = 0; i < size; i++) {
				if ($scope.coborrowerStip[i].checked) {
						var obj = {};
						obj.id = $scope.coborrowerStip[i].id;
						obj.name = $scope.coborrowerStip[i].name;
						obj.checked = false;
						obj.files = [];
						$scope.cData.push(obj);
				}
			} 
	  		$scope.cData.sort(function(a, b){
	  		    if (a.name < b.name) {
	  		    	return -1;
	  		    }
	  		    if (a.name > b.name) {
	  		    	return 1;
	  		    }
	  		    return 0;
	  		});
	 };
		 
	self.addSeCategory = function () {
		var size = $scope.sellerStip.length;
		  	for (var i = 0; i < size; i++) {
				if ($scope.sellerStip[i].checked) {
						var obj = {};
						obj.id = $scope.sellerStip[i].id;
						obj.name = $scope.sellerStip[i].name;
						obj.checked = false;
						obj.files = [];
						$scope.sData.push(obj);
				}
			}
			$scope.sData.sort(function(a, b){
	  		    if (a.name < b.name) {
	  		    	return -1;
	  		    }
	  		    if (a.name > b.name) {
	  		    	return 1;
	  		    }
	  		    return 0;
	  		});
	};
 /* ***************************UPDATING CATEGORIES ************************ */
		  	 
  	 self.updateBoCategory = function () {
  		 var size = $scope.borrowerStip.length;
  		 var elementPos = 0;
  		for (var i = 0; i < size; i++)  {
			if ($scope.borrowerStip[i].checked) {
				elementPos = $scope.bData.map(function(x) {return x.name; }).indexOf($scope.borrowerStip[i].name);
				if(elementPos<0){
					var obj = {};
					obj.name = $scope.borrowerStip[i].name;
					obj.checked = false;
					obj.files = [];
					$scope.bData.push(obj);
				}
			}else {
				//remove category if already present and marked removed
				if($scope.bData.length>0){
					elementPos = $scope.bData.map(function(x) {return x.name; }).indexOf($scope.borrowerStip[i].name);
					if (elementPos>-1) {
						$scope.bData.splice(elementPos,1);
					}
				}
			}
		}
  		$scope.bData.sort(function(a, b){
  		    if (a.name < b.name) {
  		    	return -1;
  		    }
  		    if (a.name > b.name) {
  		    	return 1;
  		    }
  		    return 0;
  		});
  	 };
  	 
  	 self.updateCoCategory = function () {
  		 var size = $scope.coborrowerStip.length;
  		var elementPos = 0;
   		for (var i = 0; i < size; i++) {
 			if ($scope.coborrowerStip[i].checked) {
 				elementPos = $scope.cData.map(function(x) {return x.name; }).indexOf($scope.coborrowerStip[i].name);
 				if (elementPos<0) {
 					var obj = {};
 					obj.name = $scope.coborrowerStip[i].name;
 					obj.checked = false;
 					obj.files = [];
 					$scope.cData.push(obj);
 				}
 			}else{
 				//remove category if already present and marked removed
 				if ($scope.cData.length>0) {
 					elementPos = $scope.cData.map(function(x) {return x.name; }).indexOf($scope.coborrowerStip[i].name);
 					if (elementPos>-1) {
 						$scope.cData.splice(elementPos,1);
 					}
 				}
 			}
 		} 
   		$scope.cData.sort(function(a, b){
  		    if (a.name < b.name) {
  		    	return -1;
  		    }
  		    if (a.name > b.name) {
  		    	return 1;
  		    }
  		    return 0;
  		});
   	 };
   	 
 	 self.updateSeCategory = function () {
 		 	var size = $scope.sellerStip.length;
 		 	var elementPos = 0;
    		for (var i = 0; i < size; i++) {
  			if ($scope.sellerStip[i].checked) {
  				elementPos = $scope.sData.map(function(x) {return x.name; }).indexOf($scope.sellerStip[i].name);
  				if (elementPos<0) {
  					var obj = {};
  					obj.name = $scope.sellerStip[i].name;
  					obj.checked = false;
  					obj.files = [];
  					$scope.sData.push(obj);
  				}
  			}else {
  				//remove category if already present and marked removed
  				if ($scope.sData.length>0) {
  					elementPos = $scope.sData.map(function(x) {return x.name; }).indexOf($scope.sellerStip[i].name);
  					if (elementPos>-1) {
  						$scope.sData.splice(elementPos,1);
  					}
  				}
  			}
  		}
    		$scope.sData.sort(function(a, b){
      		    if(a.name < b.name) {
      		    	return -1;
      		    }
      		    if(a.name > b.name) {
      		    	return 1;
      		    }
      		    return 0;
      		});
    };
  	 /*   ********** ADDING FILE TO CATEGORY AND GENERATING THUMBNAIL ******************* */
  	   
  	$scope.addFiletoCategory = function (file,index,category) {
  		 var objToPersist = {};
  		 objToPersist.name = file.name;
  		 objToPersist.type= file.type;
  		 objToPersist.url = '/images/relativity.pdf';           // this is static and will be replaced with amazon s3 url for file
  		 objToPersist.checked = false;
  		 objToPersist.date = new Date();
  		$scope.generateThumbnail(objToPersist,index,category,file);
  	 };
  	 
  	$scope.generateThumbnail = function (obj,index,category,file) {
		if ((obj.url !== null || obj.url !== '') && obj.type === 'application/pdf') {
			var pdf = {};
			pdf.url = obj.url;
			 PDFJS.getDocument(pdf).then(function(doc){
				 doc.getPage(1).then(function(event){
					
					 var page = document.createElement('canvas');
					
						var context = page.getContext('2d');
		                var doc = event.getViewport(1);
		                page.height = doc.height;
		                page.width = doc.width;
		                var pdf = {
		                    canvasContext: context,
		                    viewport: doc
		                }
	            
	                event.render(pdf).then(function(){
			            obj.src = page.toDataURL('image/png');
			            var size = 0;
			            switch(category){
			            case 'BO':
			            	size = $scope.bData[index].files.length;
			            	obj.id = size>0?$scope.bData[index].files[size-1].id+1:1;
			            	obj.parentid = $scope.bData[index].id;
			            	$scope.bData[index].files.push(obj);
			            	break;
			            case 'CO':
			            	size = $scope.cData[index].files.length;
			            	obj.id = size>0?$scope.cData[index].files[size-1].id+1:1;
			            	obj.parentid = $scope.cData[index].id;
			            	$scope.cData[index].files.push(obj);
			            	break;
			            case 'SE':
			            	size = $scope.sData[index].files.length;
			            	obj.id = size>0?$scope.sData[index].files[size-1].id+1:1;
			            	obj.parentid = $scope.sData[index].id;
			            	$scope.sData[index].files.push(obj);
			            	break;
			            }
			       		
			            $scope.$apply();	// have to apply scope to update view since it is javascript callback function
					});
	              
			 });
		 });
		}
		else{
			  var reader = new FileReader();
			  reader.onload = function (e) {
				  var size = 0;
			    	obj.src = e.target.result;
			    	  switch(category){
			            case 'BO':
			            	size = $scope.bData[index].files.length;
			            	obj.id = size>0?$scope.bData[index].files[size-1].id+1:1;
			            	obj.parentid = $scope.bData[index].id;
			            	$scope.bData[index].files.push(obj);
			            	break;
			            case 'CO':
			            	size = $scope.cData[index].files.length;
			            	obj.id = size>0?$scope.cData[index].files[size-1].id+1:1;
			            	obj.parentid = $scope.cData[index].id;
			            	$scope.cData[index].files.push(obj);
			            	break;
			            case 'SE':
			            	size = $scope.sData[index].files.length;
			            	obj.id = size>0?$scope.sData[index].files[size-1].id+1:1;
			            	obj.parentid = $scope.sData[index].id;
			            	$scope.sData[index].files.push(obj);
			            	break;
			            }
		            $scope.$apply();
                }
			    reader.readAsDataURL(file);    
		}
	};
	
	// if any of the checkbox is checked we have to update FileSelected count
	$scope.updateCheckboxes = function (event,index) {
		var size = $scope.bData[index].files.length;
		if (event.target.checked) {
			for (var i = 0;i < size; i++){
				if (!$scope.bData[index].files[i].checked) {
					$scope.bData[index].files[i].checked = true;
					$scope.$emit('updateFileCount', true);
				}/* selected file count update is happening in home 
															controller which is parent controller
															being a child we need to emit an event to update file count in parent*/
			}
		}else{
			for (var j = 0;j < size; j++){
				if ($scope.bData[index].files[j].checked) {
					$scope.bData[index].files[j].checked = false;
					$scope.$emit('updateFileCount', false);
				}
			}
		}
	};
	
	$scope.updateCOCheckboxes = function (event,index) {
		var size = $scope.cData[index].files.length;
		if (event.target.checked) {
			for(var i = 0; i < size; i++){
				if (!$scope.cData[index].files[i].checked) {
					$scope.cData[index].files[i].checked = true;
					$scope.$emit('updateFileCount', true);
				}
			}
		}else{
			for(var j = 0; j < size; j++){
				if ($scope.cData[index].files[j].checked) {
					$scope.cData[index].files[j].checked = false;
					$scope.$emit('updateFileCount', false);
				}
			}
		}
	};
	
	$scope.updateSECheckboxes = function (event,index) {
		var size = $scope.sData[index].files.length;
		if (event.target.checked) {
			for (var i = 0; i < size; i++) {
				if (!$scope.sData[index].files[i].checked) {
					$scope.sData[index].files[i].checked = true;
					$scope.$emit('updateFileCount', true);
				}
			}
		}else{
			for (var j = 0; j < size; j++) {
				if ($scope.sData[index].files[j].checked) {
					$scope.sData[index].files[j].checked = false;
					$scope.$emit('updateFileCount', false);
				}
			}
		}
	};
	
	
/************************** Listening to Delete Event *******************************/
	$scope.$on('deleteFiles',function(){
		self.removeBOFiles();
		self.removeCOFiles();
		self.removeSEFiles();
	});

	self.removeBOFiles = function () {
		var size = $scope.bData.length;
		for (var i = 0; i < size; i++) {
			var temp = [];
			var filesize = $scope.bData[i].files.length;
			for (var j = 0; j < filesize; j++) {
				if (!$scope.bData[i].files[j].checked) {
					temp.push($scope.bData[i].files[j]);
				}else{
					$scope.$emit('updateFileCount', false);
				}
			}
			$scope.bData[i].files = temp;
			if ($scope.bData[i].files.length<=0) {
				$scope.bData[i].checked=false;
			}
		}
	};
	
	self.removeCOFiles = function () {
		var size = $scope.cData.length;
		for (var i = 0; i < size; i++) {
			var temp = [];
			var filesize = $scope.cData[i].files.length;
			for (var j = 0; j < filesize; j++) {
				if (!$scope.cData[i].files[j].checked) {
					temp.push($scope.cData[i].files[j]);
				}else {
					$scope.$emit('updateFileCount', false);
				}
			}
			$scope.cData[i].files = temp;
			if ($scope.cData[i].files.length<=0) {
				$scope.cData[i].checked=false;
			}
		}
	};
	
	self.removeSEFiles = function () {
		var size = $scope.sData.length;
		for (var i = 0; i < size; i++) {
			var temp = [];
			var filesize = $scope.sData[i].files.length;
			for (var j = 0; j < filesize; j++) {
				if (!$scope.sData[i].files[j].checked) {
					temp.push($scope.sData[i].files[j]);
				}else {
					$scope.$emit('updateFileCount', false);
				}
			}
			$scope.sData[i].files = temp;
			if ($scope.sData[i].files.length<=0) {
				$scope.sData[i].checked=false;
			}
		}
	};
	
	/* *********************** VERIFY DOCUMENTS ********************************** */
	 $scope.verifyPopupTrigger = function (clickedParent,category) {
	    	$scope.selectedSubCategory =  clickedParent;
	    	var modalInstance = $modal.open({
	    		animation: true,
	    		templateUrl: 'views/verifypopup.html',
	    		controller: 'verifyPopup',
	    		windowClass: 'modal-verify',
	        		resolve: {
	        			title: function (){
	        				var title = '';
	        				switch(category){
	        				case 'BO':
	        					title = 'Verify Borrower\'s ' + clickedParent.name ;
	        				break;
	        				case 'CO':
	        					title = 'Verify Co-Borrower\'s ' + clickedParent.name;
	            			break;
	        				case 'SE':
	        					title = 'Verify Seller\'s ' + clickedParent.name;
	            			break;
	        				}
	        				return title;
	        			},
	    				fileSize: function () {
	    					return clickedParent.files.length;
	    				},
	        			stipnotFoundData: function () {
	        				var stipData = [];
	        				var bObj = {};
	        				var cObj = {};
	        				var sObj = {};
	        				bObj.type = 'Borrower';
	        				bObj.subTypes = [];
	    					var size = $scope.bData.length;
	        				for (var i = 0; i < size; i++) {
	        					bObj.subTypes.push($scope.bData[i].name);
	        					if(category === 'BO' && clickedParent.name === $scope.bData[i].name){
	        						bObj.subTypes.splice(bObj.subTypes.length-1,1);
	        					}
	        				}
	        				stipData.push(bObj);
	        				
	        				cObj.type = 'Co-Borrower';
	        				cObj.subTypes = [];
	    					size = $scope.cData.length;
	        				for (var j = 0; j < size; j++) {
	        					cObj.subTypes.push($scope.cData[j].name);
	        					if(category === 'CO' && clickedParent.name === $scope.cData[j].name){
	        						cObj.subTypes.splice(cObj.subTypes.length-1,1);
	        					}
	        				}
	        				stipData.push(cObj);

	        				sObj.type = 'Seller';
	        				sObj.subTypes = [];
	    					size = $scope.sData.length;
	        				for (var k = 0; k < size; k++) {
	        					sObj.subTypes.push($scope.sData[k].name);
	        					if(category === 'SE' && clickedParent.name === $scope.sData[k].name){
	        						sObj.subTypes.splice(sObj.subTypes.length-1,1);
	        					}
	        				}
	        				stipData.push(sObj);
	        				return stipData;
	        			},
	        			showExpirayDate: function () {
	        				var name =clickedParent.name;
	        				if(name === 'Social Security Card' || name === 'Marriage Certificate' || 
	        						name === 'Death Certificate' || name === 'Paystub' || name === 'Title Back'
	        						|| name === 'Title Front' || name === 'Income Taxes' || name === 'Bank Statement'){
	        					return false;
	        				}
	        				return true;
	        			}
	        		}
	    	});


	    	modalInstance.result.then(function (data) {
	    		$scope.selectedSubCategory.stipStatus = data.stipStatus;
	    		$scope.selectedSubCategory.expDate = data.expDate;
	    		$scope.selectedSubCategory.verifyDate = new Date();
	    		$scope.selectedSubCategory.paperworkCheck = data.stipStatus === 'Paperwork OK'?true:false;
	    		$scope.selectedSubCategory.stipLocation = data.stipLocation.trim() === '-'?'':data.stipLocation;

		    });

	  	};

	  	$scope.verifyAgain = function(clickedParent){
	  		$scope.selectedSubCategoryVerify =  clickedParent;
	  		$scope.selectedSubCategory.stipStatus = '';
	  		$scope.selectedSubCategoryVerify.paperworkCheck = false;
	  		$scope.selectedSubCategoryVerify.expDate = undefined;
	  		$scope.selectedSubCategory.verifyDate= null;
	  		$scope.selectedSubCategory.stipLocation = '';
	  	};

  	init();
});
