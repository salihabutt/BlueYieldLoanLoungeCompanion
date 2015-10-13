'use strict';

angular.module('blueYieldLoanLoungeCompanionApp').
controller('MergeFileControlle', function (self,$scope,$modal) {
	
	self.openMergePopup = function () {
		debugger;
		var modalInstance = $modal.open({
    		animation: false,
	    		templateUrl: 'views/mergefilepopup.html',
	    		controller: 'mergefilePopupCtrl',
	    		windowClass: 'modal-mergefiles'
    	});	
	};
});

