import './styles/main.scss'
import './styles/loader.scss'

import {saveTripAction} from './js/app'

let today = new Date(),
day = today.getDate(),
month = today.getMonth()+1, //January is 0
year = today.getFullYear();
    if(day<10){
        day='0'+day
    } 
    if(month<10){
        month='0'+month
    }
    today = year+'-'+month+'-'+day;

document.getElementById("trip-departure").setAttribute("min", today);
document.getElementById("trip-departure").setAttribute("value", today);

// Add button  action
const button = document.querySelector("#save-trip");
button.addEventListener("click", saveTripAction);