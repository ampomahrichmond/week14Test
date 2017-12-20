module.exports = function(app, connection){




  app.get("/", function(req, res, next) {
    connection.query("SELECT * FROM movies", function(err, data){
      console.log(data)
      res.render("index", {movies: data} )  
    })
  }) 

  app.post("/movies", function (req, res, next) {
    connection.query("insert into movies (movies) values (?)",[req.body.movie], function (err, data) {
      console.log(data)
      res.render("index", { movies: data })
    })
  }) 
  app.put("/movies", function (req, res, next) {
    connection.query("SELECT * FROM movies", function (err, data) {
      console.log(data)
      res.render("index", { movies: data })
    })
  }) 
  app.delete("/movies", function (req, res, next) {
    connection.query("SELECT * FROM movies", function (err, data) {
      console.log(data)
      res.render("index", { movies: data })
    })
  }) 
}