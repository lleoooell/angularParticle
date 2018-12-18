var express = require('express');
var Devices = require('./models/devices');
var Sensors = require('./models/sensors');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Particle = require("particle-api-js");
var particle = new Particle();
var token;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var Eleves = require('./models/eleves.model');
var streamEvents = function(token) {

}
var listerDevices = function(token) {
    var devicesPr = particle.listDevices({
        auth: token
    });

    devicesPr.then(
        function(devices) {
            console.log('Devices: ', devices);
            devices.body.forEach(function(device) {

                Devices.find({
                    id: device.id
                }, function(err, docs) {
                    if (err) {
                        console.log(error)
                    } else {
                        console.log(docs);
                        if (docs.length > 0) {
                            console.log("device already exists");
                        } else {
                            Devices.create(device, function(err, newDevice) {
                                if (err) return handleError(err);
                                // saved!
                                console.log("new device saved");
                                console.log(newDevice);
                            });
                        }
                    }


                });




            });

        },
        function(err) {
            console.log('List devices call failed: ', err);
        }
    );
}



mongoose.connect('mongodb://localhost/ifas3');



var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("db connected");
});


// app.use == configuration du server
// je déclare mes fichiers statiques
app.use('/app', express.static('./client/app'));
app.use('/css', express.static('./client/lib/css'));
app.use('/lib', express.static('./client/lib/vendor'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


particle.login({
    username: 'leo@greenberry.io',
    password: 'stc110686'
}).then(
    function(data) {
        console.log('API call completed on promise resolve: ', data.body.access_token);
        listerDevices(data.body.access_token);
        // streamEvents(data.body.access_token);
        //Get your devices events
        console.log("now get events");
        particle.getEventStream({
            deviceId: 'mine',
            auth: data.body.access_token
        }).then(function(stream) {
            console.log('onstream');
            stream.on('event', function(data) {
                console.log("Event: ", data);
                Sensors.create(data, function(err, newSensors) {
                                if (err) return handleError(err);
                                // saved!
                                console.log("new sensors saved");
                                console.log(newSensors);
                                if(newSensors){
                                  io.emit('newSensor', newSensors);

                                }
                            });
            });
        });

    },
    function(err) {
        console.log('API call completed on promise fail: ', err);
    }
);


// une modif
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/devices', function(req, res) {
    console.log('on me demande la liste des devices');
    Devices.find({}, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            res.json(docs);
        }
    })
});
app.get('/api/sensors', function(req, res) {
    console.log('on me demande la liste des sensors');
    Sensors.find({}).sort({"published_at" : -1}).limit(5).exec(function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            res.json(docs);
        }
    })
});
app.get('/api/devices/:id', function(req, res) {
    console.log('on me demande un seul device');
    console.log(req.params);
    Devices.findById(req.params.id, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            res.json(docs);
        }
    })
});


io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(9999, function() {
    console.log('serveur lancé');
});