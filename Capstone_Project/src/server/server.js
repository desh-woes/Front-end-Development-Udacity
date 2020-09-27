// Server Setup with Express
const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const cors = require('cors');

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

// Running server port
const port = 8081;

// Spin up the server
const server = app.listen(port, listening);
    // callback to debug
    function listening (){
        console.log('server running');
        console.log(`running on localhost: ${port}`);
    };

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Post request for adding date to project endpoint
app.post('/addProjectData', receiveData);
    async function receiveData(request, response){
        projectData = request.body;

        // Query for Geonames API results
        let geonamesURL = `http://api.geonames.org/postalCodeSearchJSON?username=${process.env.GEONAMES}&placename=${projectData.trip_destination}`;
        await fetchResults(geonamesURL)
        .then(function(geonames_result){
            // Update app endpoint with the new data from geonames
            projectData.latitude = geonames_result.postalCodes[0].lat;
            projectData.longitude = geonames_result.postalCodes[0].lng;
        })

        // Query for weatherbit API results
        const weatherbitURL = `http://api.weatherbit.io/v2.0/forecast/daily?&lat=${projectData.latitude}&lon=${projectData.longitude}&key=${process.env.WEATHERBIT}`;
        await fetchResults(weatherbitURL)
        .then(function (weatherbit_result){
            // Update app endpoint with the new data from weatherbit
            let index = projectData.date_diff;
            projectData.high_temp = weatherbit_result.data[index].high_temp;
            projectData.low_temp = weatherbit_result.data[index].low_temp;
            projectData.weather_description = weatherbit_result.data[index].weather.description;
        })

        // Query for pixabay API results
        const pixabayURL = `https://pixabay.com/api/?category=Places&image_type=photo&key=${process.env.PIXABAY}&q=${processPlace(projectData.trip_destination)}`;
        await fetchResults(pixabayURL)
        .then(function (pixabay_result){
            if (pixabay_result.hits.length > 0){
                projectData.img_url = pixabay_result.hits[0].largeImageURL;
            }
            else{
                projectData.img_url = "https://pixabay.com/get/57e0d74b4e52b108f5d0846096293f7a1236dfe6564c704f752e79d69e4dc251_1280.jpg"
            }
        })

        response.send(projectData);
    }

// Generic function used for fetching API results
const fetchResults = async (base_url_in="") => {
    console.log(base_url_in);
    const response = await fetch(base_url_in);
    try {
        const newData = await response.json();
        return newData; 
    } catch(error) {
        console.log("error", error);
    }
}

// Function to help process place names for the pixabay API
function processPlace(inputPlace){
    if (inputPlace.split(" ").length > 1){
        return inputPlace.split(" ").join("+");
    } return inputPlace;
}