'use strict';


angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('verifyPopup', function ($scope, $modal, $modalInstance,title,fileSize,stipnotFoundData) {

  		$scope.getData = {expirationType : "" ,getExpDate : "" };
  		$scope.title = title;
  		$scope.fileSize = fileSize;
  		$scope.stipnotFoundData = stipnotFoundData;
  		$scope.stipLocation = '';
  		$scope.pastDate = false;

  		$scope.$watch('getData', function() { 

  			var selectedDate = $scope.getData.getExpDate;

  			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			if(dd<10) {
			    dd='0'+dd
			} 
			if(mm<10) {
			    mm='0'+mm
			} 
			today = dd+'/'+mm+'/'+yyyy;  			

			if(selectedDate != ""){
				if(selectedDate > today){
					$scope.pastDate = false;
				}else{
					$scope.pastDate = true;
					$scope.getData.expirationType = "Past Expiration Date";
					document.getElementById("pastExp").checked = true;
				}
			}

			
  		 }, true);


		$scope.ok = function () {
			$modalInstance.close($scope.getData);  
		};

		$scope.cancel = function () {
		 	$modalInstance.dismiss();
		};
		
		$scope.openModal = function () {
			var modalInstance = $modal.open({
		      templateUrl: 'views/stipnotfoundpopup.html',
		      controller: 'StipNotFoundCtrl',
		      windowClass:'modal-nostipfound',
		      resolve: {
		    	  stipnotFoundData: function () {
		    		return $scope.stipnotFoundData;  
		    	  } 
		      }
		      });
			modalInstance.result.then(function(obj){
				$scope.stipLocation = obj.subType;
			});
		   
		  };
		
  });
  