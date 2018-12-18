angular.module("app").controller("devices_listeCtrl",["$scope","DevicesService", function($scope,DevicesService){

	console.log("contrller here ")
	$scope.listeDevices = DevicesService.query();
}]);