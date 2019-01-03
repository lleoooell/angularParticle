angular.module("app").controller("devices_detailsCtrl", ["$scope", "$routeParams", "DevicesService", "SensorsService", function($scope, $routeParams, DevicesService, SensorsService) {
    var mainMarker = {
        lat: 49.114821,
        lng: 6.181632,
        focus: true,
        message: "IFA !!",
        draggable: false
    };

    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        },
        london: {
            lat: 49.114821,
            lng: 6.181632,
            zoom: 18
        },
        markers: {
            mainMarker: angular.copy(mainMarker)
        },
    });
    $scope.monDevice = DevicesService.get({
        "devicesId": $routeParams.deviceId
    });
    $scope.mesSensors = SensorsService.query();
    $scope.labels = [];
    $scope.data = [];
    $scope.options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }],
            xAxes: [{
                // type: 'time',
                // time: {
                //     unit: 'minute'
                // }
            }]
        },
        responsive: true,
        title: {
            display: true,
            text: 'Custom Chart Title'
        }

    };

    socket.on("newSensor", function(socket) {
        console.log(socket);
        $scope.mesSensors.unshift(socket);
        console.log($scope.mesSensors);


        if (socket.name === "analogValue") {

            $scope.labels.push(moment(socket.published_at).format("YY-MM-DD HH:mm' s''"));
            $scope.data.push(socket.data);

        }
        if (socket.name === "ubidotsLatLong") {
            var datas = JSON.parse(socket.data)

            // var ts = moment(datas.timestamp).fromNow();

            var m = moment.utc(datas.timestamp); // input is local time
            console.log(m);
            m.tz('Europe/Paris'); // convert to UTC+1
            var ts = m.format("LLL");
            console.log(ts);
            mainMarker = {
                lat: parseFloat(datas["google-lat"]),
                lng: parseFloat(datas["google-lng"]),
                focus: true,
                message: "lat : " + datas["google-lat"] + " lng : " + datas["google-lng"] + " accuracy :" + datas['google-acc'] + " at : " + ts,
                draggable: false
            };

            angular.extend($scope, {

                markers: {
                    mainMarker: angular.copy(mainMarker)
                },
                london: {
                    lat: parseFloat(datas["google-lat"]),
                    lng: parseFloat(datas["google-lng"]),
                    zoom: 18
                },
            });
        }
        $scope.$apply();
        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

        // Simulate async data update

    });
}]);