'use strict';


angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('verifyPopup', function ($scope, $modal, $modalInstance, title, fileSize, stipnotFoundData, showExpirayDate, $timeout) {

  		$scope.getData = {stipStatus : "" ,expDate : "" };
  		$scope.title = title;
  		$scope.fileSize = fileSize;
  		$scope.stipnotFoundData = stipnotFoundData;
  		$scope.stipLocation = '';
  		$scope.pastDate = false;
  		$scope.selected = '';
  		$scope.showError = false;
  		$scope.showExpiryDate = showExpirayDate;
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
			    dd='0'+dd;
			} 
			if(mm<10) {
			    mm='0'+mm;
			} 
			today = mm+'/'+dd+'/'+yyyy;  			

			if(selectedDate !== ""){
				var size = $scope.stipStatusArray.length;
				if (selectedDate > today) {
					$scope.selected = '' ;
					for (var i = 0; i < size; i++) {
						$scope.stipStatusArray[i].checked = false;
						$scope.stipStatusArray[i].disabled = false;
					}
				}else {
					$scope.getData.stipStatus = 'Past Expiration Date';
					for (var j = 0; j < size; j++) {
						$scope.stipStatusArray[j].checked = false;
						$scope.stipStatusArray[j].disabled = true;
						if ($scope.stipStatusArray[j].name === 'Past Expiration Date') {
							$scope.stipStatusArray[j].checked = true;
							$scope.stipStatusArray[j].disabled = false;
							$scope.selected = 'Past Expiration Date';
						}
					}
				}
			}

			
  		 };
  		
  		$scope.setStipStatus = function (item) {
  			$scope.getData.stipStatus = item;
  		};

		$scope.ok = function () {
			var date = $scope.getData.expDate;
			if(date === '' && $scope.getData.stipStatus === 'Paperwork OK'){
				$scope.showError = true;
			$timeout(function() {
				 $scope.showError = false;
			}, 2000);
			}else {
			$scope.getData.stipLocation = $scope.stipLocation;
			$modalInstance.close($scope.getData);
			}
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
  