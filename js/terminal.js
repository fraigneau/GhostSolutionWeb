document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const toggleTerminalBtn = document.getElementById('toggleTerminal');
    const closeTerminalBtn = document.getElementById('closeTerminal');
    const hackerTerminal = document.getElementById('hackerTerminal');
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalSound = document.getElementById('terminalSound');
    const terminalErrorSound = document.getElementById('terminalErrorSound');
    const terminalSuccessSound = document.getElementById('terminalSuccessSound');
    
    // Variables
    let soundEnabled = false; // Sera synchronisé avec le bouton de son principal
    let commandHistory = [];
    let historyIndex = -1;
    let terminalActive = false;
    
    // Vérifier si les éléments existent
    if (!toggleTerminalBtn || !hackerTerminal || !terminalInput || !terminalOutput) {
        console.error('Éléments du terminal non trouvés');
        return;
    }
    
    // Initialisation
    init();
    
    function init() {
        // Ajouter les écouteurs d'événements
        toggleTerminalBtn.addEventListener('click', toggleTerminal);
        closeTerminalBtn.addEventListener('click', closeTerminal);
        terminalInput.addEventListener('keydown', handleTerminalInput);
        
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
    }
    
    // Fonction pour activer/désactiver le terminal
    function toggleTerminal() {
        if (terminalActive) {
            closeTerminal();
        } else {
            openTerminal();
        }
    }
    
    // Fonction pour ouvrir le terminal
    function openTerminal() {
        hackerTerminal.classList.add('active');
        toggleTerminalBtn.classList.add('active');
        terminalActive = true;
        terminalInput.focus();
        
        // Afficher le message de bienvenue
        if (terminalOutput.children.length === 0) {
            displayWelcomeMessage();
        }
    }
    
    // Fonction pour fermer le terminal
    function closeTerminal() {
        hackerTerminal.classList.remove('active');
        toggleTerminalBtn.classList.remove('active');
        terminalActive = false;
    }
    
    // Fonction pour gérer les entrées du terminal
    function handleTerminalInput(e) {
        // Jouer le son de frappe
        if (soundEnabled && terminalSound) {
            const soundClone = terminalSound.cloneNode();
            soundClone.volume = 0.3;
            soundClone.play().catch(err => console.error('Erreur lors de la lecture du son:', err));
        }
        
        // Gérer les touches spéciales
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = terminalInput.value.trim();
            
            if (command) {
                // Ajouter la commande à l'historique
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                
                // Afficher la commande dans le terminal
                const commandElement = document.createElement('p');
                commandElement.classList.add('command');
                commandElement.textContent = command;
                terminalOutput.appendChild(commandElement);
                
                // Exécuter la commande
                executeCommand(command);
                
                // Effacer l'entrée
                terminalInput.value = '';
                
                // Faire défiler vers le bas
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            autocompleteCommand();
        }
    }
    
    // Fonction pour exécuter une commande
    function executeCommand(command) {
        const cmd = command.toLowerCase();
        const args = cmd.split(' ').filter(arg => arg.trim() !== '');
        const mainCommand = args[0];
        
        switch (mainCommand) {
            case 'help':
                displayHelp();
                break;
            case 'clear':
                clearTerminal();
                break;
            case 'about':
                displayAbout();
                break;
            case 'services':
                displayServices();
                break;
            case 'contact':
                displayContact();
                break;
            case 'hack':
                simulateHack(args[1]);
                break;
            case 'matrix':
                displayMatrix();
                break;
            case 'scan':
                simulateScan(args[1]);
                break;
            case 'ls':
            case 'dir':
                listDirectory();
                break;
            case 'cat':
                if (args.length > 1) {
                    catFile(args[1]);
                } else {
                    displayError('Usage: cat <filename>');
                }
                break;
            case 'whoami':
                displayWhoami();
                break;
            case 'exit':
                closeTerminal();
                break;
            default:
                displayError(`Commande non reconnue: ${mainCommand}. Tapez 'help' pour voir les commandes disponibles.`);
                playErrorSound();
        }
    }
    
    // Fonction pour l'autocomplétion des commandes
    function autocompleteCommand() {
        const input = terminalInput.value.toLowerCase();
        const commands = ['help', 'clear', 'about', 'services', 'contact', 'hack', 'matrix', 'scan', 'ls', 'dir', 'cat', 'whoami', 'exit'];
        
        const matches = commands.filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            displayResult(matches.join('  '));
        }
    }
    
    // Fonctions d'affichage
    function displayWelcomeMessage() {
        const asciiArt = `
  ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗███████╗ ██████╗ ██╗     ██╗   ██╗████████╗██╗ ██████╗ ███╗   ██╗
 ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔═══██╗██║     ██║   ██║╚══██╔══╝██║██╔═══██╗████╗  ██║
 ██║  ███╗███████║██║   ██║███████╗   ██║   ███████╗██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██╔██╗ ██║
 ██║   ██║██╔══██║██║   ██║╚════██║   ██║   ╚════██║██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██║╚██╗██║
 ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║   ███████║╚██████╔╝███████╗╚██████╔╝   ██║   ██║╚██████╔╝██║ ╚████║
  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝    ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
        `;
        
        const asciiElement = document.createElement('pre');
        asciiElement.classList.add('ascii-art');
        asciiElement.textContent = asciiArt;
        terminalOutput.appendChild(asciiElement);
        
        displayInfo('Bienvenue dans le terminal GhostSolution v1.0');
        displayInfo('Tapez "help" pour voir les commandes disponibles.');
        
        // Jouer le son de succès
        playSuccessSound();
    }
    
    function displayHelp() {
        const helpText = [
            { command: 'help', description: 'Affiche cette aide' },
            { command: 'clear', description: 'Efface le terminal' },
            { command: 'about', description: 'À propos de GhostSolution' },
            { command: 'services', description: 'Affiche nos services' },
            { command: 'contact', description: 'Affiche les informations de contact' },
            { command: 'hack <cible>', description: 'Simule un hack (essayez avec "website", "database", "network")' },
            { command: 'matrix', description: 'Affiche une animation Matrix' },
            { command: 'scan <cible>', description: 'Simule un scan de sécurité' },
            { command: 'ls / dir', description: 'Liste les fichiers' },
            { command: 'cat <fichier>', description: 'Affiche le contenu d\'un fichier' },
            { command: 'whoami', description: 'Affiche l\'utilisateur actuel' },
            { command: 'exit', description: 'Ferme le terminal' }
        ];
        
        const helpElement = document.createElement('div');
        helpElement.classList.add('result');
        
        const helpTitle = document.createElement('p');
        helpTitle.innerHTML = '<span class="info">Commandes disponibles:</span>';
        helpElement.appendChild(helpTitle);
        
        const commandTable = document.createElement('table');
        commandTable.style.width = '100%';
        commandTable.style.borderCollapse = 'collapse';
        commandTable.style.marginTop = '10px';
        
        helpText.forEach(item => {
            const row = document.createElement('tr');
            
            const cmdCell = document.createElement('td');
            cmdCell.style.padding = '5px 10px 5px 0';
            cmdCell.style.color = 'var(--accent-color)';
            cmdCell.style.fontWeight = 'bold';
            cmdCell.style.whiteSpace = 'nowrap';
            cmdCell.textContent = item.command;
            
            const descCell = document.createElement('td');
            descCell.style.padding = '5px 0';
            descCell.textContent = item.description;
            
            row.appendChild(cmdCell);
            row.appendChild(descCell);
            commandTable.appendChild(row);
        });
        
        helpElement.appendChild(commandTable);
        terminalOutput.appendChild(helpElement);
        
        playSuccessSound();
    }
    
    function clearTerminal() {
        terminalOutput.innerHTML = '';
        playSuccessSound();
    }
    
    function displayAbout() {
        const aboutElement = document.createElement('div');
        aboutElement.classList.add('result');
        
        aboutElement.innerHTML = `
            <p><span class="info">À propos de GhostSolution:</span></p>
            <p>GhostSolution est une entreprise spécialisée en cybersécurité, offrant des services d'audit de sécurité, de forensique numérique et de rétro-ingénierie.</p>
            <p>Notre équipe d'experts travaille pour protéger vos données sensibles et renforcer votre infrastructure contre les menaces modernes.</p>
            <p>Fondée en 2023, notre mission est de rendre le monde numérique plus sûr pour tous.</p>
        `;
        
        terminalOutput.appendChild(aboutElement);
        playSuccessSound();
    }
    
    function displayServices() {
        const servicesElement = document.createElement('div');
        servicesElement.classList.add('result');
        
        servicesElement.innerHTML = `
            <p><span class="info">Nos services:</span></p>
            <p><span class="success">1. Audit de sécurité avancé</span> - Tests d'intrusion et évaluation des vulnérabilités</p>
            <p><span class="success">2. Forensique numérique</span> - Investigation numérique et analyse d'incidents</p>
            <p><span class="success">3. Rétro-ingénierie</span> - Analyse de logiciels malveillants et recherche de vulnérabilités</p>
        `;
        
        terminalOutput.appendChild(servicesElement);
        playSuccessSound();
    }
    
    function displayContact() {
        const contactElement = document.createElement('div');
        contactElement.classList.add('result');
        
        contactElement.innerHTML = `
            <p><span class="info">Contact:</span></p>
            <p>Email: <span class="success">contact@ghostsolution.com</span></p>
            <p>Téléphone: <span class="success">+33 1 23 45 67 89</span></p>
            <p>Adresse: <span class="success">42 Rue de la Cybersécurité, 75001 Paris, France</span></p>
        `;
        
        terminalOutput.appendChild(contactElement);
        playSuccessSound();
    }
    
    function simulateHack(target) {
        if (!target) {
            displayError('Cible non spécifiée. Usage: hack <cible>');
            playErrorSound();
            return;
        }
        
        const validTargets = ['website', 'database', 'network', 'system'];
        
        if (!validTargets.includes(target)) {
            displayError(`Cible invalide: ${target}. Cibles valides: ${validTargets.join(', ')}`);
            playErrorSound();
            return;
        }
        
        // Simuler un hack avec une animation de texte
        const hackElement = document.createElement('div');
        hackElement.classList.add('result');
        
        const steps = [
            `Initialisation du hack sur ${target}...`,
            `Analyse des vulnérabilités...`,
            `Exploitation des failles de sécurité...`,
            `Contournement des pare-feu...`,
            `Élévation des privilèges...`,
            `Extraction des données...`,
            `Effacement des traces...`
        ];
        
        terminalOutput.appendChild(hackElement);
        
        // Afficher les étapes une par une
        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                const stepElement = document.createElement('p');
                stepElement.innerHTML = `<span class="info">[${Math.floor(Math.random() * 100)}%]</span> ${steps[i]}`;
                hackElement.appendChild(stepElement);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                i++;
            } else {
                clearInterval(interval);
                
                // Afficher le résultat final
                const resultElement = document.createElement('p');
                resultElement.innerHTML = `<span class="success">[100%] Hack réussi sur ${target}!</span>`;
                hackElement.appendChild(resultElement);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
                playSuccessSound();
            }
        }, 500);
    }
    
    function displayMatrix() {
        const matrixElement = document.createElement('div');
        matrixElement.classList.add('result');
        
        // Générer une matrice aléatoire de caractères
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        let matrix = '';
        
        for (let i = 0; i < 10; i++) {
            let line = '';
            for (let j = 0; j < 50; j++) {
                line += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            matrix += line + '\n';
        }
        
        const matrixArt = document.createElement('pre');
        matrixArt.classList.add('ascii-art');
        matrixArt.textContent = matrix;
        matrixElement.appendChild(matrixArt);
        
        terminalOutput.appendChild(matrixElement);
        playSuccessSound();
    }
    
    function simulateScan(target) {
        if (!target) {
            displayError('Cible non spécifiée. Usage: scan <cible>');
            playErrorSound();
            return;
        }
        
        const scanElement = document.createElement('div');
        scanElement.classList.add('result');
        
        const scanHeader = document.createElement('p');
        scanHeader.innerHTML = `<span class="info">Scan de sécurité de ${target} en cours...</span>`;
        scanElement.appendChild(scanHeader);
        
        terminalOutput.appendChild(scanElement);
        
        // Simuler un scan avec des résultats aléatoires
        setTimeout(() => {
            const vulnerabilities = [
                { severity: 'high', name: 'SQL Injection', description: 'Vulnérabilité permettant l\'injection de code SQL' },
                { severity: 'medium', name: 'Cross-Site Scripting (XSS)', description: 'Vulnérabilité permettant l\'injection de scripts' },
                { severity: 'low', name: 'Outdated SSL Certificate', description: 'Certificat SSL expiré ou obsolète' },
                { severity: 'high', name: 'Remote Code Execution', description: 'Vulnérabilité permettant l\'exécution de code à distance' },
                { severity: 'medium', name: 'Insecure Authentication', description: 'Mécanisme d\'authentification faible' }
            ];
            
            // Sélectionner aléatoirement 1 à 3 vulnérabilités
            const numVulnerabilities = Math.floor(Math.random() * 3) + 1;
            const selectedVulnerabilities = [];
            
            for (let i = 0; i < numVulnerabilities; i++) {
                const randomIndex = Math.floor(Math.random() * vulnerabilities.length);
                selectedVulnerabilities.push(vulnerabilities[randomIndex]);
                vulnerabilities.splice(randomIndex, 1);
                
                if (vulnerabilities.length === 0) break;
            }
            
            // Afficher les résultats
            const resultsHeader = document.createElement('p');
            resultsHeader.innerHTML = `<span class="info">Scan terminé. ${selectedVulnerabilities.length} vulnérabilités trouvées:</span>`;
            scanElement.appendChild(resultsHeader);
            
            selectedVulnerabilities.forEach(vuln => {
                const vulnElement = document.createElement('p');
                let severityClass = '';
                
                switch (vuln.severity) {
                    case 'high':
                        severityClass = 'error';
                        break;
                    case 'medium':
                        severityClass = 'warning';
                        break;
                    case 'low':
                        severityClass = 'info';
                        break;
                }
                
                vulnElement.innerHTML = `<span class="${severityClass}">[${vuln.severity.toUpperCase()}]</span> ${vuln.name}: ${vuln.description}`;
                scanElement.appendChild(vulnElement);
            });
            
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            playSuccessSound();
        }, 2000);
    }
    
    function listDirectory() {
        const dirElement = document.createElement('div');
        dirElement.classList.add('result');
        
        dirElement.innerHTML = `
            <p><span class="info">Contenu du répertoire:</span></p>
            <p>drwxr-xr-x  2 ghost ghost 4096 Jan 1 2023 <span class="info">services/</span></p>
            <p>drwxr-xr-x  2 ghost ghost 4096 Jan 1 2023 <span class="info">clients/</span></p>
            <p>drwxr-xr-x  2 ghost ghost 4096 Jan 1 2023 <span class="info">projects/</span></p>
            <p>-rw-r--r--  1 ghost ghost 2048 Jan 1 2023 <span class="success">about.txt</span></p>
            <p>-rw-r--r--  1 ghost ghost 3072 Jan 1 2023 <span class="success">services.txt</span></p>
            <p>-rw-r--r--  1 ghost ghost 1024 Jan 1 2023 <span class="success">contact.txt</span></p>
            <p>-rw-------  1 ghost ghost 4096 Jan 1 2023 <span class="error">secret.txt</span></p>
        `;
        
        terminalOutput.appendChild(dirElement);
        playSuccessSound();
    }
    
    function catFile(filename) {
        const fileElement = document.createElement('div');
        fileElement.classList.add('result');
        
        switch (filename.toLowerCase()) {
            case 'about.txt':
                fileElement.innerHTML = `
                    <p><span class="info">Contenu de about.txt:</span></p>
                    <p>GhostSolution est une entreprise spécialisée en cybersécurité, offrant des services d'audit de sécurité, de forensique numérique et de rétro-ingénierie.</p>
                    <p>Notre équipe d'experts travaille pour protéger vos données sensibles et renforcer votre infrastructure contre les menaces modernes.</p>
                `;
                break;
            case 'services.txt':
                fileElement.innerHTML = `
                    <p><span class="info">Contenu de services.txt:</span></p>
                    <p>1. Audit de sécurité avancé - Tests d'intrusion et évaluation des vulnérabilités</p>
                    <p>2. Forensique numérique - Investigation numérique et analyse d'incidents</p>
                    <p>3. Rétro-ingénierie - Analyse de logiciels malveillants et recherche de vulnérabilités</p>
                `;
                break;
            case 'contact.txt':
                fileElement.innerHTML = `
                    <p><span class="info">Contenu de contact.txt:</span></p>
                    <p>Email: contact@ghostsolution.com</p>
                    <p>Téléphone: +33 1 23 45 67 89</p>
                    <p>Adresse: 42 Rue de la Cybersécurité, 75001 Paris, France</p>
                `;
                break;
            case 'secret.txt':
                fileElement.innerHTML = `
                    <p><span class="error">Accès refusé: Vous n'avez pas les permissions nécessaires pour lire ce fichier.</span></p>
                `;
                playErrorSound();
                break;
            default:
                fileElement.innerHTML = `
                    <p><span class="error">Erreur: Le fichier '${filename}' n'existe pas.</span></p>
                `;
                playErrorSound();
                break;
        }
        
        terminalOutput.appendChild(fileElement);
        if (filename.toLowerCase() !== 'secret.txt' && ['about.txt', 'services.txt', 'contact.txt'].includes(filename.toLowerCase())) {
            playSuccessSound();
        }
    }
    
    function displayWhoami() {
        const whoamiElement = document.createElement('div');
        whoamiElement.classList.add('result');
        
        whoamiElement.innerHTML = `
            <p>visiteur@ghostsolution.com</p>
            <p>Rôle: Invité</p>
            <p>Permissions: Lecture seule</p>
        `;
        
        terminalOutput.appendChild(whoamiElement);
        playSuccessSound();
    }
    
    // Fonctions utilitaires
    function displayResult(text) {
        const resultElement = document.createElement('p');
        resultElement.classList.add('result');
        resultElement.textContent = text;
        terminalOutput.appendChild(resultElement);
    }
    
    function displayError(text) {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
        errorElement.textContent = text;
        terminalOutput.appendChild(errorElement);
    }
    
    function displayInfo(text) {
        const infoElement = document.createElement('p');
        infoElement.classList.add('info');
        infoElement.textContent = text;
        terminalOutput.appendChild(infoElement);
    }
    
    function playSuccessSound() {
        if (soundEnabled && terminalSuccessSound) {
            const soundClone = terminalSuccessSound.cloneNode();
            soundClone.volume = 0.5;
            soundClone.play().catch(err => console.error('Erreur lors de la lecture du son:', err));
        }
    }
    
    function playErrorSound() {
        if (soundEnabled && terminalErrorSound) {
            const soundClone = terminalErrorSound.cloneNode();
            soundClone.volume = 0.5;
            soundClone.play().catch(err => console.error('Erreur lors de la lecture du son:', err));
        }
    }
}); 