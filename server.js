const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose');
const port = process.env.PORT || 4000
const app = express();
import { HomeController } from "./src/controllers/Home.controller"


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes the handles requests && Middleware function that handles the requests
const todoRoutes = require('./src/routes/todo.routes');
const userRoutes = require('./src/routes/users.routes');

// Mongoose Connections
mongoose.connect('mongodb://localhost:27017/todoList', {useNewUrlParser: true, useUnifiedTopology: true})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> console.log('Connected to DB'));

// Morgan Middleware
app.use(morgan('dev'));

// Home Routes

app.get('/', HomeController)

app.use('/todo', todoRoutes);
app.use('/user', userRoutes);

app.all('*', (req, res) => {
    res.status(404).json({
        message: "Page cannot be found"
    });
});

app.listen(port, () => {
    console.log("The server is up and running")
});


