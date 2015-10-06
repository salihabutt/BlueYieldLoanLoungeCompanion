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
    	   self.sendCustfiles = [];
    	   self.recCustfiles = [];
    	   self.sendCustCount = 0;
    	   self.sendCustConfig = {
    	      init: function() {
    	        this.on("addedfile", function(file) {
    	        	// show popup
    	        	self.openCustModal();
    	        	var obj = {};
    	        	obj.name = file.name;
    	        	obj.type = file.type;
    	        	self.sendCustfiles.push(obj);
    	        	$scope.$apply();
    	        //	file = null; // to be replaced 
    	        	//var r = new FileReader(file);
    	        //	var src=r.readAsDataURL();	
    	        });
    	      },
    	      uploadMultiple: false,
    	      maxFileSize: 30
    	    };

    	    
    	   self.openCustModal = function () {
    	    	$modal.open({
    	    		animation: true,
     	    		templateUrl: 'views/sendcustomerpopup.html',
     	    		controller: 'sendCustPopupCtrl'
    	    	});
    	   };
    	   self.recCustConfig = {
    	    	 init: function() {
    	    	      this.on("addedfile", function(file) {
    	    	        var obj = {};
    	    	        obj.name = file.name;
    	    	        obj.type = file.type;
    	    	        self.recCustfiles.push(obj);
    	    	        $scope.$apply();
    	    	        file = null; // to be replaced 
    	    	      });
    	    	   },
    	    	 uploadMultiple: false,
    	    	 maxFileSize: 30
    	   };
    
      });