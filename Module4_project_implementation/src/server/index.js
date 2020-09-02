var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require("dotenv");
const cors = require('cors')
const fetch = require("node-fetch");

dotenv.config();

const app = express()

app.use(express.static('dist'))

app.use(cors())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Get meaning cloud data
const getMeaningCloud = async (url = "") => {
    const response = await fetch(url);
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

app.get('/meaningCloud', returnMeaningCloudData);
    function returnMeaningCloudData(req, res){
        // Construct URL
        const userLink = "https://www.linkedin.com/pulse/20-year-olds-journal-oluwarotimi-adesina/";
        const url = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&url=${userLink}`;
        console.log(url);
        const newData = getMeaningCloud(url);
        console.log(newData);
        res.send(newData);
    }