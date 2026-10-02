/**
 * Projects Component Logic
 */
import portfolioConfig from '../../js/config.js';

const projectData = {
    honeysense: {
        category: "IOT SECURITY",
        title: "HoneySense: Intelligent Honeypot for IoT Security",
        description: "HoneySense is a major cybersecurity project exploring IoT security through a honeypot architecture for malicious traffic detection, IoT attack analysis, security monitoring, and network security. It connects sensors, low-power microcontrollers (ESP8266/ESP32), and edge gateways (Raspberry Pi) with custom protocol emulation and machine learning-based classification algorithms.",
        technologies: ["Raspberry Pi", "ESP8266/ESP32", "Protocol Emulation", "Machine Learning", "Traffic Detection", "Web Dashboard", "Network Security"]
    },
    rsa: {
        category: "CRYPTOGRAPHY",
        title: "Enhanced RSA Encryption",
        description: "Designed a customized RSA-based cryptographic cipher featuring ASCII encoding, bitwise operations (XOR, AND, OR), modulo arithmetic, and password embedding mechanisms. Includes algorithm design analysis, flowchart specifications, theoretical evaluation, and GUI demonstration.",
        technologies: ["RSA Cryptography", "ASCII Encoding", "AES", "Python", "Bitwise Operations", "Algorithm Design", "Security Analysis"]
    },
    plant: {
        category: "IOT & EMBEDDED SYSTEMS",
        title: "Smart Plant Watering and Monitoring System",
        description: "Developed an IoT-based plant monitoring and automated irrigation system utilizing an ESP8266 microcontroller, soil moisture sensors, DHT11 environmental sensor, relay module, and I2C LCD screen. Configured with real-time hardware telemetry and Blynk integration.",
        technologies: ["NodeMCU ESP8266", "Arduino IDE", "C++", "Soil Moisture Sensor", "DHT11", "Relay Control", "I2C LCD", "Hardware Prototyping"]
    },
    land: {
        category: "PYTHON DEVELOPMENT",
        title: "Land Rental System",
        description: "Engineered a Python desktop application for managing land rentals, customer returns, invoice generation using structured text files, and real-time land availability status updates. Built with modular code architecture, custom exception handling, and robust input validation.",
        technologies: ["Python", "File I/O", "Data Structures", "Exception Handling", "Input Validation", "Modular Programming"]
    },
    printer: {
        category: "FRONTEND WEB DEVELOPMENT",
        title: "Printer Buying E-Commerce Website",
        description: "Collaborated on a responsive, accessible frontend web platform for browsing and purchasing commercial printers. Implemented product catalog views, dynamic item filtering, client-side form validation, media query layout adaptation, and wireframe prototypes.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Flexbox", "CSS Grid", "Form Validation", "Responsive Design"]
    }
};

export function initProjects() {
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalGithubLink = document.getElementById('modal-github-link');
    const projectModalBtns = document.querySelectorAll('.project-modal-btn');
    const githubLinks = document.querySelectorAll('.project-github-link');

    // Update GitHub URLs from config
    githubLinks.forEach(link => {
        if (portfolioConfig.social.github) {
            link.setAttribute('href', portfolioConfig.social.github);
        }
    });

    if (!modal) return;

    // Open Modal
    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        modalBadge.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;
        
        // Render tech tags
        modalTags.innerHTML = '';
        data.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tag-pill';
            span.textContent = tech;
            modalTags.appendChild(span);
        });

        if (modalGithubLink && portfolioConfig.social.github) {
            modalGithubLink.setAttribute('href', portfolioConfig.social.github);
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Attach Click Events to "View Project" buttons
    projectModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Close button click
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Overlay backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
