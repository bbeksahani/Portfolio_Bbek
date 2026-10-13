
/**
 * Contact Component Logic
 * Web3Forms integration
 */

import portfolioConfig from '../../js/config.js';

export function initContact() {
    // Contact information elements
    const contactEmail = document.getElementById('contact-email');
    const contactLocation = document.getElementById('contact-location');
    const contactLinkedin = document.getElementById('contact-linkedin');
    const contactGithub = document.getElementById('contact-github');
    const contactEmailBtn = document.getElementById('contact-email-btn');
    const contactCvBtn = document.getElementById('contact-cv-btn');

    // Update email from configuration
    if (contactEmail && portfolioConfig.contact.email) {
        contactEmail.textContent = portfolioConfig.contact.email;
        contactEmail.href = `mailto:${portfolioConfig.contact.email}`;
    }

    // Update location from configuration
    if (contactLocation && portfolioConfig.contact.location) {
        contactLocation.textContent = portfolioConfig.contact.location;
    }

    // Update LinkedIn from configuration
    if (contactLinkedin && portfolioConfig.social.linkedin) {
        contactLinkedin.href = portfolioConfig.social.linkedin;
    }

    // Update GitHub from configuration
    if (contactGithub && portfolioConfig.social.github) {
        contactGithub.href = portfolioConfig.social.github;
    }

    // Update email button
    if (contactEmailBtn && portfolioConfig.contact.email) {
        contactEmailBtn.href = `mailto:${portfolioConfig.contact.email}`;
    }

    // Update CV download link
    if (contactCvBtn && portfolioConfig.assets.cv) {
        contactCvBtn.href = portfolioConfig.assets.cv;
    }

    // Web3Forms submission
    const form = document.getElementById('contact-form');
    const statusAlert = document.getElementById('form-status');

    if (!form) return;

    // Prevent duplicate event listeners if initialization runs again
    if (form.dataset.contactInitialized === 'true') return;
    form.dataset.contactInitialized = 'true';

    const submitBtn = document.getElementById('submit-btn');
    const submitBtnText = submitBtn?.querySelector('span');

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

    // function showError(input, message) {
    //     input.closest('.form-group')?.classList.add('has-error');
    //     input.setAttribute('aria-invalid', 'true');

    //     if (message) {
    //         message.textContent = message.textContent;
    //     }
    // }

    // Clear field errors when the user edits the field
    form.querySelectorAll('input:not([type="hidden"]), textarea')
        .forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.closest('.form-group')
                        ?.classList.remove('has-error');

                    input.removeAttribute('aria-invalid');
                }
            });
        });

    form.addEventListener('submit', async event => {
        event.preventDefault();
        clearErrors();

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email-input');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        let isValid = true;

        // Validate name
        if (!nameInput.value.trim()) {
            nameInput.closest('.form-group')
                ?.classList.add('has-error');
            nameInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        }

        // Validate email
        if (
            !emailInput.value.trim() ||
            !validateEmail(emailInput.value.trim())
        ) {
            emailInput.closest('.form-group')
                ?.classList.add('has-error');
            emailInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        }

        // Validate subject
        if (!subjectInput.value.trim()) {
            subjectInput.closest('.form-group')
                ?.classList.add('has-error');
            subjectInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        }

        // Validate message
        if (!messageInput.value.trim()) {
            messageInput.closest('.form-group')
                ?.classList.add('has-error');
            messageInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        }

        if (!isValid) {
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            firstInvalid?.focus();

            if (statusAlert) {
                statusAlert.className = 'form-status-alert error';
                statusAlert.textContent =
                    'Please correct the highlighted fields and try again.';
            }

            return;
        }

        const originalText =
            submitBtnText?.textContent || 'Send Message';

        // Disable the button during submission
        if (submitBtn) {
            submitBtn.disabled = true;
        }

        if (submitBtnText) {
            submitBtnText.textContent = 'Sending...';
        }

        if (statusAlert) {
            statusAlert.className = 'form-status-alert';
            statusAlert.textContent = 'Sending your message...';
        }

        try {
            // Collect all form fields, including the access key
            const formData = new FormData(form);

            // Normalize the sender's email
            formData.set('email', emailInput.value.trim());

            // Submit to Web3Forms
            const response = await fetch(
                'https://api.web3forms.com/submit',
                {
                    method: 'POST',
                    body: formData
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || 'Failed to send your message.'
                );
            }

            // Display success feedback
            if (statusAlert) {
                statusAlert.className = 'form-status-alert success';
                statusAlert.textContent =
                    "Thank you! Your message has been sent successfully. I'll get back to you soon.";
            }

            // Clear the submitted fields
            form.reset();

            // Restore normal validation state
            form.querySelectorAll('[aria-invalid="true"]')
                .forEach(input => {
                    input.removeAttribute('aria-invalid');
                });

        } catch (error) {
            console.error('Web3Forms submission error:', error);

            if (statusAlert) {
                statusAlert.className = 'form-status-alert error';
                statusAlert.textContent =
                    error.message ||
                    'Something went wrong. Please try again.';
            }

        } finally {
            // Re-enable the button
            if (submitBtn) {
                submitBtn.disabled = false;
            }

            if (submitBtnText) {
                submitBtnText.textContent = originalText;
            }
        }
    });
}
