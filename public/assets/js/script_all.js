const darkModeCheckbox = document.getElementById('darkmode-toggle');
darkModeCheckbox.setAttribute('tabindex','0');

// const darkModeLabel = document.querySelector('.darkmodeLabel');
const darkModeLabel = document.querySelector('label[for="darkmode-toggle"]');
darkModeLabel.setAttribute('tabindex','0');

const toggleBarIcon = document.querySelector('.toggle-bar');
const dropDownMenuBars = document.querySelector('.dropdown-menu');


const darkModeOriginalParent = toggleBarIcon.parentElement;
const darkModeDropContainer = document.createElement('li');
darkModeDropContainer.classList.add('dropdown-darkmode');

const body = document.body;

document.addEventListener('DOMContentLoaded', (e) => {
    // const toggleBarIcon = document.querySelector('.toggle-bar');
    const barIcon = toggleBarIcon.querySelector("i");
    toggleBarIcon.setAttribute('aria-hidden', 'false');
    toggleBarIcon.setAttribute('tabindex','0');
    const toggleBtnDiv = document.querySelector('div[aria-controls="main-navigation"]');
    // dropDownMenuBars = document.querySelector('.dropdown-menu');
    moveDarkModeElements();



    toggleBarIcon.addEventListener('click', () => {
        dropDownMenuBars.classList.toggle('open');
        const isOpen = dropDownMenuBars.classList.contains('open');
        barIcon.classList = isOpen 
            ? 'fa-solid fa-xmark' 
            : 'fa-solid fa-bars';


        // if (isOpen){
        //     dropDownMenuBars.appendChild(darkModeCheckbox);
        //     dropDownMenuBars.appendChild(darkModeLabel);
        // } else {

        // }

        // set aria label to expanded
        const isExpanded = toggleBtnDiv.getAttribute('aria-expanded') === 'true';
        toggleBtnDiv.setAttribute('aria-expanded', !isExpanded);

        const isExpandedDropdown = dropDownMenuBars.getAttribute('aria-expanded') === 'true';
        dropDownMenuBars.setAttribute('aria-expanded', !isExpandedDropdown);
    });

    toggleBarIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); 
            toggleBarIcon.click(); 
        }
    });

    if (localStorage.getItem('dark-mode') === 'true'){
        body.classList.add('dark-mode');
        darkModeCheckbox.checked = true;
        darkModeCheckbox.setAttribute('aria-checked', 'true');
        // darkModeLabel.setAttribute('aria-checked', 'true');
    } else{
        darkModeCheckbox.setAttribute('aria-checked', 'false');
        // darkModeLabel.setAttribute('aria-checked', 'false');
    }

    darkModeCheckbox.addEventListener('change', () => {
        if (darkModeCheckbox.checked){
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true');
            darkModeCheckbox.setAttribute('aria-checked', 'true');
            // darkModeLabel.setAttribute('aria-checked', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false');
            darkModeCheckbox.setAttribute('aria-checked', 'false');
            // darkModeLabel.setAttribute('aria-checked', 'false');
        }
    });

    darkModeLabel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); 
            darkModeLabel.click(); 
        }
    });


    window.addEventListener('resize', () => {
        moveDarkModeElements();
        const navLinks = document.querySelector('.nav-links');
        const navLinksVisible = window.getComputedStyle(navLinks).display;
        
        // Hide dropdown menu if nav-links are visible
        if (navLinksVisible !== 'none') {
            dropDownMenuBars.classList.remove('open');
            barIcon.className = 'fa-solid fa-bars'; // Reset icon to bars
            
            const isExpanded = toggleBtnDiv.getAttribute('aria-expanded') === 'true';
            toggleBtnDiv.setAttribute('aria-expanded', !isExpanded);

            const isExpandedDropdown = dropDownMenuBars.getAttribute('aria-expanded') === 'true';
            dropDownMenuBars.setAttribute('aria-expanded', !isExpandedDropdown);
        }
    });

    const pageHead = document.querySelector('.page-head-container');
    const pageHeadHeight = pageHead.clientHeight * 0.85;
    const navToType = document.getElementById('navToTop');
    window.addEventListener("scroll", () => {
        const distance = window.scrollY;
        if (distance > pageHeadHeight){
            navToType.classList.add('show');
        } else {
            navToType.classList.remove('show');
        }
        
    });
});

function moveDarkModeElements() {
    // if dropdown toggle bar is showing, move the darkmode elements
    if (window.getComputedStyle(toggleBarIcon).display === 'block') {
        darkModeDropContainer.appendChild(darkModeCheckbox);
        darkModeDropContainer.appendChild(darkModeLabel);
        dropDownMenuBars.appendChild(darkModeDropContainer);
        darkModeLabel.classList.add('moved');
    } else {
        darkModeOriginalParent.appendChild(darkModeCheckbox);
        darkModeOriginalParent.appendChild(darkModeLabel);
        darkModeLabel.classList.remove('moved');
    }
}