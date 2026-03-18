/* ========================================
   ARIEL ORTEGA - PORTFOLIO SCRIPTS
   Language Toggle, Animations & Interactions
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ==================
    // Typing Effect
    // ==================
    const typingTexts = {
        es: ['Data Scientist', 'Científico de Datos', 'Analista de Datos'],
        en: ['Data Scientist', 'Data Analyst', 'ML Engineer']
    };
    
    let currentLang = 'es';
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing');
    
    function type() {
        const texts = typingTexts[currentLang];
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
    
    // ==================
    // Particle Effect
    // ==================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 20) + 's';
        particlesContainer.appendChild(particle);
    }
    
    // ==================
    // Language Toggle
    // ==================
    const langBtnEs = document.getElementById('lang-es');
    const langBtnEn = document.getElementById('lang-en');
    const translatableElements = document.querySelectorAll('[data-es][data-en]');
    
    function setLanguage(lang) {
        currentLang = lang;
        
        // Update buttons
        langBtnEs.classList.toggle('active', lang === 'es');
        langBtnEn.classList.toggle('active', lang === 'en');
        
        // Update all translatable elements
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                el.textContent = text;
            }
        });
        
        // Update CV download buttons
        document.querySelectorAll('.cv-download').forEach(btn => {
            btn.style.display = btn.getAttribute('data-lang') === lang ? 'inline-flex' : 'none';
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Reset typing effect
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        
        // Store preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    langBtnEs.addEventListener('click', () => setLanguage('es'));
    langBtnEn.addEventListener('click', () => setLanguage('en'));
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        setLanguage(savedLang);
    }
    
    // ==================
    // Navigation
    // ==================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ==================
    // Smooth Scroll
    // ==================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================
    // Scroll Reveal Animation
    // ==================
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .contact-card, .about-content');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('reveal', 'active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // ==================
    // Skill Bar Animation
    // ==================
    const skillBars = document.querySelectorAll('.skill-bar');
    let skillsAnimated = false;
    
    const animateSkillBars = () => {
        if (skillsAnimated) return;
        
        const skillsSection = document.getElementById('skills');
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 200) {
            skillBars.forEach(bar => {
                bar.style.width = bar.style.getPropertyValue('--level');
            });
            skillsAnimated = true;
        }
    };
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Initial check
    
    // ==================
    // Active Nav Link
    // ==================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavLink = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavLink);
});
