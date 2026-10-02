/**
 * Contact Component Logic
 */
import portfolioConfig from '../../js/config.js';

export function initContact() {
    const contactEmail = document.getElementById('contact-email');
    const contactLocation = document.getElementById('contact-location');
    const contactLinkedin = document.getElementById('contact-linkedin');
    const contactGithub = document.getElementById('contact-github');
    const contactEmailBtn = document.getElementById('contact-email-btn');
    const contactCvBtn = document.getElementById('contact-cv-btn');

    // Update config bindings
    if (contactEmail && portfolioConfig.contact.email) {
        contactEmail.textContent = portfolioConfig.contact.email;
        contactEmail.href = `mailto:${portfolioConfig.contact.email}`;
    }

    if (contactLocation && portfolioConfig.contact.location) {
        contactLocation.textContent = portfolioConfig.contact.location;
    }

    if (contactLinkedin && portfolioConfig.social.linkedin) {
        contactLinkedin.href = portfolioConfig.social.linkedin;
    }

    if (contactGithub && portfolioConfig.social.github) {
        contactGithub.href = portfolioConfig.social.github;
    }

    if (contactEmailBtn && portfolioConfig.contact.email) {
        contactEmailBtn.href = `mailto:${portfolioConfig.contact.email}`;
    }

    if (contactCvBtn && portfolioConfig.assets.cv) {
        contactCvBtn.href = portfolioConfig.assets.cv;
    }

    // Form Handling
    const form = document.getElementById('contact-form');
    const statusAlert = document.getElementById('form-status');

    if (!form) return;

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearErrors() {
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
        });
        if (statusAlert) {
            statusAlert.className = 'form-status-alert';
            statusAlert.textContent = '';
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email-input');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        if (!nameInput.value.trim()) {
            nameInput.closest('.form-group').classList.add('has-error');
            isValid = false;
        }

        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
            emailInput.closest('.form-group').classList.add('has-error');
            isValid = false;
        }

        if (!subjectInput.value.trim()) {
            subjectInput.closest('.form-group').classList.add('has-error');
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            messageInput.closest('.form-group').classList.add('has-error');
            isValid = false;
        }

        if (!isValid) return;

        // Show Success Feedback
        if (statusAlert) {
            statusAlert.classList.add('success');
            statusAlert.textContent = 'Thank you! Your message details have been validated. You can also contact directly via email above.';
        }

        form.reset();
    });
}
