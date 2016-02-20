var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({
    extended: false
});

var cities = {
    'Lotopia': 'some description',
    'Caspiana': 'description',
    'Indigo': 'description'
};


//app.get('/', function(request, response) {
//    response.send('OK');
//});

router.route('/')
    .get(function (request, response) {
        response.json(Object.keys(cities));
    })
    .post(urlencode, function (request, response) {
        var newCity = request.body;

        if (!newCity.name || !newCity.description) {
            response.sendStatus(400);
            return false;
        }

        cities[newCity.name] = newCity.description;
        response.status(201).json(newCity.name);
    });

router.route('/:name')
    .get(function (request, response) {
        //    response.send(cities[request.params.name]);
        response.render('show.ejs', {
            city: {
                name: request.params.name,
                description: cities[request.params.name]
            }
        });
    })
    .delete(function (request, response) {
        delete cities[request.params.name];
        response.sendStatus(204);
    });

module.exports = router;