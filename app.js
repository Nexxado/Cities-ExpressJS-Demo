var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false});

app.use(express.static('public'));

var cities = {
    'Lotopia': 'some description',
    'Caspiana': 'description',
    'Indigo': 'description'
};


app.get('/', function(request, response) {
    response.send('OK');
});

app.get('/cities', function(request, response) {
    response.json(Object.keys(cities));
});


app.post('/cities', urlencode, function(request, response) {
    var newCity = request.body;
    
    if(!newCity.name || !newCity.description){
      response.sendStatus(400);
      return false;
    }
    
    cities[newCity.name] = newCity.description;
    response.status(201).json(newCity.name);
});

app.get('/cities/:name', function(request, response) {
//    response.send(cities[request.params.name]);
    response.render('show.ejs', { city: {name: request.params.name, description: cities[request.params.name]}});
});

app.delete('/cities/:name', function(request, response) {
   delete cities[request.params.name];
    response.sendStatus(204);
});

module.exports = app;