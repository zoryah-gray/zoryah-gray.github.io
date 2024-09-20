document.addEventListener("DOMContentLoaded", (e) => {
    const aboutSec = document.getElementById('about-me');
    console.log(aboutSec);

    fetch("/public/assets/resources/json/about_me.json")
    .then(response => response.json())
    .then(data => {
        var pSection;
        Object.values(data).forEach(elem => {
            pSection = document.createElement('p');
            pSection.innerHTML = elem;

            aboutSec.appendChild(pSection);
            aboutSec.appendChild(document.createElement('br'));
        });
        
    }).catch(err => {console.error("Error fetching about me json file, with error:", err);});
});