const rightNavCpy = document.querySelector('.right-side-nav');
const projOverlay = document.getElementById('project-overlay');
const overlayExitBtn = document.getElementsByClassName('right-align-btn')[0].querySelector('div');


var overlayKeyboardFocusTrapActive = false;

document.addEventListener('DOMContentLoaded', (e) => {
    loadProjects();
    
    if (overlayExitBtn){
        overlayExitBtn.addEventListener('click', () => {
            showOverlay();
        });

        overlayExitBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                overlayExitBtn.click(); 
            }
        });
    }

    if (projOverlay && overlayKeyboardFocusTrapActive){
       
        const focusableElements = projOverlay.querySelectorAll('a, i, button, [tabindex]:not([tabindex="-1"])');
        const firstFocusableElement = focusableElements[0]; // First element to be focused
        const lastFocusableElement = focusableElements[focusableElements.length - 1]; // Last element to be focused
    
        projOverlay.addEventListener('keydown', function(e) {
            const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);
    
            if (!isTabPressed) {
                return;
            }
    
            if (e.shiftKey) { // If Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus(); // Focus last element
                }
            } else { // If Tab is pressed
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus(); // Focus first element
                }
            }
        });
    
    
    }


});

function showOverlay(){
    // const focusedElement = document.activeElement;
    // console.log('Currently focused element:', focusedElement);

    const blurMain = document.getElementById('blurMain');
    blurMain.classList.toggle('active');

    const blurFooter = document.getElementById('blurFooter');
    blurFooter.classList.toggle('active');

    document.getElementById('body').classList.toggle('noscroll');
    const popup = document.getElementById('project-overlay');
    popup.classList.toggle('active');
    if (rightNavCpy){
        rightNavCpy.classList.toggle('deactivate');
    }

    // set overlay to be where the first focus element is
    const focusableElements = projOverlay.querySelectorAll('a, i, button, [tabindex]:not([tabindex="-1"])');
    const overlayFirstFocusableElement = focusableElements[0]; // First element to be focused
    overlayFirstFocusableElement.focus();
}

async function loadProjects(){
    const overlay = document.getElementById('project-overlay');
    const projectsDiv = document.getElementById('projects');
    fetch("../assets/resources/json/projects.json")
    .then(response => response.json())
    .then(data => {
        for (const entryKey in data) {
            const entry = data[entryKey];
            const section = document.createElement('section');
            // give each section an aria-label="View details for Project Name"
            //  and role="button"
            section.setAttribute('role','button');
            section.setAttribute('tabindex','0');
            section.setAttribute('aria-label', `View details for Project ${entry.project_name}`);
            section.setAttribute('aria-hidden', 'false');

            section.classList.add('project-card');
            if (entry.id){
                section.id = entry.id;
            }

            section.innerHTML = `
                <h2>${entry.project_name}</h2>
                <div class="staggered-box">
                    <img src="${entry.img}" alt="${entry.alt}">
                </div>
            `;

            // add another event listener for enter and space that has the same functionality as click
            section.addEventListener('click', (e) => {
                const imgElem = overlay.querySelector('img');
                imgElem.src = entry.img;
                imgElem.alt = entry.alt;

                overlay.querySelector('h1').innerHTML = entry.project_name;

                overlay.querySelector('#project-desc').innerHTML = entry.desc;

                const aTag = overlay.querySelector('a');
                aTag.href = entry.project_link;
                aTag.setAttribute('aria-label', `Open ${entry.project_name}`);



                const skills = overlay.querySelector('.skill-grid');
                skills.innerHTML = '';
                const skillElements = entry.skills.map(skill => `<p class='skill-button'>${skill}</p>`);
                skills.innerHTML = skillElements.join('');

                // entry.skills.forEach(skill => {
                //     const p = document.createElement('p');
                //     p.classList.add('skill-button');
                //     p.innerHTML = skill;
                // });
                showOverlay();
            });

            section.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); // Prevent scrolling or other default actions
                    section.click(); // Trigger the click event
                }
            });

            projectsDiv.appendChild(section);
        };
    }).catch(err => {console.error("Error fetching projects json file, with error:", err);});
}
