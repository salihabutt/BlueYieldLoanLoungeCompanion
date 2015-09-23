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
    this.date = new Date();
    this.userName = "ryan cowan";
  });