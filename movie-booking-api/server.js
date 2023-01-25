const express = require('express');
const serverConfig = require('./configs/config');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

mongoose.connect(dbConfig.db_url,()=>{
    console.log("Connected to MongoDB");
},err=>{
    console.log(err.message);
})

require('./routes/movie.routes')(app);
require('./routes/theatre.routes')(app);

app.get('/', (req,res)=>{
    res.send("Inside Movie Booking application.");
})



app.listen(serverConfig.port,()=>{
    console.log("Application running on port",serverConfig.port);
})