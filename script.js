document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderContent();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    });
}

// Content Rendering
function renderContent() {
    if (typeof cvData === 'undefined') {
        console.error('Data file not loaded');
        return;
    }

    // Update Title and Meta
    document.title = `${cvData.personal.name} - Portfolio`;
    document.getElementById('nav-name').textContent = cvData.personal.name;
    document.getElementById('nav-title').textContent = cvData.personal.title;
    document.getElementById('footer-name').textContent = cvData.personal.name;
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // Render About
    const aboutContainer = document.getElementById('about-content');
    aboutContainer.innerHTML = `<p class="animate-in">${cvData.about}</p>`;

    // Render Contact Links
    const contactContainer = document.getElementById('contact-links');
    const contacts = [
        { name: 'Email', url: `mailto:${cvData.personal.email}` },
        { name: 'LinkedIn', url: cvData.personal.social.linkedin },
        { name: 'GitHub', url: cvData.personal.social.github },
        { name: 'Twitter', url: cvData.personal.social.twitter }
    ];

    contacts.forEach((contact, index) => {
        if (contact.url) {
            const link = document.createElement('a');
            link.href = contact.url;
            link.className = 'contact-link animate-in';
            link.style.animationDelay = `${index * 0.1}s`;
            link.textContent = contact.name;
            link.target = contact.name === 'Email' ? '_self' : '_blank';
            contactContainer.appendChild(link);
        }
    });

    // Render Section Helper
    const createTimelineItem = (item, delay) => `
        <div class="timeline-item animate-in" style="animation-delay: ${delay}s">
            <span class="timeline-year">${item.year}</span>
            <div class="timeline-header">
                <h3 class="timeline-title">${item.role || item.degree || item.title}</h3>
                ${item.certificate ? `<a href="${item.certificate}" class="certificate-link" target="_blank" title="View Certificate">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cert-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <span>Certificate</span>
                </a>` : ''}
            </div>
            <div class="timeline-subtitle">${item.company || item.institution || item.institute}</div>
            <p class="timeline-desc">${item.description}</p>
        </div>
    `;

    // Render Experience
    const experienceContainer = document.getElementById('experience-list');
    experienceContainer.innerHTML = cvData.experience.map((item, i) => createTimelineItem(item, i * 0.1)).join('');

    // Render Education
    const educationContainer = document.getElementById('education-list');
    educationContainer.innerHTML = cvData.education.map((item, i) => createTimelineItem(item, i * 0.1)).join('');

    // Render Certifications
    const certContainer = document.getElementById('certification-list');
    if (certContainer && cvData.certifications) {
        certContainer.innerHTML = cvData.certifications.map((item, i) => createTimelineItem(item, i * 0.1)).join('');
    }

    // Render Publications
    const pubsContainer = document.getElementById('publication-list');
    pubsContainer.innerHTML = cvData.publications.map((pub, i) => `
        <div class="pub-card animate-in" style="animation-delay: ${i * 0.1}s">
            <span class="pub-year">${pub.year}</span>
            <div class="pub-title">
                <a href="${pub.link}" target="_blank">${pub.title}</a>
            </div>
            <div class="pub-journal">${pub.journal}</div>
        </div>
        `).join('');


    // Render Gallery
    const galleryContainer = document.getElementById('gallery-content');
    if (galleryContainer && cvData.gallery) {
        galleryContainer.innerHTML = cvData.gallery.map((trip, tripIndex) => `
            <div class="trip-section animate-in" style="animation-delay: ${tripIndex * 0.1}s">
                <div class="trip-header">
                    <h3 class="trip-title">${trip.title}</h3>
                    <p class="trip-description">${trip.description}</p>
                    ${trip.report ? `<div style="margin-top: 0.5rem;"><a href="${trip.report}" class="report-button" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        View Field Report
                    </a></div>` : ''}
                </div>
                <div class="gallery-wrapper" id="gallery-wrapper-${tripIndex}">
                    <div class="gallery-track">
                        ${trip.images.map(img => `
                            <div class="gallery-item">
                                <img src="gallery/${trip.folder}/${img.file}" alt="${img.caption}" loading="lazy" onclick="openLightbox(this.src, '${img.caption}')">
                                <div class="gallery-caption">${img.caption}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Initialize GSAP Animations for each gallery
        setTimeout(initGalleryAnimation, 100); // Small delay to ensure DOM is ready
    }
}

function initGalleryAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.gallery-wrapper').forEach((wrapper) => {
        const track = wrapper.querySelector('.gallery-track');
        const originalItems = gsap.utils.toArray(track.children);

        // Clone items for loop seamlessness (add enough copies to fill screen width if needed, or just double)
        // For simplicity and effectiveness, we'll clone the entire set once
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });

        const allItems = gsap.utils.toArray(track.children);

        const itemWidth = allItems[0].offsetWidth + 24; // Width + gap (1.5rem = 24px)
        const totalWidth = itemWidth * allItems.length;

        // Setup Infinite Loop
        const wrapValue = gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2));
        // We actually want to move by half the total width (since we doubled it)

        // User's approach adapted:
        // Use a simple ticker based approach or the modifiers plugin

        let xPos = 0;

        // Using a simpler approach for the loop than the complex modifier one 
        // because modifiers can be tricky with dynamic widths.
        // Let's use the provided code logic

        const sliderWidth = track.scrollWidth;
        const halfWidth = sliderWidth / 2;

        // Set initial state
        gsap.set(allItems, {
            x: 0
        });

        const additionalX = { val: 0 };
        let additionalXAnim;
        let offset = 0;

        allItems.forEach((item, i) => {
            gsap.to(item, {
                x: `-=${halfWidth}`, // Move left by half the total width
                duration: 30, // Adjust speed here
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => {
                        offset += additionalX.val;
                        return (parseFloat(x) + offset) % halfWidth;
                    })
                }
            });
        });

        // Scroll acceleration
        ScrollTrigger.create({
            trigger: wrapper,
            start: "top 80%",
            end: "bottom 20%",
            onUpdate: function (self) {
                const velocity = self.getVelocity();
                if (velocity > 0) {
                    if (additionalXAnim) additionalXAnim.kill();
                    additionalX.val = -velocity / 2000;
                    additionalXAnim = gsap.to(additionalX, { val: 0 });
                }
                if (velocity < 0) {
                    if (additionalXAnim) additionalXAnim.kill();
                    // Reverse direction logic if desired, or just accelerate same way
                    additionalX.val = -velocity / 3000;
                    additionalXAnim = gsap.to(additionalX, { val: 0 });
                }
            }
        });
    });
}


// Lightbox functionality (optional but nice)
function openLightbox(src, caption) {
    // Implementation can be added later if requested, 
    // for now keeping it simple or just letting browser handle generic view.
    // Or better, just open in new tab?
    window.open(src, '_blank');
}
