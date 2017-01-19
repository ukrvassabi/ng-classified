(function () {
	"use strict";

	angular
	.module("ngClassifieds")
	.controller("ClassifiedsNewCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, ClassifiedsFactory) {

		var vm = this;
		
		vm.sidenavOpen;
		vm.sidebarTitle = 'Add a Classified';
		
		vm.closeSidenav = closeSidenav;
		vm.saveClassified = saveClassified;

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

		function saveClassified(classified) {
			if (classified) {

				classified.contact = {
					name: "Test test",
					phone: "(555) 555-5555",
					email: "test@example.com"
				}

				$scope.$emit("newClassified", classified);
				closeSidenav();
			}
		}
	});
})();