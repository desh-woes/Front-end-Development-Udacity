import tripInformation from "./components/tripInformation";
import destinationImage from "./components/countryImage";
import loader from "./components/loader";

// POST request to add data to project endpoint
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

function getDateDiff(inputDate){
    let dateToday = new Date();
    let travelDate = new Date(inputDate[0], inputDate[1]-1, inputDate[2]);

    console.log(travelDate);

    let Difference_In_Time = Math.round(travelDate.getTime() - dateToday.getTime()); 
  
    // To calculate the no. of days between two dates 
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    console.log(`Travel Date: ${parseInt(Difference_In_Days.toFixed(0)) +1}`);
    return parseInt(Difference_In_Days.toFixed(0))+1;
}

async function saveTripAction(){
    const img_holder = document.querySelector("#img-holder");
    const trip_information = document.querySelector("#trip-information");
    const tripDestination = document.querySelector("#trip-destination").value;
    const tripDate = document.querySelector("#trip-departure").value.split("-").map(numStr => parseInt(numStr));
    const dateDiff = getDateDiff(tripDate);

    // Debug statement
    console.log(
        `Trip Destination: ${tripDestination}\n
        Trip Date: ${tripDate}\n
        Date Diff: ${dateDiff}`);

    let newObj = {
        trip_destination : tripDestination,
        trip_date : tripDate,
        date_diff : dateDiff
    }

    img_holder.style.display = "block";
    img_holder.innerHTML = loader();
    const response = await postWeatherInfo('http://localhost:8081/addProjectData', newObj);
    img_holder.innerHTML = destinationImage(response);
    trip_information.innerHTML = tripInformation(response);
}

export {saveTripAction}