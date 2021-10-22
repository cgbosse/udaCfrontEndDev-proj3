// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3046;

const server = app.listen(port, listening);

function listening(){
    console.log("Server is running");
    console.log(`Running on localhost: ${port}`);
}


// TODO-ROUTES!

// GET method route
app.get('/all',sendData)

function sendData (req, res) {
    res.send(projectData);
};


// POST method route

//---- App variable for data returned by the website app.
const appData = [];

app.post('/addInfo', postData);

function postData (req, res) {
    //res.send("posting app data");
    
    appData.push(req.body);
    console.log("App Data: " + appData);
    console.log(req.body);
    
  };


