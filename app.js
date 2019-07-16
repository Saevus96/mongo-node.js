const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

//Middlewares
app.use(bodyParser.json());
app.use(cors());
//Import Routes
const postsRoute = require('./routes/posts');

app.use("/posts", postsRoute);

/*//Middlewares - funkcje wykonujace sie podczas wczytania
app.use('/posts', () => {
    console.log("Middleware")
})*/

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: false }, () => {
    
    console.log('connected to DB');
});


//Listen server
app.listen(3000);