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
		'ui.router'
	])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('main');

		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'views/main.html',
				controller : 'MainCtrl',
				controllerAs : 'main'
			})
			.state('about', {
				url : '/about',
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'about'
			})
	});
