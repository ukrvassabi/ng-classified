(function() {
	"use strict";

	angular
		.module("ngClassifieds")
		.directive("classifiedCard", function($state, $mdToast, $mdDialog) {
			return {
				restrict: "E",
				scope: {
					classifieds: "=",
					classifiedsFilter: "=",
					category: "="
				},
				templateUrl: "components/classifieds/card/classified-card.tpl.html",
				controller: ClassifiedCardController,
				controllerAs: "vm"
			}

			function ClassifiedCardController($scope) {

				var vm = this;
				vm.editClassified = editClassified;
				vm.deleteClassified = deleteClassified;

				function editClassified(classified) {
					$state.go("classifieds.edit", {
						id: classified.id,
						classified: classified
					});
				}

				function deleteClassified(event, classified) {
					var confirm = $mdDialog.confirm()
						.title("Are you sure you want to delete " + classified.title + "?")
						.ok("Yes")
						.cancel("No")
						.targetEvent(event);

					$mdDialog.show(confirm).then(function() {
						$scope.$emit("deleteClassified", classified);
					});
				}
			}
		});
})();