angular.module("app").controller("devices_detailsCtrl", ["$scope", "$routeParams", "DevicesService", "SensorsService", function($scope, $routeParams, DevicesService, SensorsService) {
    $scope.monDevice = DevicesService.get({
        "devicesId": $routeParams.deviceId
    });
    $scope.mesSensors = SensorsService.query();

    socket.on("newSensor", function(socket) {
        console.log(socket);
        $scope.mesSensors.unshift(socket);
        console.log($scope.mesSensors);
        $scope.$apply();

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

        // Simulate async data update
        $timeout(function() {
            $scope.data = [
                [28, 48, 40, 19, 86, 27, 90],
                [65, 59, 80, 81, 56, 55, 40]
            ];
        }, 3000);
    });
}]);