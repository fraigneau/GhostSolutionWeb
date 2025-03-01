// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing custom cursor...");
    
    // DOM Elements
    let cursorFollower = document.querySelector('.cursor-follower');
    console.log("Cursor element found:", cursorFollower);
    
    const soundButton = document.getElementById('toggleSound');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    const navLinks = document.querySelectorAll('.nav-link');
    const serviceCards = document.querySelectorAll('.service-card');
    const discoverBtn = document.getElementById('discoverBtn');
    const contactForm = document.getElementById('contactForm');
    const header = document.querySelector('header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('nav ul');
    const workCard = document.querySelector('.work-card');

    // Variables
    let soundEnabled = false;
    let isMobileMenuOpen = false;


    // Initialization
    initCursorFollower();
    initSoundControl();
    initNavLinks();
    initServiceCards();
    initDiscoverButton();
    initContactForm();
    initScrollAnimations();
    initMatrixBackground();
    initMobileMenu();
    initHeaderScroll();

    // Function to initialize custom cursor (desktop only)
    function initCursorFollower() {
        // Check if cursor follower element exists
        if (!cursorFollower) {
            console.error('Cursor follower element not found');
            return;
        }
        
        // Only enable custom cursor on desktop
        if (window.innerWidth > 768) {
            // Update cursor position on mousemove
            document.addEventListener('mousemove', function(e) {
                // Update cursor position immediately for better responsiveness
                requestAnimationFrame(function() {
                    cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                });
            });

            // Click effect
            document.addEventListener('mousedown', function(e) {
                cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(0.7)`;
                
                if (soundEnabled) {
                    playSound(clickSound);
                }
            });
            
            document.addEventListener('mouseup', function(e) {
                cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
            });

            // Hover effect on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .service-card, .social-link, [role="button"], .work-card');
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', function(e) {
                    cursorFollower.style.backgroundColor = 'rgba(77, 132, 255, 0.8)';
                    cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
                    cursorFollower.style.mixBlendMode = 'normal';
                    
                    if (soundEnabled) {
                        playSound(hoverSound);
                    }
                });
                
                element.addEventListener('mouseleave', function(e) {
                    cursorFollower.style.backgroundColor = 'rgba(0, 200, 255, 0.8)';
                    cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
                    cursorFollower.style.mixBlendMode = 'difference';
                });
            });
        } else {
            // Disable custom cursor on mobile
            cursorFollower.style.display = 'none';
            document.body.style.cursor = 'auto';
            document.body.classList.remove('custom-cursor-active');
            
            // Remove cursor style sheet if it exists
            const cursorStyle = document.getElementById('cursor-style');
            if (cursorStyle) {
                cursorStyle.remove();
            }
        }
    }

    // Function to initialize sound control
    function initSoundControl() {
        // Check if audio elements exist
        if (!backgroundMusic || !hoverSound || !clickSound) {
            console.error('One or more audio elements not found');
            return;
        }

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
                        // Playback started successfully
                        console.log("Background music started successfully");
                        soundButton.classList.add('sound-on');
                        soundButton.innerHTML = '<i class="fas fa-volume-up"></i>';
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        console.error("Audio playback was prevented:", error);
                        // Reset sound state
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
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // Function to initialize mobile menu
    function initMobileMenu() {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            isMobileMenuOpen = !isMobileMenuOpen;
            
            // Change icon based on menu state
            if (isMobileMenuOpen) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Function to handle header scroll effect
    function initHeaderScroll() {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Function to initialize service cards
    function initServiceCards() {
        serviceCards.forEach(card => {
            // Hover animation
            card.addEventListener('mouseenter', function() {
                if (soundEnabled) {
                    playSound(hoverSound);
                }
            });
        });
    }

    // Function to initialize discover button
    function initDiscoverButton() {
        discoverBtn.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            
            window.scrollTo({
                top: servicesSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }

    // Function to initialize contact form
    function initContactForm() {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> SENT!';
                submitButton.style.backgroundColor = 'var(--success-color)';
                
                // Reset form
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
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
        const canvas = document.createElement('canvas');
        const matrixBg = document.getElementById('matrixCanvas');
        
        if (!matrixBg) return;
        
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

    // Handle window resize
    window.addEventListener('resize', function() {
        // Toggle custom cursor based on screen size
        if (window.innerWidth <= 768) {
            if (cursorFollower) {
                cursorFollower.style.display = 'none';
                document.body.style.cursor = 'auto';
                document.body.classList.remove('custom-cursor-active');
                
                // Remove cursor style sheet if it exists
                const cursorStyle = document.getElementById('cursor-style');
                if (cursorStyle) {
                    cursorStyle.remove();
                }
            }
        } else {
            if (cursorFollower) {
                console.log("Resizing to desktop, reactivating custom cursor");
                
                // Recreate cursor style sheet
                let cursorStyle = document.getElementById('cursor-style');
                if (!cursorStyle) {
                    cursorStyle = document.createElement('style');
                    cursorStyle.id = 'cursor-style';
                    cursorStyle.textContent = `
                        body, a, button, input, textarea, select, label, .service-card, .social-link, [role="button"], .work-card {
                            cursor: none !important;
                        }
                        .cursor-follower {
                            display: block !important;
                        }
                    `;
                    document.head.appendChild(cursorStyle);
                    console.log("Cursor style sheet added after resize");
                }
                
                // Activate custom cursor
                cursorFollower.style.display = 'block';
                document.body.classList.add('custom-cursor-active');
            }
        }
        
        // Close mobile menu on resize
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}); 