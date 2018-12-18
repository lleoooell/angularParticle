var mongoose = require('mongoose');


var deviceSchema = new mongoose.Schema({
       id: String,
       name: String,
       last_app: String,
       last_ip_address: String,
       last_heard: String,
       product_id: Number,
       connected: Boolean,
       platform_id: Number,
       cellular: Boolean,
       notes: String,
       status: String,
       serial_number: String,
       default_build_target: String
});

var Devices = mongoose.model('device', deviceSchema);

module.exports = Devices;