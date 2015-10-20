'use strict';

angular.module('blueYieldLoanLoungeCompanionApp')
.directive('print', function () {
    return {
        restrict: 'A',
         link: function (scope, element) {
        	 element.click(function(){
        			var popupWin = window.open('', '_blank', 'width=800,height=600');
    				var printContents = document.getElementById('printImages').innerHTML;
    				var pdfContents = drawPdf().innerHTML;
    				popupWin.document.open();
    		        popupWin.document.write('<html><body onload="window.print()">' + printContents + pdfContents + '</html>');
    		        popupWin.document.close();
                });
        	 function drawPdf () {	
        		 var pdiv = document.createElement("div");
        		 if(document.getElementById('pc').childNodes){
        			 for(var i=0;i<document.getElementById('pc').childNodes.length;i++){
        				 var idiv = document.createElement("DIV-"+i);
        				 	var img = document.createElement("img");
     						img.src = document.getElementById('pc').childNodes[i].childNodes[0].toDataURL("image/png");
     						idiv.appendChild(img);
     						pdiv.appendChild(idiv);
        			 }
        		 }
        		 return pdiv;
        	 }
        }
    };
})
.directive('printSingle', function () {
    return {
        restrict: 'A',
         link: function (scope, element) {
        	 element.click(function(){
        			var popupWin = window.open('', '_blank', 'width=800,height=600');
    				var printContents = document.getElementById('imagesToDisplay').innerHTML;
    				var pdfContents = drawPdf().innerHTML;
    				popupWin.document.open();
    		        popupWin.document.write('<html><body onload="window.print()">' + printContents + pdfContents + '</html>');
    		        popupWin.document.close();
                });
        	 function drawPdf () {	
        		 var pdiv = document.createElement("div");
        		 if(document.getElementById('pc').childNodes){
        			 for(var i=0;i<document.getElementById('pc').childNodes.length;i++){
        				 var idiv = document.createElement("DIV-"+i);
        				 	var img = document.createElement("img");
     						img.src = document.getElementById('pc').childNodes[i].childNodes[0].toDataURL("image/png");
     						idiv.appendChild(img);
     						pdiv.appendChild(idiv);
        			 }
        		 }
        		 return pdiv;
        	 }
        }
    };
});