/**
 * Footer Component Logic
 */
import portfolioConfig from '../../js/config.js';

export function initFooter() {
    const footerLinkedin = document.getElementById('footer-linkedin');
    const footerGithub = document.getElementById('footer-github');
    const footerEmail = document.getElementById('footer-email');

    if (footerLinkedin && portfolioConfig.social.linkedin) {
        footerLinkedin.href = portfolioConfig.social.linkedin;
    }

    if (footerGithub && portfolioConfig.social.github) {
        footerGithub.href = portfolioConfig.social.github;
    }

    if (footerEmail && portfolioConfig.contact.email) {
        footerEmail.href = `mailto:${portfolioConfig.contact.email}`;
    }
}
