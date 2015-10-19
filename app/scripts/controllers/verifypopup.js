'use strict';


angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('verifyPopup', function ($scope, $modal, $modalInstance, title, fileSize, stipnotFoundData) {

  		$scope.getData = {stipStatus : "" ,expDate : "" };
  		$scope.title = title;
  		$scope.fileSize = fileSize;
  		$scope.stipnotFoundData = stipnotFoundData;
  		$scope.stipLocation = '';
  		$scope.pastDate = false;
  		$scope.selected = '';
  		$scope.stipStatusArray = [
  		                   {
  		                	   name: 'Paperwork OK',
  		                	   checked: false,
  		                	   disabled: false
  		                   },
  		                   {
  		                	   name: 'Blurred Image',
  		                	   checked: false,
  		                	   disabled: false
  		                   },
  		                   {
  		                	   name: 'Partial Image',
  		                	   checked: false,
  		                	   disabled: false
  		                   },
  		                   {
  		                	   name: 'Past Expiration Date',
  		                	   checked: false,
  		                	   disabled: false
  		                   },
  		                   {
  		                	   name: 'Not in (co)borrower\'s name',
  		                	   checked: false,
  		                	   disabled: false
  		                   },
  		                   {
  		                	   name: 'Can\'t Open file',
  		                	   checked: false,
  		                	   disabled: false
  		                   }
		                 ];

  		$scope.setExpDate = function () {
  			var selectedDate = $scope.getData.expDate;
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
			today = mm+'/'+dd+'/'+yyyy;  			

			if(selectedDate != ""){
				if(selectedDate > today){
					$scope.pastDate = false;
					for(var i=0;i<$scope.stipStatusArray.length;i++){
						$scope.stipStatusArray[i].checked = false;
						$scope.stipStatusArray[i].disabled = false;
					}
				}else{
					$scope.pastDate = true;
					$scope.getData.stipStatus = 'Past Expiration Date';
					for(var i=0;i<$scope.stipStatusArray.length;i++){
						$scope.stipStatusArray[i].checked = false;
						$scope.stipStatusArray[i].disabled = true;
						if($scope.stipStatusArray[i].name === 'Past Expiration Date'){
							$scope.stipStatusArray[i].checked = true;
							$scope.stipStatusArray[i].disabled = false;
							$scope.selected = 'Past Expiration Date';
						}
					}
				}
			}

			
  		 };
  		
  		$scope.setStipStatus = function (item) {
  			$scope.getData.stipStatus = item;
  		}

		$scope.ok = function () {
			$scope.getData.stipLocation = $scope.stipLocation;
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
				$scope.stipLocation = obj.type+ ' - ' + obj.subType;
			});
		   
		  };
		
  });
  