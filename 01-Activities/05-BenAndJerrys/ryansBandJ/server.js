var express = require("express");
var exphbs = require("express-handlebars");

// Create an instance of the express app.
var app = express();

// Specify the port.
var port = 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var icecreams = [
  { name: 'vanilla', price: 10, awesomeness: 3 },
  { name: 'chocolate', price: 4, awesomeness: 8 },
  { name: 'banana', price: 1, awesomeness: 1 },
  { name: 'greentea', price: 5, awesomeness: 7 },
  { name: 'jawbreakers', price: 6, awesomeness: 2 },
];

app.get('/icecreams', function (req, res, next ) {
  res.render('icecreams', {icecreams: icecreams})
})
app.get('/icecream/:name', function(req, res, next) {
  var name = req.params.name;
  console.log(name);
  var found;
  for(var i = 0; i < icecreams.length; i++){
    if(icecreams[i].name == name){
      found = icecreams[i];
    }
  }
  res.render("name", found)
})

app.listen(port, function () {
  console.log(`listening on port ${port}`);
})