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
    	   $scope.sendCustfiles = dataService.getSendCustFile();
    	   $scope.recCustfiles = [];
    	   self.sendCustCount = 0;
    	   self.sendCustConfig = {
    	      init: function() {
    	        this.on("addedfile", function(file) {
    	        	// show popup
    	        	self.openCustModal(file);
    	        /*	var obj = {};
    	        	obj.name = file.name;
    	        	obj.type = file.type;
    	        	$scope.sendCustfiles.push(obj);
    	        	$scope.$apply();*/
    	        //	file = null; // to be replaced 
    	        	//var r = new FileReader(file);
    	        //	var src=r.readAsDataURL();	
    	        });
    	        this.on("complete", function (file) {
    	        
    	        });
    	      },
    	      uploadMultiple: false,
    	      maxFileSize: 30
    	    };

    	    
    	   self.openCustModal = function (file) {
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
    	    	modalInstance.result.then(function(){
    	    		debugger;
    	    	});
    	   };
    	   self.recCustConfig = {
    	    	 init: function() {
    	    	      this.on("addedfile", function(file) {
    	    	        var obj = {};
    	    	        obj.name = file.name;
    	    	        obj.type = file.type;
    	    	        $scope.recCustfiles.push(obj);
    	    	        $scope.$apply();
    	    	        file = null; // to be replaced 
    	    	      });
    	    	   },
    	    	 uploadMultiple: false,
    	    	 maxFileSize: 30
    	   };
    
      });