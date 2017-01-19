(function() {
	"use strict";

	angular
		.module("ngClassifieds")
		.controller("ClassifiedsCtrl", function($scope, $state, $mdToast, ClassifiedsFactory) {

			var vm = this;
			
			vm.classifieds;
			vm.categories;
			vm.openSidenav = openSidenav;

			ClassifiedsFactory.getClassifieds().then(function (response) {
				vm.classifieds = response.data;
				vm.categories = getCategories(vm.classifieds);
			});

			$scope.$on("newClassified", function(event, classified) {
				classified.id = vm.classifieds.length + 1;
				vm.classifieds.push(classified);
				showToast("Classified Saved!");
			});

			$scope.$on("editClassified", function(event, message) {
				showToast(message);
			});

			$scope.$on("deleteClassified", function(event, classified) {
				var index = vm.classifieds.indexOf(classified);
				vm.classifieds.splice(index, 1);
			});

			function openSidenav() {
				$state.go("classifieds.new");
			}

			function showToast(message) {
				$mdToast.show(
					$mdToast
						.simple()
						.content(message)
						.position("top, right")
						.hideDelay(3000)
				);
			}

			function getCategories(classifieds) {
				var categories = [];

				angular.forEach(classifieds, function(item) {
					angular.forEach(item.categories, function(category) {
						categories.push(category);
					});
				});

				return _.uniq(categories);
			};

		})
})();