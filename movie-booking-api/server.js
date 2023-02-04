const express = require('express');
const serverConfig = require('./configs/config');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const bodyParser = require('body-parser');
require('dotenv').config();


const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const constants = require("./utils/constants");


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

mongoose.connect(dbConfig.db_url, () => {
    console.log("Connected to MongoDB");
    init()
}, err => {
    console.log(err.message);
})

require('./routes/movie.routes')(app);
require('./routes/theatre.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require("./routes/booking.routes")(app);
require("./routes/payment.routes")(app);


app.get('/', (req, res) => {
    res.send("Inside Movie Booking application.");
})



app.listen(serverConfig.port, () => {
    console.log("Application running on port", serverConfig.port);
})

async function init() {

    try {
        const user = await User.create({
            name: "admin",
            userId: "admin",
            email: "admin@gmail.com",
            password: bcrypt.hashSync("admin", 10),
            userStatus: constants.userStatus.approved,
            userTypes: constants.userTypes.admin
        });

        console.log("Admin user created successfully");
    } catch (e) {
        console.log(e.message);
    }
}