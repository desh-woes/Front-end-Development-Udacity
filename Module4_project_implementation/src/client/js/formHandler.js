// POST request to get meaningCloud Data
const postMeaningCloudInfo = async (url_path = "", data={}) => {
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

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    postMeaningCloudInfo("http://localhost:8081/meaningCloud", {url: formText})
    .then(function(res){
        console.log(res);
    })
}

export { handleSubmit }