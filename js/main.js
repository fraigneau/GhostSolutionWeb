// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Use global configuration
    const config = window.config || {};
    console.log('Configuration loaded:', config);
    
    // Check if document is fully loaded
    console.log('DOM loaded, initializing elements...');
    
    // DOM Elements   
    const soundButton = document.getElementById('toggleSound');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    const navLinks = document.querySelectorAll('.nav-link');
    const serviceCards = document.querySelectorAll('.service-card');
    const discoverBtn = document.getElementById('discoverBtn');
    const contactForm = document.getElementById('contactForm');
    const header = document.querySelector('header');
    const navMenu = document.getElementById('navMenu');
    const workCard = document.querySelector('.work-card');
    const logo = document.querySelector('.logo');
    
    // Check critical elements
    console.log('DOM elements found:', {
        soundButton: !!soundButton,
        backgroundMusic: !!backgroundMusic,
        discoverBtn: !!discoverBtn,
        contactForm: !!contactForm,
        navMenu: !!navMenu,
        logo: !!logo
    });

    // Variables
    let soundEnabled = false;

    // Initialization
    try {
        checkSections();
        initSoundControl();
        initNavLinks();
        initLogo();
        initServiceCards();
        initDiscoverButton();
        initContactForm();
        initScrollAnimations();
        initMatrixBackground();
        initHeaderScroll();
        initAllSectionLinks();
        console.log('Initialization completed successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }

    // Function to initialize sound control
    function initSoundControl() {
        if (!backgroundMusic || !hoverSound || !clickSound || !soundButton) return;

        // Preload audio files
        backgroundMusic.load();
        hoverSound.load();
        clickSound.load();

        // Set initial volumes
        backgroundMusic.volume = 0.3;
        hoverSound.volume = 0.5;
        clickSound.volume = 0.5;

        // Add sound button event listener
        soundButton.addEventListener('click', function() {
            soundEnabled = !soundEnabled;
            
            if (soundEnabled) {
                // Try to play background music
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        soundButton.classList.add('sound-on');
                        soundButton.innerHTML = '<i class="fas fa-volume-up"></i>';
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        soundEnabled = false;
                        soundButton.classList.remove('sound-on');
                        soundButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
                        
                        // Show a message to the user
                        alert("Please interact with the page first to enable sound.");
                    });
                } else {
                    // Older browsers might not return a promise
                    soundButton.classList.add('sound-on');
                    soundButton.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            } else {
                backgroundMusic.pause();
                soundButton.classList.remove('sound-on');
                soundButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });

        // Add keyboard shortcut for sound toggle (M key)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'm' || e.key === 'M') {
                soundButton.click();
            }
        });
    }

    // Function to play a sound
    function playSound(sound) {
        if (!sound) return;
        
        // Create a clone to allow overlapping sounds
        if (sound === hoverSound || sound === clickSound) {
            const soundClone = sound.cloneNode();
            soundClone.volume = sound.volume;
            soundClone.play().catch(e => console.error("Error playing sound:", e));
        } else {
            // For background music, just reset and play
            sound.currentTime = 0;
            sound.play().catch(e => console.error("Error playing sound:", e));
        }
    }

    // Function to initialize navigation links
    function initNavLinks() {
        if (!navLinks.length) {
            console.error('Navigation links not found');
            return;
        }
        
        console.log('Initializing navigation links:', navLinks.length);
        
        // Log all navigation links for debugging
        navLinks.forEach((link, index) => {
            console.log(`Nav link ${index}:`, link.getAttribute('href'));
        });
        
        // Ajouter des gestionnaires d'événements pour les liens du footer
        document.querySelectorAll('.footer-links a').forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    console.log('Footer link clicked:', targetId);
                    
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        console.log('Scrolling to section:', targetId, 'at position:', targetSection.offsetTop);
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    } else {
                        console.error('Target section not found:', targetId);
                    }
                });
            }
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                console.log('Navigation clicked:', targetId);
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    console.log('Scrolling to section:', targetId, 'at position:', targetSection.offsetTop);
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                } else {
                    console.error('Target section not found:', targetId);
                    // Log all sections for debugging
                    document.querySelectorAll('section').forEach(section => {
                        console.log('Available section:', section.id);
                    });
                }
            });
        });
    }

    // Function to initialize service cards
    function initServiceCards() {
        if (!serviceCards.length) return;
        
        serviceCards.forEach(card => {
            // Hover animation
            card.addEventListener('mouseenter', function() {
                if (soundEnabled) {
                    playSound(hoverSound);
                }
            });
            
            // Ajouter des gestionnaires d'événements pour les liens de service
            const serviceLink = card.querySelector('.service-link');
            if (serviceLink) {
                serviceLink.addEventListener('click', function(e) {
                    if (this.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        
                        const targetId = this.getAttribute('href');
                        console.log('Service link clicked:', targetId);
                        
                        const targetSection = document.querySelector(targetId);
                        
                        if (targetSection) {
                            console.log('Scrolling to section:', targetId, 'at position:', targetSection.offsetTop);
                            window.scrollTo({
                                top: targetSection.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        } else {
                            console.error('Target section not found:', targetId);
                        }
                    }
                });
            }
        });
    }

    // Function to initialize discover button
    function initDiscoverButton() {
        if (!discoverBtn) return;
        
        discoverBtn.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            
            if (servicesSection) {
                window.scrollTo({
                    top: servicesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    /**
     * Initialize contact form with Discord webhook integration
     * Handles form submission and sends data to Discord
     */
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Validate form data
            if (!name || !email || !message) {
                console.error('Form validation failed');
                return;
            }
            
            // Prepare data for Discord webhook
            const webhookUrl = config.discordWebhookUrl;
            
            // Si l'URL du webhook est vide, afficher un message et ne pas envoyer
            if (!webhookUrl) {
                console.log('Webhook URL not configured. Form submission simulated.');
                showSuccess(this.querySelector('.submit-button'), this.querySelector('.submit-button').innerHTML);
                return;
            }
            
            const webhookData = {
                content: "New contact message received!",
                embeds: [{
                    title: "New Contact Message",
                    color: 3447003,
                    fields: [
                        {
                            name: "Name",
                            value: name,
                            inline: true
                        },
                        {
                            name: "Email",
                            value: email,
                            inline: true
                        },
                        {
                            name: "Service",
                            value: service,
                            inline: true
                        },
                        {
                            name: "Message",
                            value: message
                        }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };
            
            // Update UI for submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            submitButton.disabled = true;
            
            // Send data to Discord webhook
            sendToDiscord(webhookUrl, webhookData, submitButton, originalText);
        });
        
        /**
         * Send data to Discord webhook
         * @param {string} url - Discord webhook URL
         * @param {Object} data - Data to send
         * @param {HTMLElement} button - Submit button element
         * @param {string} originalText - Original button text
         */
        function sendToDiscord(url, data, button, originalText) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    showSuccess(button, originalText);
                } else {
                    showError(button, originalText);
                }
            })
            .catch(error => {
                showError(button, originalText);
            });
        }
        
        /**
         * Show success message and reset form
         * @param {HTMLElement} button - Submit button element
         * @param {string} originalText - Original button text
         */
        function showSuccess(button, originalText) {
            button.innerHTML = '<i class="fas fa-check"></i> SENT!';
            button.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                resetButton(button, originalText);
                contactForm.reset();
            }, 2000);
        }
        
        /**
         * Show error message
         * @param {HTMLElement} button - Submit button element
         * @param {string} originalText - Original button text
         */
        function showError(button, originalText) {
            button.innerHTML = '<i class="fas fa-times"></i> ERROR!';
            button.style.backgroundColor = 'var(--danger-color)';
            
            setTimeout(() => {
                resetButton(button, originalText);
            }, 2000);
        }
        
        /**
         * Reset button to original state
         * @param {HTMLElement} button - Submit button element
         * @param {string} originalText - Original button text
         */
        function resetButton(button, originalText) {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.backgroundColor = '';
        }
    }

    // Function to initialize scroll animations
    function initScrollAnimations() {
        // Animate elements on scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Service cards animation
        if (serviceCards.length) {
            const serviceCardsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        serviceCardsObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            serviceCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transitionDelay = `${index * 0.1}s`;
                serviceCardsObserver.observe(card);
            });
        }
        
        // Work card animation
        if (workCard) {
            const workCardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        workCardObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            workCard.style.opacity = '0';
            workCard.style.transform = 'translateY(30px)';
            workCardObserver.observe(workCard);
        }
    }

    // Function to initialize Matrix background
    function initMatrixBackground() {
        const matrixBg = document.getElementById('matrixCanvas');
        if (!matrixBg) return;
        
        const canvas = document.createElement('canvas');
        matrixBg.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = matrixBg.offsetWidth;
        canvas.height = matrixBg.offsetHeight;
        
        // Characters for Matrix effect
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        const columns = canvas.width / 20;
        const drops = [];
        
        // Initialize starting positions
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -canvas.height);
        }
        
        // Draw Matrix effect
        function drawMatrix() {
            ctx.fillStyle = 'rgba(15, 22, 36, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#4d84ff';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                const x = i * 20;
                const y = drops[i] * 20;
                
                // Gradient effect for characters
                const gradient = ctx.createLinearGradient(x, y - 15, x, y);
                gradient.addColorStop(0, '#4d84ff');
                gradient.addColorStop(1, '#00c8ff');
                ctx.fillStyle = gradient;
                
                ctx.fillText(text, x, y);
                
                // Reset drop when it reaches bottom or randomly
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move drop down
                drops[i]++;
            }
        }
        
        // Animate Matrix effect
        setInterval(drawMatrix, 50);
        
        // Resize canvas on window resize
        window.addEventListener('resize', function() {
            canvas.width = matrixBg.offsetWidth;
            canvas.height = matrixBg.offsetHeight;
        });
    }

    // Function to handle header scroll effect
    function initHeaderScroll() {
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Function to initialize logo
    function initLogo() {
        if (!logo) {
            console.error('Logo not found');
            return;
        }
        
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Function to initialize all section links
    function initAllSectionLinks() {
        // Sélectionner tous les liens qui pointent vers des sections
        const allSectionLinks = document.querySelectorAll('a[href^="#"]');
        console.log('Found section links:', allSectionLinks.length);
        
        allSectionLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Ne pas traiter les liens déjà gérés par d'autres fonctions
                if (this.classList.contains('nav-link') || 
                    this.classList.contains('service-link') || 
                    this.classList.contains('logo')) {
                    return;
                }
                
                console.log('Section link clicked:', targetId);
                
                if (targetId === '#') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    console.log('Scrolling to section:', targetId, 'at position:', targetSection.offsetTop);
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}); 