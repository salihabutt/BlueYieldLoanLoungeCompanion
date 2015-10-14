'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('StipBorrowerCtrl', function ($scope, $modal, stipDataService,$rootScope) {
    $scope.borrowerStip = stipDataService.getBorData();
    $scope.coborrowerStip = stipDataService.getCobData();
    $scope.sellerStip = stipDataService.getSellerData();
    $scope.index = 0;
    $scope.fileObject = {};
    $scope.bData = [];
    $scope.cData = [];
    $scope.sData = [];
    $scope.selectedItem = {};
    $scope.selectedSubCategory = {};
  
    $scope.init = function () {
    	$scope.addBoCategory();
    	$scope.addCoCategory();

    };

   
    $scope.verifyPopupTrigger = function (clickedParent) {
    	
    	$scope.selectedSubCategory =  clickedParent;
    	var modalInstance = $modal.open({
    		animation: true,
    		templateUrl: 'views/verifypopup.html',
    		controller: 'verifyPopup',
    		windowClass: 'modal-verify'
    	});


    	modalInstance.result.then(function (data) {
			$scope.selectedSubCategory["exType"] = data.expirationType;
			$scope.selectedSubCategory["exDate"] = data.getExpDate;

			if(data.expirationType == "Paperwork OK"){
				$scope.selectedSubCategory["paperworkCheck"] = true;
			}

			var elementPos = $scope.bData.map(function(x) {return x.name; }).indexOf($scope.selectedSubCategory.name);
			if(elementPos > -1){	
				$scope.bData[elementPos] = $scope.selectedSubCategory;
			}

	    });

  	};

    $scope.open = function (type) {
    	var modalInstance = $modal.open({
    		animation: true,
    		templateUrl: 'views/stipborrowerpopup.html',
    		controller: 'stipborrowerPopupCtrl',
    		resolve: {
    			subject: function () {
    				var subject = '';
    				switch (type) {
            	 		case 'borrower':
            	 			subject = 'Borrower';
            	 		break;
            	 		case 'co-borrower':
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
    		$scope.updateBoCategory();
    		$scope.updateCoCategory();
    	});
  	};
  	
  	 $scope.fileBoUploadConfig = {
   	      init: function() {
   	      this.on('addedfile',function (file){
   	    	  $scope.fileObject = file
   	    	  $scope.addFiletoCategory(file,$scope.index,'BO')
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
  	   	    	  $scope.addFiletoCategory(file,$scope.index,'CO')
  	   	      });
  	   	      this.on('sending',function (file,xhr,formData){
  		    	  formData.append('data','value');
  		      });
  	   	  	this.on('success',function (file){
  		      });
  	   	
  	   	      }
  	  	};
  	 
  	 $scope.setcatIndex = function (index) {
  		$scope.index = index;
  	 };
  	 
  	 $scope.addBoCategory = function () {
  		for(var i=0;i<$scope.borrowerStip.length;i++){
			if($scope.borrowerStip[i].check){
					var obj = {};
					obj.name = $scope.borrowerStip[i].name;
					obj.check = false;
					obj.files = [];
					
					$scope.bData.push(obj);
			}
		} 
  	 };
	 $scope.addCoCategory = function () {
	  		for(var i=0;i<$scope.coborrowerStip.length;i++){
				if($scope.coborrowerStip[i].check){
						var obj = {};
						obj.name = $scope.coborrowerStip[i].name;
						obj.check = false;
						obj.files = [];
						$scope.cData.push(obj);
				}
			} 
	  	 };
		 
  	 
  	 $scope.updateBoCategory = function () {
  		for(var i=0;i<$scope.borrowerStip.length;i++){
			if($scope.borrowerStip[i].check){
				var elementPos = $scope.bData.map(function(x) {return x.name; }).indexOf($scope.borrowerStip[i].name);
				if(elementPos<0){
					var obj = {};
					obj.name = $scope.borrowerStip[i].name;
					obj.check = false;
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
  	 
  	 $scope.updateCoCategory = function () {
   		for(var i=0;i<$scope.coborrowerStip.length;i++){
 			if($scope.coborrowerStip[i].check){
 				var elementPos = $scope.cData.map(function(x) {return x.name; }).indexOf($scope.coborrowerStip[i].name);
 				if(elementPos<0){
 					var obj = {};
 					obj.name = $scope.coborrowerStip[i].name;
 					obj.check = false;
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
  	 
  	 $scope.addFiletoCategory = function (file,index,category) {
  		 var objToPersist = {};
  		 objToPersist.name = $scope.getFormattedName(file.name);
  		 objToPersist.type= file.type;
  		 objToPersist.url = '/images/relativity.pdf';
  		 objToPersist.check = false;
  		 objToPersist.date = new Date();
  		$scope.generateThumbnail(objToPersist,index,category);
  	 };
  	 
  	$scope.generateThumbnail = function (obj,index,category) {
		if((obj.url!=null || obj.url!='') && obj.type=='application/pdf'){
		var pdf = {};
		pdf.url = obj.url;
		 PDFJS.getDocument(pdf).then(function(t){
			 t.getPage(1).then(function(e){
				
				 var f = document.createElement("canvas");
				
					var p = f.getContext("2d");
	                var t = e.getViewport(1);
	                f.height = t.height, f.width = t.width;
	                var pdf = {
	                    canvasContext: p,
	                    viewport: t
	                };
	            
	                e.render(pdf).then(function(){
			            obj.src = f.toDataURL("image/png");
			            switch(category){
			            case 'BO':
			            	obj.key = $scope.bData.length + 1;
			            	$scope.bData[index].files.push(obj);
			            break;
			            case 'CO':
			            	obj.key = $scope.cData.length + 1;
			            	$scope.cData[index].files.push(obj);
			            break;
			            }
			       		
			            $scope.$apply();
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
			            }
		            $scope.$apply();
                }
			    reader.readAsDataURL($scope.fileObject);    
		}
	};
	
	$scope.updateCheckboxes = function (event,index) {
		var size = $scope.bData[index].files.length;
		if(event.target.checked){
			for(var i=0;i<size;i++){
				$scope.bData[index].files[i].check = true;
				$scope.$emit('updateFileCount', true);
			}
		}else{
			for(var i=0;i<size;i++){
				$scope.bData[index].files[i].check = false;
				$scope.$emit('updateFileCount', false);
			}
		}
	};
	$scope.updateChckCategory = function (index) {
		var size = $scope.bData[index].files.length;
		var count = 0;
		for(var i=0;i<size;i++){
			if($scope.bData[index].files[i].check){
				count++;
			}
		}
		if(count<=0){
			$scope.bData[index].check = false;
		}else{
			$scope.bData[index].check = true;
		}
	};
	$scope.updateCoCheckboxes = function (event,index) {
		var size = $scope.cData[index].files.length;
		if(event.target.checked){
			for(var i=0;i<size;i++){
				$scope.cData[index].files[i].check = true;
				$scope.$emit('updateFileCount', true);
			}
		}else{
			for(var i=0;i<size;i++){
				$scope.cData[index].files[i].check = false;
				$scope.$emit('updateFileCount', false);
			}
		}
	};
	$scope.updateCoChckCategory = function (index) {
		var size = $scope.cData[index].files.length;
		var count = 0;
		for(var i=0;i<size;i++){
			if($scope.cData[index].files[i].check){
				count++;
			}
		}
		if(count<=0){
			$scope.cData[index].check = false;
		}else{
			$scope.cData[index].check = true;
		}
	};
	
  	$scope.init();
});
