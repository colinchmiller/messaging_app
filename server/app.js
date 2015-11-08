var express = require('express');
var app = express();
var path = require('path');


var index = require('./routes/index.js');

app.set('port', process.env.PORT || 5000);

app.use('/', index);


app.listen(app.get("port"), function(){
    console.log("Take a listen to port: ", app.get('port'));
});