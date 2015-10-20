'use strict';
angular.module('blueYieldLoanLoungeCompanionApp')
.directive('popupSetting', function () {
    return {
      restrict: 'A',
      link: function () {
    	  $('.verify-popup').ready(function(){
	      		var popup = $(".modal");
    			$(".left-panel").append(popup);
    			var popupback = $(".modal-backdrop");
    			$(".left-panel").append(popupback);

    			$(".modal").css("position","absolute");
    			$(".modal-backdrop").css("position","absolute");
      		});
      	}
    };
  });