var express = require('express');
var config = require('dotenv').config();
var bodyParser = require('body-parser');

var app = express();



var absolutePath = __dirname + "/views/index.html";
var staticFiles = __dirname + "/public";

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

app.use("/public",express.static(staticFiles));
app.use("/", function (req, res, next) {
  console.log(`${req.method} /${req.path} - ${req.ip}`);
  //console.log(req);
  next();
});

app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res){
  res.send({time: req.time});
});

app.get("/:word/echo", function (req, res) {
  res.send({echo: req.params.word});
});

app.route("/name")
  .get(function(req, res){
    res.send({name: `${req.query.first} ${req.query.last}`})
  })
  .post(function (req, res){
    res.send({name: `${req.body.first} ${req.body.last}`});
  });

app.get("/json", function (req, res) {
    var body = "Hello json";

    if (process.env.MESSAGE_STYLE === "uppercase"){
      body = "HELLO JSON";
    }

    res.json({
        "message": body
    });
  });

 module.exports = app;
