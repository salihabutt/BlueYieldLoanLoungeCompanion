'use strict';

/**
 * @ngdoc function
 * @name blueYieldLoanLoungeCompanionApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the blueYieldLoanLoungeCompanionApp
 */
angular.module('blueYieldLoanLoungeCompanionApp')
  .controller('HeaderCtrl', function () {
	var self = this;
    self.date = new Date();
    self.userName = "ryan cowan";
  });