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
    	   self.fileObjects = [];
    	   $scope.sendCustConfig = {
    	      init: function() {
    	        this.on('addedfile', function(file) {
    	        	// show popup
    	        	self.fileObjects.push(file);
    	        });
    	        this.on('queuecomplete', function (){
    	        	self.openCustModal();
    	        });
    	      },
    	      uploadMultiple: false,
    	      maxFileSize: 30,
    	    };
    	   // when a send button is clicked a popup is opened.
    	   $scope.sendLoanPackage = function (item,index){
    		   var modalInstance = $modal.open({
   	    		animation: false,
    	    		templateUrl: 'views/sendcustomerpopup.html',
    	    		controller: 'sendCustPopupCtrl',
    	    		windowClass: 'modal-sendcustomer',
    	    		resolve : {
    	    			item: function () {
    	    				return item;
    	    			}
    	    		}
   	    	});
   	    	  modalInstance.result.then(function (obj) {
   	    		  if(obj.date!=null){
   	    			$scope.sendCustfiles[$scope.sendCustfiles.indexOf(item)].date = obj.date;
   	    		  }
   	    	    });
    	   };
    	   
    	   self.openCustModal = function () {
    	    for(var i=0;i<self.fileObjects.length;i++){
    	    	self.openModal(self.fileObjects[i]);
    	    }
    	    self.fileObjects = [];
    	   };
    	   self.openModal = function (file){
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
    	    		  self.persistObject(obj,file);
    	    	    }, function (obj) {
    	    	    	self.persistObject(obj,file);
    	    	    });  
    	   };
    	   
    	   self.persistObject = function (objToPersist,file) {
    			if(!self.isEmpty(objToPersist)){
    	    		var obj = {};
    	    		obj.name = objToPersist.name;
    	    		obj.url  = objToPersist.url;
    	    		obj.type = objToPersist.type;
    	    		obj.date = objToPersist.date;
    	    		obj.clas = 'custfile';
    	    		obj.id = $scope.sendCustfiles.length+1;   // unique of id of every file must b there since tracking in list is done by id
    	    		obj.checked = objToPersist.checked;
    	    		self.generateThumbnail(obj,file);
    	    		}
    	   }
    	   
    	   $scope.recCustConfig = {
    	    	 init: function() {
    	    	      this.on('addedfile', function(file) {
    	    	        var obj = {};
    	    	        obj.name = file.name;
    	    	        obj.type = file.type;
    	    	        obj.url = '/images/relativity.pdf'; //static for now
    	    	        obj.date = new Date();
    	    	        obj.clas = 'recfile';
    	    	        obj.checked = false;
    	    	        obj.id = $scope.recCustfiles.length+1;
    	    	        self.generateThumbnail(obj,file);
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
    	    
    		self.generateThumbnail = function (obj,file) {
    			if((obj.url!=null || obj.url!='') && obj.type=='application/pdf'){
				var pdf = {};
				pdf.url = obj.url;									/* PDFJS is used to red pdf files and generating thumbnails*/
				 PDFJS.getDocument(pdf).then(function(doc){
					 doc.getPage(1).then(function(event){
						 var canvas = document.createElement('canvas');
						 var context = canvas.getContext('2d');
			             var doc = event.getViewport(1);
			             canvas.height = doc.height, canvas.width = doc.width;
			             var pdf = {
			                 canvasContext: context,
			                 viewport: doc
			              };
			            
			              event.render(pdf).then(function(){
					           obj.src = canvas.toDataURL('image/png');
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
    				  var reader = new FileReader();      /* this section is for reading images and getting source of images*/
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
    				    reader.readAsDataURL(file);    
    			}
			};
      });