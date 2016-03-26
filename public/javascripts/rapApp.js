var app = angular.module('rapApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'searchEngine.html',
		controller: 'searchController'
	})

	.when('/rapper', {
		templateUrl: 'rapperPage.html',
		controller: 'pageController'
	});
}]);

app.factory('nameFactory', function() {
	var name;
	return {
		getInfo : function() {
			return name;
		}
	}
})

app.controller('searchController', function($scope, $location, nameFactory) {
	$scope.artistName = '';
	$scope.topic = '';

	$scope.getArtistPage = function() {
		nameFactory.name = $scope.artistName;
		$location.path('/rapper');
	}
});

app.controller('pageController', function($scope, $location, nameFactory) {
	$scope.artistInfo = {
		name: nameFactory.name,
		picture: '',
		albums: [],
		albumPictures: []
	};
});