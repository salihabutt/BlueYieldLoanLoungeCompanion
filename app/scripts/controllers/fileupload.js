'use strict';

    /**
     * @ngdoc function
     * @name blueYieldLoanLoungeCompanionApp.controller:FileCtrl
     * @description
     * # fileCtrl
     * Controller of the blueYieldLoanLoungeCompanionApp
     */
    angular.module('blueYieldLoanLoungeCompanionApp')
      .controller('FileCtrl', function ($scope, $modal, dataService) {
    	   var self = this;
    	   $scope.sendCustfiles = [];
    	   $scope.sendCustFile = dataService.sendCustFile;
    	   $scope.recCustfiles = [];
    	   $scope.selFileCount = dataService.selFileCount;
    	   $scope.fileObject = {};
    	   self.sendCustCount = 0;
    	   $scope.sendCustConfig = {
    	      init: function() {
    	        this.on("addedfile", function(file) {
    	        	// show popup
    	        	$scope.fileObject = file;
    	        	$scope.openCustModal(file);

    	        });
    	      },
    	      uploadMultiple: false,
    	      maxFileSize: 30
    	    };

    	    
    	   $scope.openCustModal = function (file) {
    	    	var modalInstance = $modal.open({
    	    		animation: false,
     	    		templateUrl: 'views/sendcustomerpopup.html',
     	    		controller: 'sendCustPopupCtrl',
     	    		windowClass: 'modal-sendcustomer',
     	    		resolve : {
     	    			item: function () {
     	    				return file;
     	    			}
     	    		}
    	    	});
    	    	modalInstance.result.finally(function() {
    	    		$scope.persistObject();
    	    	});
    	   };
    	   $scope.persistObject = function () {
    			if(!self.isEmpty($scope.sendCustFile)){
    	    		var obj = {};
    	    		obj.name = $scope.getFormattedName($scope.sendCustFile.name);
    	    		obj.url  = $scope.sendCustFile.url;
    	    		obj.type = $scope.sendCustFile.type;
    	    		obj.date = $scope.sendCustFile.date;
    	    		obj.clas = 'custfile';
    	    		$scope.generateThumbnail(obj);
    	    		}
    	   }
    	   $scope.recCustConfig = {
    	    	 init: function() {
    	    	      this.on("addedfile", function(file) {
    	    	    	$scope.fileObject = file;
    	    	        var obj = {};
    	    	        obj.name = $scope.getFormattedName(file.name);
    	    	        obj.type = file.type;
    	    	        obj.url = '/images/relativity.pdf'; //statis for now
    	    	        obj.date = new Date();
    	    	        obj.clas = 'recfile';
    	    	        $scope.generateThumbnail(obj);
    	    	        file = null; // to be replaced 
    	    	      });
    	    	   },
    	    	 uploadMultiple: false,
    	    	 maxFileSize: 30
    	   };
    	   
    	    self.isEmpty = function (obj) {
    		    for(var prop in obj) {
    		        if(obj.hasOwnProperty(prop))
    		            return false;
    		    }

    		    return true;
    		}
    		$scope.generateThumbnail = function (obj) {
    			if((obj.url!=null || obj.url!='') && obj.type=='application/pdf'){
				var n = {};
				n.url = obj.url;
				 PDFJS.getDocument(n).then(function(t){
					 t.getPage(1).then(function(e){
						
						 var f = document.createElement("canvas");
						
							var p = f.getContext("2d");
			                var t = e.getViewport(1);
			                f.height = t.height, f.width = t.width;
			                var n = {
			                    canvasContext: p,
			                    viewport: t
			                };
			            
			                e.render(n).then(function(){
					              obj.src = f.toDataURL("image/png");
					              if(obj.clas === 'custfile'){
					            	  $scope.sendCustfiles.push(obj);
					              }else{
					            	  $scope.recCustfiles.push(obj);
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
    				    	if(obj.clas === 'custfile'){
				            	  $scope.sendCustfiles.push(obj);
				              }else{
				            	  $scope.recCustfiles.push(obj);
				              }
   			             	$scope.$apply();
    	                }
    				    reader.readAsDataURL($scope.fileObject);    
    			}
			};
			
    
      });