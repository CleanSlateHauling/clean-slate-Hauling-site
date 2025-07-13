/**
 * =================================================================================
 * Main JavaScript File for Clean Slate Hauling
 * Author: Gemini AI
 * Version: 2025 State-of-the-Art Edition
 *
 * Deploys advanced interaction patterns based on analysis of award-winning websites.
 * Features:
 * - GSAP-powered animations for professional quality and performance.
 * - ScrollTrigger for sophisticated "scrollytelling" reveal effects.
 * - Interactive custom cursor for a premium, engaging user experience.
 * - Physics-based microinteractions to add life and delight to the UI.
 * - Clean, modern, and efficient vanilla JavaScript code.
 * =================================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // First, register the GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    /**
     * ------------------------------------------
     * 1. INTERACTIVE CUSTOM CURSOR
     * ------------------------------------------
     * A hallmark of many "Vanguard of Design" sites. It enhances the sense of
     * interactivity and provides a unique branding touch.
     */
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Use GSAP for smooth, performant cursor following
    window.addEventListener('mousemove', e => {
        const { clientX, clientY } = e;
        gsap.to(cursorDot, { x: clientX, y: clientY, duration: 0.3, ease: 'power3' });
        gsap.to(cursorOutline, { x: clientX, y: clientY, duration: 0.7, ease: 'power3' });
    });

    // Animate cursor on link/button hover
    const linksAndButtons = document.querySelectorAll('a, button, .service-card, .benefit');
    linksAndButtons.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, { scale: 1.8, background: 'var(--primary-color)', opacity: 0.4, duration: 0.5, ease: 'power4' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, { scale: 1, background: 'transparent', opacity: 1, duration: 0.5, ease: 'power4' });
        });
    });

    // Add styles for the cursor dynamically
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = `
        .cursor-dot, .cursor-outline { pointer-events: none; position: fixed; top: -15px; left: -15px; border-radius: 50%; z-index: 9999; }
        .cursor-dot { width: 8px; height: 8px; background-color: var(--primary-color); }
        .cursor-outline { width: 30px; height: 30px; border: 2px solid var(--primary-color); }
        body { cursor: none; }
    `;
    document.head.appendChild(cursorStyle);


    /**
     * ------------------------------------------
     * 2. NAVIGATION & HEADER LOGIC
     * ------------------------------------------
     * Smooth, scroll-based effects for a modern, responsive header.
     */
    const nav = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // Scrolled Effect using GSAP's ScrollTrigger for performance
    ScrollTrigger.create({
        start: 'top -50px',
        onUpdate: self => {
            if (self.direction === 1) { // Scrolling down
                nav.classList.add('scrolled');
            } else { // Scrolling up
                if (window.scrollY < 50) {
                   nav.classList.remove('scrolled');
                }
            }
        }
    });

    // Hamburger Menu Toggle
    const toggleMenu = () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        hamburger.classList.toggle('is-active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /**
     * ------------------------------------------
     * 3. PROFESSIONAL "SCROLLYTELLING" REVEAL ANIMATIONS
     * ------------------------------------------
     * Uses GSAP & ScrollTrigger to create staggered, choreographed animations
     * as elements enter the viewport. This is far superior to simple CSS fades.
     */
    const animatedElements = document.querySelectorAll('.reveal-on-scroll');
    animatedElements.forEach(el => {
        gsap.fromTo(el,
            { autoAlpha: 0, y: 50 }, // Initial state (invisible and slightly down)
            {
                autoAlpha: 1, y: 0, // Final state (fully visible and at original position)
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%', // Starts animation when element is 85% from the top of viewport
                    toggleActions: 'play none none none', // Play animation once on enter
                    // markers: true, // Uncomment for debugging
                }
            }
        );
    });

    // Staggered animation for the 'steps' and 'services' sections
    gsap.from(".step, .service-card, .review-card", {
        scrollTrigger: {
            trigger: ".steps",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15 // This creates the beautiful cascading effect
    });


    /**
     * ------------------------------------------
     * 4. PHYSICS-BASED MICROINTERACTIONS
     * ------------------------------------------
     * Adds a delightful, physics-based "jiggle" effect to UI elements
     * on hover, making the site feel more alive and fun to use.
     */
    const benefits = document.querySelectorAll('.benefit');
    benefits.forEach(benefit => {
        const icon = benefit.querySelector('.benefit-icon');
        const tl = gsap.timeline({ paused: true });

        // Define the "jiggle" animation timeline
        tl.to(icon, { scale: 1.2, duration: 0.15, ease: 'power2.in' })
          .to(icon, { rotate: '+=15', x: '+=5', duration: 0.1 })
          .to(icon, { rotate: '-=15', x: '-=5', duration: 0.1 })
          .to(icon, { rotate: '+=10', x: '+=3', duration: 0.1 })
          .to(icon, { rotate: '-=10', x: '-=3', duration: 0.1 })
          .to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });

        benefit.addEventListener('mouseenter', () => {
            tl.restart(); // Play the animation from the beginning
        });
    });


    /**
     * ------------------------------------------
     * 5. HERO SECTION ENTRANCE ANIMATION
     * ------------------------------------------
     * Creates a cinematic, staggered entrance for the hero content on page load.
     */
    gsap.timeline({ delay: 0.2 })
        .from('.hero-content h1', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
        .from('.hero-content .subtitle', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.5') // Overlap with previous
        .from('.hero-button', { opacity: 0, scale: 0.8, duration: 0.7, ease: 'elastic.out(1, 0.75)' }, '-=0.4')
        .from('.trust-badge', { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' }, '-=0.5');

});
