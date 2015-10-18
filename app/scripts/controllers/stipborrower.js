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
    $scope.fileObject = {};
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
   	    	  $scope.fileObject = file
   	    	  $scope.addFiletoCategory(file,self.index,'BO')
   	      });
   	      this.on('sending',function (file,xhr,formData){
	    	  formData.append('data','value');
	      });
   	  	this.on('success',function (file){
	      });
   	
   	      }
  	};
  	 
  	 $scope.fileCoUploadConfig = {
  	   	      init: function() {
  	   	      this.on('addedfile',function (file){
  	   	    	  $scope.fileObject = file
  	   	    	  $scope.addFiletoCategory(file,self.index,'CO')
  	   	      });
  	   	      this.on('sending',function (file,xhr,formData){
  		    	  formData.append('data','value');
  		      });
  	   	  	this.on('success',function (file){
  		      });
  	   	
  	   	      }
  	  	};
  	 
	 $scope.fileSeUploadConfig = {
 	   	      init: function() {
 	   	      this.on('addedfile',function (file){
 	   	    	  $scope.fileObject = file
 	   	    	  $scope.addFiletoCategory(file,self.index,'SE')
 	   	      });
 	   	      this.on('sending',function (file,xhr,formData){
 		    	  formData.append('data','value');
 		      });
 	   	  	this.on('success',function (file){
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
  		for(var i=0;i<$scope.borrowerStip.length;i++){
			if($scope.borrowerStip[i].checked){
					var obj = {};
					obj.name = $scope.borrowerStip[i].name;
					obj.checked = false;
					obj.files = [];
					
					$scope.bData.push(obj);
			}
		} 
  	 };
  	self.addCoCategory = function () {
	  		for(var i=0;i<$scope.coborrowerStip.length;i++){
				if($scope.coborrowerStip[i].checked){
						var obj = {};
						obj.name = $scope.coborrowerStip[i].name;
						obj.checked = false;
						obj.files = [];
						$scope.cData.push(obj);
				}
			} 
	  	 };
		 
	self.addSeCategory = function () {
		  	for(var i=0;i<$scope.sellerStip.length;i++){
				if($scope.sellerStip[i].checked){
						var obj = {};
						obj.name = $scope.sellerStip[i].name;
						obj.checked = false;
						obj.files = [];
						$scope.sData.push(obj);
				}
			} 
		   };
 /* ***************************UPDATING CATEGORIES ************************ */
		  	 
  	 self.updateBoCategory = function () {
  		for(var i=0;i<$scope.borrowerStip.length;i++){
			if($scope.borrowerStip[i].checked){
				var elementPos = $scope.bData.map(function(x) {return x.name; }).indexOf($scope.borrowerStip[i].name);
				if(elementPos<0){
					var obj = {};
					obj.name = $scope.borrowerStip[i].name;
					obj.checked = false;
					obj.files = [];
					$scope.bData.push(obj);
				}
			}else{
				//remove category if already present and marked removed
				if($scope.bData.length>0){
					var elementPos = $scope.bData.map(function(x) {return x.name; }).indexOf($scope.borrowerStip[i].name);
					if(elementPos>-1){
						$scope.bData.splice(elementPos,1);
					}
				}
			}
		} 
  	 };
  	 
  	 self.updateCoCategory = function () {
   		for(var i=0;i<$scope.coborrowerStip.length;i++){
 			if($scope.coborrowerStip[i].checked){
 				var elementPos = $scope.cData.map(function(x) {return x.name; }).indexOf($scope.coborrowerStip[i].name);
 				if(elementPos<0){
 					var obj = {};
 					obj.name = $scope.coborrowerStip[i].name;
 					obj.checked = false;
 					obj.files = [];
 					$scope.cData.push(obj);
 				}
 			}else{
 				//remove category if already present and marked removed
 				if($scope.cData.length>0){
 					var elementPos = $scope.cData.map(function(x) {return x.name; }).indexOf($scope.coborrowerStip[i].name);
 					if(elementPos>-1){
 						$scope.cData.splice(elementPos,1);
 					}
 				}
 			}
 		} 
   	 };
   	 
 	 self.updateSeCategory = function () {
    		for(var i=0;i<$scope.sellerStip.length;i++){
  			if($scope.sellerStip[i].checked){
  				var elementPos = $scope.sData.map(function(x) {return x.name; }).indexOf($scope.sellerStip[i].name);
  				if(elementPos<0){
  					var obj = {};
  					obj.name = $scope.sellerStip[i].name;
  					obj.checked = false;
  					obj.files = [];
  					$scope.sData.push(obj);
  				}
  			}else{
  				//remove category if already present and marked removed
  				if($scope.sData.length>0){
  					var elementPos = $scope.sData.map(function(x) {return x.name; }).indexOf($scope.sellerStip[i].name);
  					if(elementPos>-1){
  						$scope.sData.splice(elementPos,1);
  					}
  				}
  			}
  		} 
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
		if((obj.url!=null || obj.url!='') && obj.type=='application/pdf'){
			var n = {};
			n.url = obj.url;
			 PDFJS.getDocument(n).then(function(t){
				 t.getPage(1).then(function(e){
					
					 var f = document.createElement('canvas');
					
						var p = f.getContext('2d');
		                var t = e.getViewport(1);
		                f.height = t.height, f.width = t.width;
		                var n = {
		                    canvasContext: p,
		                    viewport: t
		                }
	            
	                e.render(n).then(function(){
			            obj.src = f.toDataURL('image/png');
			            switch(category){
			            case 'BO':
			            	$scope.bData[index].files.push(obj);
			            break;
			            case 'CO':
			            	$scope.cData[index].files.push(obj);
			            break;
			            case 'SE':
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
			    	obj.src = e.target.result;
			    	  switch(category){
			            case 'BO':
			            	$scope.bData[index].files.push(obj);
			            break;
			            case 'CO':
			            	$scope.cData[index].files.push(obj);
			            break;
			            case 'SE':
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
		if(event.target.checked){
			for(var i=0;i<size;i++){
				$scope.bData[index].files[i].checked = true;
				$scope.$emit('updateFileCount', true);   /* selected file count update is happening in home 
															controller which is parent controller
															being a child we need to emit an event to update file count in parent*/
			}
		}else{
			for(var i=0;i<size;i++){
				$scope.bData[index].files[i].checked = false;
				$scope.$emit('updateFileCount', false);
			}
		}
	};
	
	$scope.updateCOCheckboxes = function (event,index) {
		var size = $scope.cData[index].files.length;
		if(event.target.checked){
			for(var i=0;i<size;i++){
				$scope.cData[index].files[i].checked = true;
				$scope.$emit('updateFileCount', true);
			}
		}else{
			for(var i=0;i<size;i++){
				$scope.cData[index].files[i].checked = false;
				$scope.$emit('updateFileCount', false);
			}
		}
	};
	
	$scope.updateSECheckboxes = function (event,index) {
		var size = $scope.sData[index].files.length;
		if(event.target.checked){
			for(var i=0;i<size;i++){
				$scope.sData[index].files[i].checked = true;
				$scope.$emit('updateFileCount', true);
			}
		}else{
			for(var i=0;i<size;i++){
				$scope.sData[index].files[i].checked = false;
				$scope.$emit('updateFileCount', false);
			}
		}
	};
	
	
/************************** Listening to Delete Event *******************************/
	$scope.$on('deleteFiles',function(){
		$scope.removeBOFiles();
		$scope.removeCOFiles();
		$scope.removeSEFiles();
	});


	$scope.removeBOFiles = function () {
		for(var i =0;i<$scope.bData.length;i++){
			var temp = [];
			for(var j=0;j<$scope.bData[i].files.length;j++){
				if(!$scope.bData[i].files[j].checked){
					temp.push($scope.bData[i].files[j]);
				}else{
					$scope.$emit('updateFileCount', false);
				}
			}
			$scope.bData[i].files = temp;
			if($scope.bData[i].files.length<=0){
				$scope.bData[i].checked=false;
			}
		}
	};
	$scope.removeCOFiles = function () {
		
		for(var i =0;i<$scope.cData.length;i++){
			var temp = [];
			for(var j=0;j<$scope.cData[0].files.length;j++){
				if(!$scope.cData[i].files[j].checked){
					temp.push($scope.cData[i].files[j]);
				}else{
					$scope.$emit('updateFileCount', false);
				}
			}
			$scope.cData[i].files = temp;
			if($scope.cData[i].files.length<=0){
				$scope.cData[i].checked=false;
			}
		}
	};
	$scope.removeSEFiles = function () {
		for(var i =0;i<$scope.sData.length;i++){
			var temp = [];
			for(var j=0;j<$scope.sData[i].files.length;j++){
				if(!$scope.sData[i].files[j].checked){
					temp.push($scope.sData[i].files[j]);
				}else{
					$scope.$emit('updateFileCount', false);
				}
			}
			$scope.sData[i].files = temp;
			if($scope.sData[i].files.length<=0){
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
	        				var obj = {};
	    					obj.type = 'Borrower';
	    					obj.subTypes = [];
	        				for(var i=0;i<$scope.bData.length;i++){
	        					obj.subTypes.push($scope.bData[i].name);
	        				}
	        				stipData.push(obj);
	        				var obj = {};
	    					obj.type = 'Co-Borrower';
	    					obj.subTypes = [];
	        				for(var j=0;j<$scope.cData.length;j++){
	        					obj.subTypes.push($scope.cData[j].name);
	        				}
	        				stipData.push(obj);
	        				var obj = {};
	    					obj.type = 'Seller';
	    					obj.subTypes = [];
	        				for(var k=0;k<$scope.sData.length;k++){
	        					obj.subTypes.push($scope.sData[k].name);
	        				}
	        				stipData.push(obj);
	        				return stipData;
	        			}
	        		}
	    	});


	    	modalInstance.result.then(function (data) {
	    		$scope.selectedSubCategory['exType'] = data.expirationType;
	    		$scope.selectedSubCategory['exDate'] = data.getExpDate;
	    		$scope.selectedSubCategory['paperworkCheck'] = data.expirationType == 'Paperwork OK'?true:false;

		    });

	  	};

	  	$scope.verifyAgain = function(clickedParent){
	  		$scope.selectedSubCategoryVerify =  clickedParent;
	  		$scope.selectedSubCategoryVerify['paperworkCheck'] = false;
	  		$scope.selectedSubCategoryVerify['exDate'] = undefined;
	  	};

  	init();
});
