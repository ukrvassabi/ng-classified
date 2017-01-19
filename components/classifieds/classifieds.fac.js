(function() {
	"use strict";

	angular
		.module("ngClassifieds")
		.factory("ClassifiedsFactory", function($http) {

			return {
				getClassifieds: function() {
					return $http.get("data/classifieds.json");
				}
			}
		});
})();