// Event listener to update page background based on current section
function makeActiveSection(){
    // Get all the sections in the document
    const sections = document.querySelectorAll('section');

    // Get all the nav elements
    const navElemens = document.querySelectorAll('a');
    let index = 0;

    // Loop through the esctions and add background to the current section
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        let currentAnchor = navElemens[index];

        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add('your-active-class');
            currentAnchor.classList.add("active_section");
        } 
        // Remove background from section that is not in use.
        else {
            section.classList.remove('your-active-class');
            currentAnchor.classList.remove("active_section");
        }
        index +=1;
    }
}

// Add event listener to the window so backgroud can be updated on scroll.
window.addEventListener('scroll', makeActiveSection);

// Update scroll behaviour
function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href")
    const offsetTop = document.querySelector(href).offsetTop;
 
    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}

// Create function to update the navigation bar in the page based on html sections
function updateNavBar() {
    // Create variable to store new nav content
    const newNav = document.getElementById("navbar__list");

    // Create variable to store all the sections in the html file
    const allSections = document.querySelectorAll("section");

    for (let index = 0; index < allSections.length; index++){
        let newListItem = document.createElement('li');
        let anchorTag = document.createElement('a');
        anchorTag.appendChild(document.createTextNode(allSections[index].id));
        anchorTag.href = `#${allSections[index].id}`;
        anchorTag.className = "menu__link";
        anchorTag.addEventListener('click', clickHandler);
        newListItem.appendChild(anchorTag);
        newNav.appendChild(newListItem);
    }
}


// Add event to the document 
window.addEventListener('DOMContentLoaded', updateNavBar);