var mongoose = require('mongoose');


var sensorSchema = new mongoose.Schema({
    data: String,
    ttl: Number,
    published_at: String,
    coreid: String,
    name: String
});

var Sensors = mongoose.model('sensor', sensorSchema);

module.exports = Sensors;