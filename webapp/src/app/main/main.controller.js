(function () {
	'use strict';

	angular
		.module('teste')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController($timeout, webDevTec, toastr) {
		var vm = this;

		vm.campaign = { items: [] };

		vm.newItem = function (campaign) {
			console.log('newItem');
			campaign.items.push({});
			console.log(campaign.items);
		};

		// vm.awesomeThings = [];
		// vm.classAnimation = '';
		// vm.creationDate = 1486258281750;
		// vm.showToastr = showToastr;

		// activate();

		// function activate() {
		//   getWebDevTec();
		//   $timeout(function() {
		//     vm.classAnimation = 'rubberBand';
		//   }, 4000);
		// }

		// function showToastr() {
		//   toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
		//   vm.classAnimation = '';
		// }

		// function getWebDevTec() {
		//   vm.awesomeThings = webDevTec.getTec();

		//   angular.forEach(vm.awesomeThings, function(awesomeThing) {
		//     awesomeThing.rank = Math.random();
		//   });
		// }
	}

	// MainController.prototype.newItem = function () {
	// 	var vm = this;
	// 	console.log('newItem');
	// 	vm.campaign.items.push({});
	// };
})();
