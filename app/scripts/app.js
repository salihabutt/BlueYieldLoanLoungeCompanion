'use strict';

/**
 * @ngdoc overview
 * @name blueYieldLoanLoungeCompanionApp
 * @description
 * # blueYieldLoanLoungeCompanionApp
 *
 * Main module of the application.
 */
var app=angular
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
		'ui.mask',
		'ui.bootstrap',
		'ngDropzone',
		'pdf',
		'dndLists'
	]);

	app.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('main');

		
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'views/main.html',     
		abstract: 'true'		
		})
		.state('home', {
          parent: 'main',
          url:'/main',
          views: {
            'header' : {
              templateUrl: 'views/header.html'
            },
            'content' : {
              templateUrl: 'views/home.html'
            }
          }
        });
	});
