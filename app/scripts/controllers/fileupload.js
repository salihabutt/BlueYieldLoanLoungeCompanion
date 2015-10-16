'use strict';

    /**
     * @ngdoc function
     * @name blueYieldLoanLoungeCompanionApp.controller:FileCtrl
     * @description
     * # fileCtrl
     * Controller of the blueYieldLoanLoungeCompanionApp
     */
    angular.module('blueYieldLoanLoungeCompanionApp')
      .controller('FileCtrl', function ($scope, $modal) {
    	   var self = this;
    	   self.fileObject = {};
    	   $scope.sendCustConfig = {
    	      init: function() {
    	        this.on("addedfile", function(file) {
    	        	// show popup
    	        	self.fileObject = file;
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
    	    	  modalInstance.result.then(function (obj) {
    	    		  $scope.persistObject(obj);
    	    	    }, function (obj) {
    	    	    	$scope.persistObject(obj);
    	    	    });
    	   };
    	   $scope.persistObject = function (objToPersist) {
    			if(!self.isEmpty(objToPersist)){
    	    		var obj = {};
    	    		obj.name = objToPersist.name;
    	    		obj.url  = objToPersist.url;
    	    		obj.type = objToPersist.type;
    	    		obj.date = objToPersist.date;
    	    		obj.clas = 'custfile';
    	    		obj.checked = objToPersist.checked;
    	    		self.generateThumbnail(obj);
    	    		}
    	   }
    	   $scope.recCustConfig = {
    	    	 init: function() {
    	    	      this.on("addedfile", function(file) {
    	    	    	self.fileObject = file;
    	    	        var obj = {};
    	    	        obj.name = file.name;
    	    	        obj.type = file.type;
    	    	        obj.url = '/images/relativity.pdf'; //statis for now
    	    	        obj.date = new Date();
    	    	        obj.clas = 'recfile';
    	    	        obj.checked = false;
    	    	        self.generateThumbnail(obj);
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
    		self.generateThumbnail = function (obj) {
    			if((obj.url!=null || obj.url!='') && obj.type=='application/pdf'){
				var pdf = {};
				pdf.url = obj.url;
				 PDFJS.getDocument(pdf).then(function(doc){
					 doc.getPage(1).then(function(event){
						
						 var canvas = document.createElement("canvas");
						
							var context = canvas.getContext("2d");
			                var doc = event.getViewport(1);
			                canvas.height = doc.height, canvas.width = doc.width;
			                var pdf = {
			                    canvasContext: context,
			                    viewport: doc
			                };
			            
			                event.render(pdf).then(function(){
					              obj.src = canvas.toDataURL("image/png");
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
    				    	var src = e.target.result;
    				    	obj.src = src;
    				    	if(obj.clas === 'custfile'){
				            	  $scope.sendCustfiles.push(obj);
				              }else{
				            	  $scope.recCustfiles.push(obj);
				              }
   			             	$scope.$apply();
    	                }
    				    reader.readAsDataURL(self.fileObject);    
    			}
			};
			
    
      });