// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Require dotenv for concealing API keys
const dotenv = require("dotenv");
dotenv.config();

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

const fetch = require("node-fetch");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8081;

// Spin up the server
const server = app.listen(port, listening);
    // callback to debug
    function listening (){
        console.log('server running');
        console.log(`running on localhost: ${port}`);
    };


// POST route
app.post('/addProjectData', receiveData);
    function receiveData (request, response) {
        const data = request.body;
        let newDataObj = {
            latitude : data.latitude,
            longitude: data.longitude,
            country: data.country,
            date_difference : data.date_difference
        };
        projectData = newDataObj;
    }

// Get request to Weatherbit API
const getWeatherInfo = async (base_url_in="", lat_in="", lon_in="", api_key_in="") => {
    const url = base_url_in + `&lat=${lat_in}` + `&lon=${lon_in}` + `&key=${api_key_in}`;
    console.log(url);
    const response = await fetch(url);
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("Error", error);
    }
}

// GET API key
app.get('/getProjectData', sendData);
    function sendData (request, response) {
        getWeatherInfo("http://api.weatherbit.io/v2.0/forecast/daily?", projectData.latitude, projectData.longitude, process.env.API_KEY)
        .then(function(data_output){
            let newObj = {
                latitude : projectData.latitude,
                longitude: projectData.longitude,
                country: projectData.country,
                date_difference : projectData.date_difference,
                high_temp : data_output.data[0].high_temp,
                low_temp : data_output.data[0].low_temp,
                weather_description : data_output.data[0].weather.description
            }
            projectData = newObj;

        })
        response.send(projectData);
    }
