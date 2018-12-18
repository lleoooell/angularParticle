angular.
module('app').
factory('SensorsService', ['$resource',
    function($resource) {
        return $resource('api/sensors/:sensorId', {
            sensorId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);