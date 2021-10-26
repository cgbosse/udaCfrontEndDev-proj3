/* ------------ Setting up the server ----------------*/
// Using code from the course as a boiler plate

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


// ---------------------- TODO-ROUTES! ---------------------- 

// ---------- GET method route ---------- 
app.get('/all',sendData)

function sendData (req, res) {
    res.send(projectData);
   
    //console.log('Projectdata Stringified:  ' + JSON.stringify(projectData));
    //console.log("projectData length: " + projectData.length);  
 };

// ---------- POST method route ---------- 

//---- App variable for data returned by the website app.


app.post('/addInfo', postData);

function postData (req, res) {
    //res.send("posting app data");
    
    console.log("Received Request Body: " + req.body);
    
    //Received object assigning to the projectData object step by step for clarity
    projectData.date = req.body.date;
    projectData.zipCode = req.body.zipCode;
    projectData.feelings = req.body.feelings;
    projectData.temperature = req.body.temperature;
    
    //console.log('Project Data stringified' + JSON.stringify(projectData));

    /*
    //I experimented with the creation of a database
    //const appData = [];
    appData.push(req.body);
    console.log("App Data: " + appData);
    
    //Establish the length of the appData to get the last entry
    projectData = appData;
    */
    //console.log('Project Data: ' + projectData);
  };


