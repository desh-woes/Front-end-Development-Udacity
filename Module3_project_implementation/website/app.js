/* Global Variables */
const base_url = "http://api.openweathermap.org/data/2.5/weather?zip=";
const api_key = "&appid=908ca379d62b29cf7ca290c5c8a2a46c";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Get request to OpenWeatherMap API
const getWeatherInfo = async (base_url_in="", zip_code_in="", api_key_in="") => {
    const url = base_url_in + zip_code_in + api_key_in;
    console.log(url);
    const response = await fetch(url);
    try {
        const newData = await response.json();
        return newData; 
    } catch(error) {
        console.log("error", error);
    }
}

// POST request to add API data
const postWeatherInfo = async (url_path = "", data={}) => {
    const response = await fetch(url_path, {
            method: 'POST', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
           // Body data type must match "Content-Type" header        
            body: JSON.stringify(data),
        });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

// GET projecrData API
const getProjectData = async (url = "") => {
    const response = await fetch(url);
    try {
        const newData = await response.json();
        const tempratureHolder = document.querySelector("#temp");
        const dateHolder = document.querySelector("#date");
        const userInputHolder = document.querySelector("#content");

        // Update DOM content.
        tempratureHolder.textContent = newData.temprature;
        dateHolder.textContent = newData.date;
        userInputHolder.textContent = newData.user_response;
    } catch(error) {
        console.log("error", error);
    }
}

const button = document.querySelector("#generate");
button.addEventListener("click", buttonClickAction);
    function buttonClickAction(){
        const zip_code = document.querySelector("#zip").value;
        console.log(`this is the zip code: ${zip_code}`);
        getWeatherInfo(base_url, zip_code, api_key).then(function (data){
            console.log("Data:", data);
            const user_response = document.querySelector("#feelings").value;
            console.log("feelings:", user_response);
            const newObj = {
                temprature : data.main.temp,
                date : newDate,
                user_response : user_response
            }
            postWeatherInfo("/addProjectData", newObj).then(getProjectData("/getProjectData"));
        })
    }