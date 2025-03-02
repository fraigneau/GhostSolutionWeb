document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const toggleGlitchBtn = document.getElementById('toggleGlitch');
    const body = document.body;
    
    // Variables
    let glitchActive = false; // For manual control
    let autoGlitchActive = false; // For automatic effect
    let glitchTimeout;
    let scrollThreshold = 100; // Scroll threshold to start disabling the effect
    let scrollMax = 600; // Maximum scroll to completely disable the effect
    let lastScrollPosition = 0; // Track last scroll position
    let noScrollTimer = true; // Timer for auto-disabling glitch after no scroll
    let autoDisableDelay = 5000; // 5 seconds in milliseconds
    
    // Check if current page is a legal page
    const isLegalPage = window.location.pathname.includes('terms-of-service.html') || 
                        window.location.pathname.includes('privacy-policy.html') || 
                        window.location.pathname.includes('cookie-policy.html');
    
    // Check if elements exist
    if (!toggleGlitchBtn) {
        console.error('Glitch button element not found');
        return;
    }
    
    // Initialization
    init();
    
    function init() {
        // Add event listeners
        toggleGlitchBtn.addEventListener('click', toggleGlitch);
        
        // Prepare text elements for glitch effect
        prepareGlitchText();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Activate glitch effect automatically after a short delay, but only if not on a legal page
        if (!isLegalPage) {
            setTimeout(() => {
                enableAutoGlitch();
            }, 1000);
        }
    }
    
    // Function to handle scrolling and adjust glitch effect
    function handleScroll() {
        if (!autoGlitchActive || isLegalPage) return;
        
        const scrollPosition = window.scrollY;
        
        // Check if there was actual scrolling
        if (scrollPosition !== lastScrollPosition) {
            // Reset the auto-disable timer since user is scrolling
            if (noScrollTimer) {
                clearTimeout(noScrollTimer);
            }
            
            // Start a new timer for auto-disabling after no scroll
            noScrollTimer = setTimeout(() => {
                if (autoGlitchActive) {
                    console.log('No scroll detected for 10 seconds, disabling glitch effect');
                    disableAutoGlitch();
                }
            }, autoDisableDelay);
            
            // Update last scroll position
            lastScrollPosition = scrollPosition;
        }
        
        // If user has scrolled beyond threshold, start reducing the effect
        if (scrollPosition > scrollThreshold) {
            // Calculate scroll progress between threshold and maximum
            const scrollProgress = Math.min(1, (scrollPosition - scrollThreshold) / (scrollMax - scrollThreshold));
            
            // Reduce glitch effect intensity based on scrolling
            adjustGlitchIntensity(1 - scrollProgress);
            
            // If scrolling exceeds maximum, completely disable the effect
            if (scrollPosition >= scrollMax) {
                disableAutoGlitch();
            }
        }
    }
    
    // Function to adjust glitch effect intensity
    function adjustGlitchIntensity(intensity) {
        // Adjust glitch effects opacity via CSS
        document.documentElement.style.setProperty('--glitch-opacity', intensity.toFixed(2));
        
        // If intensity is very low, stop random effects
        if (intensity < 0.1) {
            clearTimeout(glitchTimeout);
            return;
        }
        
        // Otherwise, adjust frequency of random effects
        if (glitchTimeout) {
            clearTimeout(glitchTimeout);
            
            // Schedule next effect with adjusted frequency
            const nextGlitchTime = 2000 + Math.random() * 5000 * (1 / intensity);
            glitchTimeout = setTimeout(() => startRandomGlitches(intensity), nextGlitchTime);
        }
    }
    
    // Function to enable automatic glitch effect
    function enableAutoGlitch() {
        // Don't enable on legal pages
        if (isLegalPage) return;
        
        autoGlitchActive = true;
        body.classList.add('glitch-active');
        
        // Set initial intensity to 100%
        document.documentElement.style.setProperty('--glitch-opacity', '1');
        
        // Add random glitch effects
        startRandomGlitches(1);
        
        // Start the auto-disable timer
        if (noScrollTimer) {
            clearTimeout(noScrollTimer);
        }
        
        noScrollTimer = setTimeout(() => {
            if (autoGlitchActive) {
                console.log('No scroll detected for 10 seconds, disabling glitch effect');
                disableAutoGlitch();
            }
        }, autoDisableDelay);
    }
    
    // Function to disable automatic glitch effect
    function disableAutoGlitch() {
        autoGlitchActive = false;
        
        // Don't remove class if manual effect is active
        if (!glitchActive) {
            body.classList.remove('glitch-active');
        }
        
        // Stop random glitch effects
        clearTimeout(glitchTimeout);
        
        // Clear the no-scroll timer
        if (noScrollTimer) {
            clearTimeout(noScrollTimer);
            noScrollTimer = null;
        }
    }
    
    // Function to toggle manual glitch effect
    function toggleGlitch() {
        // Don't allow toggling on legal pages
        if (isLegalPage) return;
        
        if (glitchActive) {
            disableGlitch();
        } else {
            enableGlitch();
        }
    }
    
    // Function to enable manual glitch effect
    function enableGlitch() {
        // Don't enable on legal pages
        if (isLegalPage) return;
        
        glitchActive = true;
        autoGlitchActive = false; // Disable automatic effect
        toggleGlitchBtn.classList.add('active');
        body.classList.add('glitch-active');
        
        // Reset intensity to 100%
        document.documentElement.style.setProperty('--glitch-opacity', '1');
        
        // Add random glitch effects
        startRandomGlitches(1);
        
        // Clear any existing auto-disable timer
        if (noScrollTimer) {
            clearTimeout(noScrollTimer);
            noScrollTimer = null;
        }
    }
    
    // Function to disable manual glitch effect
    function disableGlitch() {
        glitchActive = false;
        toggleGlitchBtn.classList.remove('active');
        
        // Only remove class if automatic effect is also inactive
        if (!autoGlitchActive) {
            body.classList.remove('glitch-active');
        }
        
        // Stop random glitch effects if automatic effect is inactive
        if (!autoGlitchActive) {
            clearTimeout(glitchTimeout);
        }
    }
    
    // Function to prepare text elements for glitch effect
    function prepareGlitchText() {
        // Don't prepare text on legal pages
        if (isLegalPage) return;
        
        // Select all important headings and text
        const glitchElements = [
            ...document.querySelectorAll('h1, h2, h3, .logo, .service-title, .work-title')
        ];
        
        // Add class and data-text attribute
        glitchElements.forEach(element => {
            if (!element.classList.contains('glitch-text')) {
                element.classList.add('glitch-text');
                element.setAttribute('data-text', element.textContent);
            }
        });
    }
    
    // Function to start random glitch effects with adjustable intensity
    function startRandomGlitches(intensity = 1) {
        if ((!autoGlitchActive && !glitchActive) || isLegalPage) return;
        
        // Create a random glitch effect
        const randomGlitchEffect = Math.floor(Math.random() * 3);
        
        // Adjust effects intensity based on parameter
        const adjustedIntensity = intensity * 0.8 + 0.2; // Keep a minimum of 20% intensity
        
        switch (randomGlitchEffect) {
            case 0:
                // Temporary color shift effect
                body.style.filter = `hue-rotate(${Math.random() * 360 * adjustedIntensity}deg)`;
                setTimeout(() => {
                    body.style.filter = '';
                }, 200 * adjustedIntensity);
                break;
            case 1:
                // Screen shake effect
                body.style.transform = `translate(${(Math.random() * 10 - 5) * adjustedIntensity}px, ${(Math.random() * 10 - 5) * adjustedIntensity}px)`;
                setTimeout(() => {
                    body.style.transform = '';
                }, 100 * adjustedIntensity);
                break;
            case 2:
                // Temporary distortion effect
                body.style.filter = `blur(${Math.random() * 5 * adjustedIntensity}px) contrast(${1 + Math.random() * adjustedIntensity})`;
                setTimeout(() => {
                    body.style.filter = '';
                }, 150 * adjustedIntensity);
                break;
        }
        
        // Schedule next random effect with frequency adjusted by intensity
        const nextGlitchTime = (2000 + Math.random() * 5000) * (1 / adjustedIntensity);
        glitchTimeout = setTimeout(() => startRandomGlitches(intensity), nextGlitchTime);
    }
    
    // Expose toggleGlitch function globally
    window.toggleGlitch = toggleGlitch;
}); 