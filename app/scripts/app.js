'use strict';

/**
 * @ngdoc overview
 * @name blueYieldLoanLoungeCompanionApp
 * @description
 * # blueYieldLoanLoungeCompanionApp
 *
 * Main module of the application.
 */
angular
	.module('blueYieldLoanLoungeCompanionApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ui.router',
		'angularMoment',
		'ui.sortable',
		'jkuri.slimscroll',
		'ui.mask'
	])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('main');

		
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'views/main.html',     
		abstract: 'true'		
		})
		.state('home', {
          parent: 'main',
          url:'',
          views: {
            'header' : {
              templateUrl: 'views/header.html'
            },
            'content' : {
              templateUrl: 'views/home.html'
            },
            controller:'HomeCtrl'
          }
        });
	});
