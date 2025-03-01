document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const toggleGlitchBtn = document.getElementById('toggleGlitch');
    const glitchSound = document.getElementById('glitchSound');
    const body = document.body;
    
    // Variables
    let soundEnabled = false; // Sera synchronisé avec le bouton de son principal
    let glitchActive = false;
    let glitchTimeout;
    
    // Vérifier si les éléments existent
    if (!toggleGlitchBtn) {
        console.error('Élément du bouton glitch non trouvé');
        return;
    }
    
    // Initialisation
    init();
    
    function init() {
        // Ajouter les écouteurs d'événements
        toggleGlitchBtn.addEventListener('click', toggleGlitch);
        
        // Synchroniser l'état du son avec le bouton principal
        const mainSoundButton = document.getElementById('toggleSound');
        if (mainSoundButton) {
            soundEnabled = mainSoundButton.classList.contains('sound-on');
            
            // Observer les changements sur le bouton de son principal
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        soundEnabled = mainSoundButton.classList.contains('sound-on');
                    }
                });
            });
            
            observer.observe(mainSoundButton, { attributes: true });
        }
        
        // Préparer les éléments de texte pour l'effet de glitch
        prepareGlitchText();
    }
    
    // Fonction pour activer/désactiver l'effet de glitch
    function toggleGlitch() {
        if (glitchActive) {
            disableGlitch();
        } else {
            enableGlitch();
        }
    }
    
    // Fonction pour activer l'effet de glitch
    function enableGlitch() {
        glitchActive = true;
        toggleGlitchBtn.classList.add('active');
        body.classList.add('glitch-active');
        
        // Jouer le son de glitch
        if (soundEnabled && glitchSound) {
            glitchSound.currentTime = 0;
            glitchSound.play().catch(err => console.error('Erreur lors de la lecture du son:', err));
        }
        
        // Ajouter des effets de glitch aléatoires
        startRandomGlitches();
    }
    
    // Fonction pour désactiver l'effet de glitch
    function disableGlitch() {
        glitchActive = false;
        toggleGlitchBtn.classList.remove('active');
        body.classList.remove('glitch-active');
        
        // Arrêter les effets de glitch aléatoires
        clearTimeout(glitchTimeout);
    }
    
    // Fonction pour préparer les éléments de texte pour l'effet de glitch
    function prepareGlitchText() {
        // Sélectionner tous les titres et textes importants
        const glitchElements = [
            ...document.querySelectorAll('h1, h2, h3, .logo, .service-title, .work-title')
        ];
        
        // Ajouter la classe et l'attribut data-text
        glitchElements.forEach(element => {
            if (!element.classList.contains('glitch-text')) {
                element.classList.add('glitch-text');
                element.setAttribute('data-text', element.textContent);
            }
        });
    }
    
    // Fonction pour démarrer des effets de glitch aléatoires
    function startRandomGlitches() {
        if (!glitchActive) return;
        
        // Créer un effet de glitch aléatoire
        const randomGlitchEffect = Math.floor(Math.random() * 3);
        
        switch (randomGlitchEffect) {
            case 0:
                // Effet de décalage de couleur temporaire
                body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
                setTimeout(() => {
                    body.style.filter = '';
                }, 200);
                break;
            case 1:
                // Effet de tremblement de l'écran
                body.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                setTimeout(() => {
                    body.style.transform = '';
                }, 100);
                break;
            case 2:
                // Effet de distorsion temporaire
                body.style.filter = `blur(${Math.random() * 5}px) contrast(${1 + Math.random()}`;
                setTimeout(() => {
                    body.style.filter = '';
                }, 150);
                break;
        }
        
        // Planifier le prochain effet aléatoire
        const nextGlitchTime = 2000 + Math.random() * 5000; // Entre 2 et 7 secondes
        glitchTimeout = setTimeout(startRandomGlitches, nextGlitchTime);
    }
}); 