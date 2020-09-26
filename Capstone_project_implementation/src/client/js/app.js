/* Global Variables */
const base_url = "http://api.geonames.org/postalCodeSearchJSON?placename=";
const api_key = "&username=oadesina";

// Create a new date instance dynamically with JS
let date_today = new Date(2020, 9, 25);


// Get request to GeoNames API
const getGeoNamesInfo = async (base_url_in="", city_name_in="", api_key_in="") => {
    const url = base_url_in + city_name_in + api_key_in;
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
        console.log(newData);

        const latitudeHolder = document.querySelector("#long");
        const longitudeHolder = document.querySelector("#lat");
        const countryHolder = document.querySelector("#country");
        const dateDiffHolder = document.querySelector('#date_dif');

        // Update DOM content.
        latitudeHolder.innerHTML = newData.latitude;
        longitudeHolder.innerHTML = newData.longitude;
        countryHolder.innerHTML = newData.country;
        dateDiffHolder.innerHTML = `${newData.date_difference} Days`
    } catch(error) {
        console.log("error", error);
    }
}

// GET API key
const getWeatherbitAPI = async (url="") => {
    const response = await fetch(url);
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

async function buttonClickAction(){
    const city_name = document.querySelector("#zip").value;
    const travel_date = document.querySelector("#date").value.split("-").map(numStr => parseInt(numStr));
    const date_difference = (new Date(travel_date[0], travel_date[1], travel_date[2])).getDate() - date_today.getDate();
    console.log(`this is the city name: ${city_name}`);
    console.log(`this is the travel date: ${travel_date} ---- ${date_today} ----- ${date_difference}.`)
    getGeoNamesInfo(base_url, city_name, api_key).then(function (data){
        console.log("Data:", data);
        const user_response = document.querySelector("#feelings").value;
        console.log("feelings:", user_response);
        const newObj = {
            latitude : data.postalCodes[0].lat,
            longitude : data.postalCodes[0].lng,
            country : data.postalCodes[0].placeName,
            date_difference : date_difference
        }
        
        postWeatherInfo("http://localhost:8081/addProjectData", newObj)
        .then(getProjectData("http://localhost:8081/getProjectData"));
    })
}

export {buttonClickAction}