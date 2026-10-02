/**
 * Main Application Script - Component Orchestrator
 */

import { initNavbar } from '../components/navbar/navbar.js';
import { initHero } from '../components/hero/hero.js';
import { initAbout } from '../components/about/about.js';
import { initExperience } from '../components/experience/experience.js';
import { initSkills } from '../components/skills/skills.js';
import { initProjects } from '../components/projects/projects.js';
import { initCertifications } from '../components/certifications/certifications.js';
import { initEducation } from '../components/education/education.js';
import { initContact } from '../components/contact/contact.js';
import { initFooter } from '../components/footer/footer.js';

// Registry of components to load
const components = [
    { id: 'navbar', path: './components/navbar/navbar.html', init: initNavbar },
    { id: 'hero', path: './components/hero/hero.html', init: initHero },
    { id: 'about', path: './components/about/about.html', init: initAbout },
    { id: 'experience', path: './components/experience/experience.html', init: initExperience },
    { id: 'skills', path: './components/skills/skills.html', init: initSkills },
    { id: 'projects', path: './components/projects/projects.html', init: initProjects },
    { id: 'certifications', path: './components/certifications/certifications.html', init: initCertifications },
    { id: 'education', path: './components/education/education.html', init: initEducation },
    { id: 'contact', path: './components/contact/contact.html', init: initContact },
    { id: 'footer', path: './components/footer/footer.html', init: initFooter }
];

async function loadComponent(component) {
    const element = document.getElementById(component.id);
    if (!element) return;

    try {
        const response = await fetch(component.path);
        if (!response.ok) {
            throw new Error(`Failed to load ${component.path}: ${response.statusText}`);
        }
        const html = await response.text();
        element.innerHTML = html;

        if (component.init && typeof component.init === 'function') {
            component.init();
        }
    } catch (error) {
        console.error(`Error loading component [${component.id}]:`, error);
    }
}

function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    // Load all components concurrently
    await Promise.all(components.map(comp => loadComponent(comp)));

    // Initialize global scroll animations
    initScrollReveal();
});
