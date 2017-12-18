
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express()
app.use(bodyParser.json())

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "seinfeld"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
// respond with "hello world" when a GET request is made to the homepage
app.get('/cast', function (req, respo) {
  var query = "SELECT * FROM actors ORDER BY id";
  connection.query(query, function (err, res) {
    console.log(res)  
    var html = "<h1> Cast </h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (var i = 0; i < res.length; i++) {
      html += "<li><p> ID: " + res[i].id + "</p>";
      html += "<p> name: " + res[i].name + "</p>";
      html += "<p> Att: " + res[i].attitude + "</p>";
      html += "<p>CP: " + res[i].coolness_points + " </p></li>"
    }

    // We close our unordered list.
    html += "</ul>";
    respo.send(html)
  })
})
app.get('/coolness', function (req, respo) {
  var query = "SELECT * FROM actors ORDER BY coolness_points desc";
  connection.query(query, function (err, res) {
    console.log(res)
    var html = "<h1> Cast </h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (var i = 0; i < res.length; i++) {
      html += "<li><p> ID: " + res[i].id + "</p>";
      html += "<p> Name: " + res[i].name + "</p>";
      html += "<p> Att: " + res[i].attitude + "</p>";
      html += "<p>CP: " + res[i].coolness_points + " </p></li>"
    }

    // We close our unordered list.
    html += "</ul>";
    respo.send(html)
  })
})
app.get('/attitude-chart/:att', function (req, respo) {

  var query = "SELECT * FROM actors where ?";
  connection.query(query, [{attitude: req.params.att}], function (err, res) {
    console.log(res)
    var html = "<h1> Cast </h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (var i = 0; i < res.length; i++) {
      html += "<li><p> ID: " + res[i].id + "</p>";
      html += "<p> Name: " + res[i].name + "</p>";
      html += "<p> Att: " + res[i].attitude + "</p>";
      html += "<p>CP: " + res[i].coolness_points + " </p></li>"
    }

    // We close our unordered list.
    html += "</ul>";
    respo.send(html)
  })
})

app.listen(process.env.PORT, function () {
  console.log(`runnning on port ${process.env.PORT}`);
})