angular.
module('app').
factory('DevicesService', ['$resource',
    function($resource) {
        return $resource('api/devices/:devicesId', {
            devicesId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);