/**
 * Hero Component Logic
 */
import portfolioConfig from '../../js/config.js';

export function initHero() {
    const profileImage = document.getElementById("profile-image");
    const profilePlaceholder = document.getElementById("profile-placeholder");
    const linkedinBtn = document.getElementById('hero-linkedin');
    const githubBtn = document.getElementById('hero-github');
    const heroCvBtn = document.getElementById('hero-cv-btn');

    // Update dynamic config links
    if (linkedinBtn && portfolioConfig.social.linkedin) {
        linkedinBtn.setAttribute('href', portfolioConfig.social.linkedin);
    }
    if (githubBtn && portfolioConfig.social.github) {
        githubBtn.setAttribute('href', portfolioConfig.social.github);
    }
    if (heroCvBtn && portfolioConfig.assets.cv) {
        heroCvBtn.setAttribute('href', portfolioConfig.assets.cv);
    }

    if (profileImage && profilePlaceholder) {
        // Image successfully loaded
        profileImage.addEventListener("load", () => {
            profileImage.style.display = "block";
            profilePlaceholder.style.display = "none";
        });

        // Image failed to load -> try fallback to profile.png, else show BS placeholder
        profileImage.addEventListener("error", () => {
            const currentSrc = profileImage.getAttribute("src");
            if (currentSrc !== "assets/profile.png") {
                profileImage.src = "assets/profile.png";
            } else {
                profileImage.style.display = "none";
                profilePlaceholder.style.display = "flex";
            }
        });
    }
}
