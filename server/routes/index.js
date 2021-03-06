/**
 * Created by colinmiller on 11/8/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/message_app';

//This is needed for the heroku database. Place after process.env.DATABASE_URL above
//+ "?ssl=true"

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded:true}));

router.get('/data', function(req, res){
    var allMessages = [];

    pg.connect(connectionString, function(err, client){
        var query = client.query("SELECT id, name, message FROM messages ORDER BY id ASC");
            query.on('row', function(row){
                allMessages.push(row);
            });
            query.on('end', function(){
                client.end();
                console.log(allMessages);
                return res.json(allMessages);
            });
        if (err){
            console.log(err);
        }
    });
});

router.post('/data', function(req, res){
    //transferring the imported object into a local variable to be used below
    var addMessage = {
        "name" : req.body.name,
        "message" : req.body.message
    };

    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO messages (name, message) VALUES ($1, $2) RETURNING id",
        [addMessage.name, addMessage.message],
            function(err, result){
                if(err){
                    console.log("Error inserting data:", err);
                    res.send(false);
                }
                res.send(true);
            });
    });
});


//delete is not functioning yet
router.delete('/data', function(req,res){

    pg.connect(connectionString, function(err, client){
       client.query("DELETE FROM messages WHERE id = ($1)", [req.body.id],
       function(err, result){
           if (err){
               console.log("Error deleting data: ", err);
               res.send(false);
           }
           res.send(true);
       });
    });
});

router.get('/admin', function(req,res){
    var file = req.params[0] || "views/adminIndex.html";
    res.sendFile(path.join(__dirname, '../public', file));
});

router.get('/home', function(req,res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, '../public', file));
});

router.get('/*', function(req,res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, '../public', file));
});

module.exports = router;