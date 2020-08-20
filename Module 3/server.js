// Empty JS object to act as endppoint for all routes
projectData = {};
data = []

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

// Middleware
// Here we are configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Spin up the server
const server = app.listen(port, listening);
    // callback to debug
    function listening (){
        console.log('server running');
        console.log(`running on localhost: ${port}`);
    };

// GET route
app.get('/all', sendData);
    function sendData (request, response) {
        response.send(projectData)
    }


// POST route
app.post('/add', function(request, response){
    response.send("POST received");
});

app.post("/animal", function(request, response){
    data.push(request.body);
    console.log(data);
});