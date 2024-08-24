document.addEventListener("DOMContentLoaded", (e) => {
    if (window.location.pathname.endsWith('resume.html')){
        loadPageContents();
    }
});

const rightNav = document.querySelector('.right-side-nav');
if (rightNav){
    const rightNavIcon = rightNav.querySelector('i');
    rightNavIcon.addEventListener('click', (e) => {
        if (!rightNav.classList.contains('deactivate')){
            rightNav.classList.toggle('show');
            const isOpen = rightNav.classList.contains('show');
            rightNavIcon.classList = isOpen 
                ? 'fa-solid fa-chevron-right' 
                : 'fa-solid fa-chevron-left';
        }
    });
}

const pageHead = document.querySelector('.page-head-container');
const pageHeadHeight = pageHead.clientHeight * 0.85;
window.addEventListener("scroll", () => {
    const distance = window.scrollY;
    if (distance > pageHeadHeight && rightNav){
        rightNav.classList.add('screen-visible');
    } else {
        if (rightNav){
            rightNav.classList.remove('screen-visible');
        }
    }
    
});

async function loadPageContents(){
    fetch("../assets/resources/json/resume.json")
    .then(response => response.json())
    .then(data => {
        // get in-page locations
        const skillSection = document.getElementById('skills').querySelector('div');
        const expSection = document.getElementById('exp').querySelector('div');

        const skillsJson = data.Skills;
        const expJson = data.Experience;
        
        for (const key in skillsJson){
            const skills = skillsJson[key];
            const skillElements = skills.map(skill => `<p class="skill-button">${skill}</p>`);
            const skillContainer = document.createElement('div');
            skillContainer.classList.add("skill-box");
            skillContainer.innerHTML = skillElements.join('');

            const sectionElem = document.createElement('section');
            sectionElem.classList.add("left-align");
            sectionElem.classList.add("staggered-box");
            sectionElem.innerHTML += `<h2>${key}</h2>`
            sectionElem.appendChild(skillContainer);

            skillSection.appendChild(sectionElem);
        }

        
        for (const [__, pos] of Object.entries(expJson)){
            const sectionElem = document.createElement('section');
            sectionElem.classList.add("left-align");
            sectionElem.classList.add("staggered-box");
            sectionElem.classList.add("s2");
            sectionElem.innerHTML += `<h2>${pos.role}</h2>`;

            const divContainer = document.createElement('div');
            const posContainer = document.createElement('div');
            posContainer.classList.add("position-sub-header");
            posContainer.innerHTML = `<h3>${pos.location}</h3>
                <h3><em>${pos.date}</em></h3>`;
            
            const detailsContainer = document.createElement('ul');
            const details = pos.details.map(detail => `<li>${detail}</li>`);
            detailsContainer.innerHTML = details.join('');

            divContainer.appendChild(posContainer);
            divContainer.appendChild(detailsContainer);

            sectionElem.appendChild(divContainer);
            
            expSection.appendChild(sectionElem);
        }
            
        
    })
    .catch(err => {console.error("Error fetching resume.json with error:", err);});
}