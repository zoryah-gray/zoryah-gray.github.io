document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const checkbox = document.getElementById('contactFormCheckbox');
    const autoresponseInput = document.getElementById('autoresponse');

    form.addEventListener('submit', (e) => {
        // If the checkbox is checked, set the autoresponse input value
        if (checkbox.checked) {
            autoresponseInput.value = 'Thank you for reaching out. I have received your submission and will get back to you shortly.';
        } else {
            // Otherwise, clear the autoresponse input value
            autoresponseInput.value = '';
            autoresponseInput.remove();
        }
    });
});
