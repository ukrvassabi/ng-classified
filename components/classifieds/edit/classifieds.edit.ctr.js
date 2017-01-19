(function () {
	"use strict";

	angular
	.module("ngClassifieds")
	.controller("ClassifiedsEditCtrl", function($scope, $state, $mdSidenav, $timeout, ClassifiedsFactory) {
		var vm = this;
		
		vm.sidenavOpen;
		vm.sidebarTitle = 'Edit Classified';
		
		vm.closeSidenav = closeSidenav;
		vm.saveEdit = saveEdit;

		vm.classified = $state.params.classified;

		$timeout(function() {
			$mdSidenav("left").open();
		});

		$scope.$watch("vm.sidenavOpen", function(sidenavOpen) {
			if (sidenavOpen === false) {
				$mdSidenav('left')
					.close()
					.then(function() {
						$state.go("classifieds");
					});
			}
		});

		function closeSidenav() {
			vm.sidenavOpen = false;
		}

		function saveEdit() {
			$scope.$emit("editClassified", "Classified Edited!");
			closeSidenav();
		}
	});
})();