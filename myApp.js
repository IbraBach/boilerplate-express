var express = require('express');
var config = require('dotenv').config();
var app = express();



var absolutePath = __dirname + "/views/index.html";
var staticFiles = __dirname + "/public";

app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

app.use("/public",express.static(staticFiles));
app.use("/", function (req, res, next) {
  console.log(`${req.method} /${req.path} - ${req.ip}`);
  //console.log(req);
  next();
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
