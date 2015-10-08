app.directive('dynamicHeight', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        $('.left-panel').ready(function(){
        	var a =$(window).height();
			$(".left-panel").css("height",a-100 + "px");
        });
        $('.slim-scroll-div').ready(function(){
        	debugger;
        	var a =$(window).height();
			$(".slim-scroll-div").css("height",a-100 + "px");
			$(".slim-scroll-div").parent().css("height",a-250 + "px");
        });
      }
    };
  });