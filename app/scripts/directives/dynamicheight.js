'use strict';
app.directive('dynamicHeight', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        $('.left-panel').ready(function(){
        	var a =$(window).height();
			   $('.left-panel').css('height',a-149 + 'px');
         $('.right-panel').css('height',a-149 + 'px');
			
        });
        $('.slim-scroll-div').ready(function(){
        	var a =$(window).height();
    			$('.slim-scroll-div').css('height',a-229 + 'px');
    			$('.slim-scroll-div').parent().css('height',a-229 + 'px');
        });

        $('#preview-file').ready(function(){
        	var a =$(window).height();
			$('#preview-file').css('height',a-100 + 'px');
			$('#preview-file').parent().css('height',a-150 + 'px');
			$('#preview-file div:last').css('top','25px');
        });
        $('#preview-thumb').ready(function(){
        	var a =$(window).height();
			$('#preview-thumb').css('height',a-100 + 'px');
			$('#preview-thumb').parent().css('height',a-150 + 'px');
			$('#preview-thumb div:last').css('top','25px');
        });
      }
    };
  });