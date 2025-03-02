document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const toggleTerminalBtn = document.getElementById("toggleTerminal");
  const closeTerminalBtn = document.getElementById("closeTerminal");
  const hackerTerminal = document.getElementById("hackerTerminal");
  const terminalInput = document.getElementById("terminalInput");
  const terminalOutput = document.getElementById("terminalOutput");

  // Variables
  let commandHistory = [];
  let historyIndex = -1;
  let terminalActive = false;

  // Check if elements exist
  if (
    !toggleTerminalBtn ||
    !hackerTerminal ||
    !terminalInput ||
    !terminalOutput
  ) {
    console.error("Terminal elements not found");
    return;
  }

  // Initialization
  init();

  function init() {
    // Add event listeners
    toggleTerminalBtn.addEventListener("click", toggleTerminal);
    closeTerminalBtn.addEventListener("click", closeTerminal);
    terminalInput.addEventListener("keydown", handleTerminalInput);

    // Add MutationObserver to automatically scroll when terminal content changes
    const terminalObserver = new MutationObserver(function (mutations) {
      scrollToBottom();
    });

    terminalObserver.observe(terminalOutput, {
      childList: true, // observe direct children
      subtree: true, // and lower descendants too
      characterData: true, // observe changes to text content
    });
  }

  // Function to toggle terminal
  function toggleTerminal() {
    if (hackerTerminal.classList.contains("active")) {
      closeTerminal();
    } else {
      openTerminal();
    }
  }

  // Function to open terminal
  function openTerminal() {
    hackerTerminal.classList.add("active");
    toggleTerminalBtn.classList.add("active");
    terminalActive = true;

    // Focus on input
    setTimeout(() => {
      terminalInput.focus();

      // Display welcome message if terminal is empty
      if (terminalOutput.childNodes.length === 0) {
        displayWelcomeMessage();
      }

      initTerminalScroll();
    }, 300);
  }

  // Function to initialize terminal scroll behavior
  function initTerminalScroll() {
    // Ensure terminal is scrollable
    terminalOutput.style.overflowY = "auto";

    // Log for debugging
    console.log(
      "Terminal scroll initialized, height:",
      terminalOutput.scrollHeight
    );
  }

  // Function to close terminal
  function closeTerminal() {
    hackerTerminal.classList.remove("active");
    toggleTerminalBtn.classList.remove("active");
    terminalActive = false;
  }

  // Function to handle terminal inputs
  function handleTerminalInput(e) {
    // Handle special keys
    if (e.key === "Enter") {
      e.preventDefault();
      const command = terminalInput.value.trim();

      if (command) {
        // Add command to history
        commandHistory.push(command);
        historyIndex = commandHistory.length;

        // Display command in terminal
        const commandElement = document.createElement("p");
        commandElement.classList.add("command");
        commandElement.textContent = command;
        terminalOutput.appendChild(commandElement);

        // Execute command
        executeCommand(command);

        // Clear input
        terminalInput.value = "";

        // Scroll to bottom
        scrollToBottom();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      autocompleteCommand();
    }
  }

  // Function to ensure terminal always scrolls to the bottom when new content is added
  function scrollToBottom() {
    // Use requestAnimationFrame to ensure the scroll happens after the DOM has been updated
    requestAnimationFrame(() => {
      terminalOutput.scrollTop = terminalOutput.scrollHeight;

      // Double-check the scroll position after a short delay
      // This helps with certain browsers and when content includes images or other resources
      setTimeout(() => {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }, 10);
    });
  }

  // Function to execute a command
  function executeCommand(command) {
    const cmd = command.toLowerCase();
    const args = cmd.split(" ").filter((arg) => arg.trim() !== "");
    const mainCommand = args[0];

    switch (mainCommand) {
      case "help":
        displayHelp();
        break;
      case "clear":
        clearTerminal();
        break;
      case "about":
        displayAbout();
        break;
      case "services":
        displayServices();
        break;
      case "contact":
        displayContact();
        break;
      case "hack":
        simulateHack(args[1]);
        break;
      case "matrix":
        displayMatrix();
        break;
      case "scan":
        simulateScan(args[1]);
        break;
      case "ls":
      case "dir":
        listDirectory();
        break;
      case "cat":
        if (args.length > 1) {
          catFile(args[1]);
        } else {
          displayError("Usage: cat <filename>");
        }
        break;
      case "whoami":
        displayWhoami();
        break;
      case "glitch":
        toggleGlitchEffect();
        break;
      case "bigard":
        displayBigard();
        break;
      case "exit":
        closeTerminal();
        break;
      default:
        displayError(
          `Command not recognized: ${mainCommand}. Type 'help' to see available commands.`
        );
    }
  }

  // Function for command autocompletion
  function autocompleteCommand() {
    const input = terminalInput.value.toLowerCase();
    const commands = [
      "help",
      "clear",
      "about",
      "services",
      "contact",
      "hack",
      "matrix",
      "scan",
      "ls",
      "dir",
      "cat",
      "whoami",
      "bigard",
      "exit",
    ];

    const matches = commands.filter((cmd) => cmd.startsWith(input));

    if (matches.length === 1) {
      terminalInput.value = matches[0];
    } else if (matches.length > 1) {
      displayResult(matches.join("  "));
      scrollToBottom();
    }
  }

  // Display functions
  function displayWelcomeMessage() {
    const asciiArt = `
  ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗███████╗ ██████╗ ██╗     ██╗   ██╗████████╗██╗ ██████╗ ███╗   ██╗
 ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔═══██╗██║     ██║   ██║╚══██╔══╝██║██╔═══██╗████╗  ██║
 ██║  ███╗███████║██║   ██║███████╗   ██║   ███████╗██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██╔██╗ ██║
 ██║   ██║██╔══██║██║   ██║╚════██║   ██║   ╚════██║██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██║╚██╗██║
 ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║   ███████║╚██████╔╝███████╗╚██████╔╝   ██║   ██║╚██████╔╝██║ ╚████║
  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝    ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
        `;

    const asciiElement = document.createElement("pre");
    asciiElement.classList.add("ascii-art");
    asciiElement.textContent = asciiArt;
    terminalOutput.appendChild(asciiElement);

    displayInfo("Welcome to GhostSolution Terminal v1.0");
    displayInfo('Type "help" to see available commands.');

    // Scroll to bottom
    scrollToBottom();
  }

  function displayHelp() {
    const helpText = [
      { command: "help", description: "Display this help" },
      { command: "clear", description: "Clear the terminal" },
      { command: "about", description: "About GhostSolution" },
      { command: "services", description: "Display our services" },
      { command: "contact", description: "Display contact information" },
      { command: "ls / dir", description: "List files" },
      { command: "cat <file>", description: "Display file content" },
      { command: "whoami", description: "Display current user" },
      { command: "glitch", description: "Toggle glitch effect on/off" },
      { command: "exit", description: "Close the terminal" },
    ];

    const helpElement = document.createElement("div");
    helpElement.classList.add("result");

    const helpTitle = document.createElement("p");
    helpTitle.innerHTML = '<span class="info">Available commands:</span>';
    helpElement.appendChild(helpTitle);

    const commandTable = document.createElement("table");
    commandTable.style.width = "100%";
    commandTable.style.borderCollapse = "collapse";
    commandTable.style.marginTop = "10px";

    helpText.forEach((item) => {
      const row = document.createElement("tr");

      const cmdCell = document.createElement("td");
      cmdCell.style.padding = "5px 10px 5px 0";
      cmdCell.style.color = "var(--accent-color)";
      cmdCell.style.fontWeight = "bold";
      cmdCell.style.whiteSpace = "nowrap";
      cmdCell.textContent = item.command;

      const descCell = document.createElement("td");
      descCell.style.padding = "5px 0";
      descCell.textContent = item.description;

      row.appendChild(cmdCell);
      row.appendChild(descCell);
      commandTable.appendChild(row);
    });

    helpElement.appendChild(commandTable);
    terminalOutput.appendChild(helpElement);

    scrollToBottom();
  }

  function clearTerminal() {
    terminalOutput.innerHTML = "";
  }

  function displayAbout() {
    const aboutElement = document.createElement("div");
    aboutElement.classList.add("result");

    aboutElement.innerHTML = `
            <p><span class="info">About GhostSolution:</span></p>
            <p>GhostSolution is a company specialized in cybersecurity, offering security audit services, digital forensics, and reverse engineering.</p>
            <p>Our team of experts works to protect your sensitive data and strengthen your infrastructure against modern threats.</p>
            <p>Founded in 2023, our mission is to make the digital world safer for everyone.</p>
        `;

    terminalOutput.appendChild(aboutElement);
    scrollToBottom();
  }

  function displayServices() {
    const servicesElement = document.createElement("div");
    servicesElement.classList.add("result");

    servicesElement.innerHTML = `
            <p><span class="info">Our services:</span></p>
            <p><span class="success">1. Advanced Security Audit</span> - Penetration testing and vulnerability assessment</p>
            <p><span class="success">2. Digital Forensics</span> - Digital investigation and incident analysis</p>
            <p><span class="success">3. Reverse Engineering</span> - Malware analysis and vulnerability research</p>
        `;

    terminalOutput.appendChild(servicesElement);
    scrollToBottom();
  }

  function displayContact() {
    const contactElement = document.createElement("div");
    contactElement.classList.add("result");

    contactElement.innerHTML = `
            <p><span class="info">Contact:</span></p>
            <p>Email: <span class="success">anonymous@protonmail.com</span></p>
            <p>Phone: <span class="success">1-800-H4CK-L33T</span></p>
            <p>Address: <span class="success">Somewhere in the darknet...</span></p>
        `;

    terminalOutput.appendChild(contactElement);
    scrollToBottom();
  }

  function simulateHack(target) {
    if (!target) {
      displayError("Please specify a target to hack. Example: hack website");
      scrollToBottom();
      return;
    }

    const hackElement = document.createElement("div");
    hackElement.classList.add("result");

    switch (target.toLowerCase()) {
      case "website":
        simulateHackProcess(hackElement, "Website", [
          "Scanning target website...",
          "Identifying vulnerabilities...",
          "Exploiting XSS vulnerability...",
          "Bypassing WAF...",
          "Accessing admin panel...",
          "Extracting database credentials...",
          "Downloading sensitive data...",
          "Covering tracks...",
        ]);
        break;
      case "database":
        simulateHackProcess(hackElement, "Database", [
          "Scanning database ports...",
          "Testing default credentials...",
          "Exploiting SQL injection...",
          "Escalating privileges...",
          "Dumping user tables...",
          "Extracting hashed passwords...",
          "Cracking password hashes...",
          "Establishing persistent access...",
        ]);
        break;
      case "network":
        simulateHackProcess(hackElement, "Network", [
          "Scanning network topology...",
          "Identifying vulnerable devices...",
          "Exploiting router vulnerability...",
          "Performing ARP poisoning...",
          "Intercepting network traffic...",
          "Capturing authentication tokens...",
          "Establishing backdoor...",
          "Covering tracks...",
        ]);
        break;
      default:
        hackElement.innerHTML = `
                    <p><span class="error">Unknown target: ${target}</span></p>
                    <p>Try with: website, database, or network</p>
                `;
        terminalOutput.appendChild(hackElement);
        scrollToBottom();
        return;
    }

    terminalOutput.appendChild(hackElement);
  }

  function simulateHackProcess(element, targetName, steps) {
    element.innerHTML = `<p><span class="info">Initiating hack on ${targetName}...</span></p>`;
    scrollToBottom();

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        const stepElement = document.createElement("p");
        stepElement.textContent = steps[i];
        element.appendChild(stepElement);
        scrollToBottom();
        i++;
      } else {
        clearInterval(interval);
        const completionElement = document.createElement("p");
        completionElement.innerHTML = `<span class="success">${targetName} hack completed successfully!</span>`;
        element.appendChild(completionElement);
        scrollToBottom();
      }
    }, 500);
  }

  function displayMatrix() {
    const matrixElement = document.createElement("div");
    matrixElement.classList.add("result");

    const matrixContainer = document.createElement("div");
    matrixContainer.style.fontFamily = "monospace";
    matrixContainer.style.color = "#00ff00";
    matrixContainer.style.textShadow = "0 0 5px #00ff00";
    matrixContainer.style.lineHeight = "1.2";
    matrixContainer.style.height = "200px";
    matrixContainer.style.overflow = "hidden";
    matrixContainer.style.position = "relative";

    matrixElement.appendChild(matrixContainer);
    terminalOutput.appendChild(matrixElement);
    scrollToBottom();

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&+,:;=?@#|'<>.^*()%!-";
    const width = Math.floor(matrixContainer.offsetWidth / 10);
    const drops = [];

    for (let i = 0; i < width; i++) {
      drops[i] = Math.floor(Math.random() * 100);
    }

    let frameCount = 0;
    const maxFrames = 200; // Limit animation to prevent performance issues

    const draw = () => {
      if (frameCount >= maxFrames) {
        return;
      }

      frameCount++;

      let matrixText = "";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        matrixText += text;
      }

      const line = document.createElement("div");
      line.textContent = matrixText;
      line.style.textAlign = "center";

      if (matrixContainer.childNodes.length >= 20) {
        matrixContainer.removeChild(matrixContainer.firstChild);
      }

      matrixContainer.appendChild(line);
      scrollToBottom();

      requestAnimationFrame(draw);
    };

    draw();
  }

  function simulateScan(target) {
    if (!target) {
      displayError("Please specify a target to scan. Example: scan website");
      scrollToBottom();
      return;
    }

    const scanElement = document.createElement("div");
    scanElement.classList.add("result");

    switch (target.toLowerCase()) {
      case "website":
        simulateScanProcess(
          scanElement,
          "Website",
          [
            "Performing DNS enumeration...",
            "Checking HTTP headers...",
            "Scanning for open ports...",
            "Identifying web technologies...",
            "Testing for common vulnerabilities...",
            "Checking SSL/TLS configuration...",
            "Scanning for outdated components...",
            "Generating security report...",
          ],
          [
            "Outdated WordPress version detected",
            "Weak SSL configuration found",
            "Directory listing enabled",
            "Missing security headers",
          ]
        );
        break;
      case "network":
        simulateScanProcess(
          scanElement,
          "Network",
          [
            "Performing network discovery...",
            "Identifying active hosts...",
            "Scanning for open ports...",
            "Fingerprinting operating systems...",
            "Checking for vulnerable services...",
            "Testing firewall rules...",
            "Analyzing network traffic...",
            "Generating security report...",
          ],
          [
            "Unpatched router firmware detected",
            "Weak wireless encryption",
            "Multiple open ports on critical servers",
            "Outdated network protocols in use",
          ]
        );
        break;
      case "system":
        simulateScanProcess(
          scanElement,
          "System",
          [
            "Checking operating system version...",
            "Scanning for installed software...",
            "Identifying running services...",
            "Checking user permissions...",
            "Testing for missing patches...",
            "Analyzing security configurations...",
            "Checking for malware indicators...",
            "Generating security report...",
          ],
          [
            "Multiple outdated software packages",
            "Unnecessary services running",
            "Weak user password policies",
            "Missing critical security patches",
          ]
        );
        break;
      default:
        scanElement.innerHTML = `
                    <p><span class="error">Unknown target: ${target}</span></p>
                    <p>Try with: website, network, or system</p>
                `;
        terminalOutput.appendChild(scanElement);
        scrollToBottom();
        return;
    }

    terminalOutput.appendChild(scanElement);
  }

  function simulateScanProcess(element, targetName, steps, findings) {
    element.innerHTML = `<p><span class="info">Initiating security scan on ${targetName}...</span></p>`;
    scrollToBottom();

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        const stepElement = document.createElement("p");
        stepElement.textContent = steps[i];
        element.appendChild(stepElement);
        scrollToBottom();
        i++;
      } else {
        clearInterval(interval);

        const completionElement = document.createElement("p");
        completionElement.innerHTML = `<span class="success">${targetName} security scan completed!</span>`;
        element.appendChild(completionElement);

        const findingsElement = document.createElement("div");
        findingsElement.innerHTML = `<p><span class="warning">Security issues found:</span></p>`;

        findings.forEach((finding) => {
          const findingElement = document.createElement("p");
          findingElement.innerHTML = `<span class="warning">- ${finding}</span>`;
          findingsElement.appendChild(findingElement);
        });

        element.appendChild(findingsElement);

        const recommendationElement = document.createElement("p");
        recommendationElement.innerHTML = `<span class="info">Recommendation: Contact GhostSolution for a detailed security assessment.</span>`;
        element.appendChild(recommendationElement);

        scrollToBottom();
      }
    }, 500);
  }

  function listDirectory() {
    const dirElement = document.createElement("div");
    dirElement.classList.add("result");

    dirElement.innerHTML = `
            <p><span class="info">Directory listing:</span></p>
            <p><span style="color: var(--accent-color);">drwxr-xr-x</span> system/</p>
            <p><span style="color: var(--accent-color);">drwxr-xr-x</span> logs/</p>
            <p><span style="color: var(--accent-color);">drwxr-xr-x</span> data/</p>
            <p><span style="color: var(--secondary-color);">-rw-r--r--</span> about.txt</p>
            <p><span style="color: var(--secondary-color);">-rw-r--r--</span> services.txt</p>
            <p><span style="color: var(--secondary-color);">-rw-r--r--</span> contact.txt</p>
            <p><span style="color: var(--danger-color);">-rw-------</span> secret.txt</p>
        `;

    terminalOutput.appendChild(dirElement);
    scrollToBottom();
  }

  function catFile(filename) {
    const fileElement = document.createElement("div");
    fileElement.classList.add("result");

    switch (filename.toLowerCase()) {
      case "about.txt":
        fileElement.innerHTML = `
                    <p><span class="info">Content of about.txt:</span></p>
                    <p>GhostSolution is a company specialized in cybersecurity, offering security audit services, digital forensics, and reverse engineering.</p>
                    <p>Our team of experts works to protect your sensitive data and strengthen your infrastructure against modern threats.</p>
                `;
        break;
      case "services.txt":
        fileElement.innerHTML = `
                    <p><span class="info">Content of services.txt:</span></p>
                    <p>1. Advanced Security Audit - Penetration testing and vulnerability assessment</p>
                    <p>2. Digital Forensics - Digital investigation and incident analysis</p>
                    <p>3. Reverse Engineering - Malware analysis and vulnerability research</p>
                `;
        break;
      case "contact.txt":
        fileElement.innerHTML = `
                    <p><span class="info">Content of contact.txt:</span></p>
                    <p>Email: anonymous@protonmail.com</p>
                    <p>Phone: 1-800-H4CK-L33T</p>
                    <p>Address: Somewhere in the darknet...</p>
                `;
        break;
      case "secret.txt":
        fileElement.innerHTML = `
                    <p><span class="error">Access denied: You don't have the necessary permissions to read this file.</span></p>
                `;
        break;
      default:
        fileElement.innerHTML = `
                    <p><span class="error">Error: File '${filename}' does not exist.</span></p>
                `;
        break;
    }

    terminalOutput.appendChild(fileElement);
    scrollToBottom();
  }

  function displayWhoami() {
    const whoamiElement = document.createElement("div");
    whoamiElement.classList.add("result");

    whoamiElement.innerHTML = `
            <p>visitor@ghostsolution.com</p>
            <p>Role: Guest</p>
            <p>Permissions: Read-only</p>
        `;

    terminalOutput.appendChild(whoamiElement);
    scrollToBottom();
  }

  // Utility functions
  function displayResult(text) {
    const resultElement = document.createElement("p");
    resultElement.classList.add("result");
    resultElement.textContent = text;
    terminalOutput.appendChild(resultElement);
    scrollToBottom();
  }

  function displayError(text) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent = text;
    terminalOutput.appendChild(errorElement);
    scrollToBottom();
  }

  function displayInfo(text) {
    const infoElement = document.createElement("p");
    infoElement.classList.add("info");
    infoElement.textContent = text;
    terminalOutput.appendChild(infoElement);
    scrollToBottom();
  }

  // Function to toggle glitch effect
  function toggleGlitchEffect() {
    // Check if current page is a legal page
    const isLegalPage =
      window.location.pathname.includes("terms-of-service.html") ||
      window.location.pathname.includes("privacy-policy.html") ||
      window.location.pathname.includes("cookie-policy.html");

    // Don't allow glitch effect on legal pages
    if (isLegalPage) {
      displayError("Glitch effect is disabled on legal pages.");
      return;
    }

    // Get the toggleGlitch button from the DOM
    const toggleGlitchBtn = document.getElementById("toggleGlitch");

    if (!toggleGlitchBtn) {
      displayError("Glitch effect control not available.");
      return;
    }

    // Check if window.toggleGlitch function exists (from glitch.js)
    if (typeof window.toggleGlitch === "function") {
      // Call the global toggleGlitch function
      window.toggleGlitch();

      // Check if glitch is active by looking at the button class
      const isGlitchActive = toggleGlitchBtn.classList.contains("active");

      if (isGlitchActive) {
        displayInfo("Glitch effect activated.");
      } else {
        displayInfo("Glitch effect deactivated.");
      }
    } else {
      // Simulate a click on the toggleGlitch button
      toggleGlitchBtn.click();

      // Check if glitch is active by looking at the button class
      const isGlitchActive = toggleGlitchBtn.classList.contains("active");

      if (isGlitchActive) {
        displayInfo("Glitch effect activated.");
      } else {
        displayInfo("Glitch effect deactivated.");
      }
    }
  }

  // Function to display Bigard easter egg
  function displayBigard() {
    const bigardElement = document.createElement("div");
    bigardElement.classList.add("result");

    // Message d'introduction
    const introElement = document.createElement("p");
    introElement.innerHTML =
      '<span class="info">🎭 Easter Egg activé : Jean-Marie Bigard arrive ! 🎭</span>';
    bigardElement.appendChild(introElement);

    // Ajouter un message de chargement
    const loadingElement = document.createElement("p");
    loadingElement.textContent = "Chargement du spectacle...";
    bigardElement.appendChild(loadingElement);

    terminalOutput.appendChild(bigardElement);
    scrollToBottom();

    // Simuler un chargement
    setTimeout(() => {
      // Supprimer le message de chargement
      bigardElement.removeChild(loadingElement);

      // Créer un conteneur pour la vidéo
      const videoContainer = document.createElement("div");
      videoContainer.style.margin = "15px 0";
      videoContainer.style.maxWidth = "100%";

      // Liste d'IDs de vidéos YouTube de Bigard
      const bigardVideos = [
        // https://www.youtube.com/watch?v=dXAd5H8DNKw
        "k00DReMKuzo", // Bigard - Spiderman SALOPES
        "L1UeinGeO44", // Bigard - Le lâcher de Salopes
        "LtnuVxjwoek", // Bigard - 3 nains ou du routier
      ];

      // Choisir une vidéo au hasard
      const randomVideoId =
        bigardVideos[Math.floor(Math.random() * bigardVideos.length)];

      // Créer l'élément iframe pour la vidéo YouTube
      const videoIframe = document.createElement("iframe");
      videoIframe.width = "560";
      videoIframe.height = "315";
      videoIframe.style.maxWidth = "100%";
      videoIframe.src = `https://www.youtube.com/embed/${randomVideoId}?autoplay=1`;
      videoIframe.title = "Jean-Marie Bigard";
      videoIframe.frameBorder = "0";
      videoIframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      videoIframe.allowFullscreen = true;

      videoContainer.appendChild(videoIframe);
      bigardElement.appendChild(videoContainer);

      // Ajouter une citation aléatoire
      const quotes = [
        "Lâchez-vous, c'est un ordre !",
        "Je ne suis pas vulgaire, je suis populaire !",
        "Si tu veux faire rire Dieu, raconte-lui tes projets !",
        "La vie c'est comme une boîte de chocolats, on commence par les meilleurs et on finit par les pralinés parce que personne n'en veut !",
      ];

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

      const quoteElement = document.createElement("p");
      quoteElement.innerHTML = `<span class="success">"${randomQuote}" - Jean-Marie Bigard</span>`;
      bigardElement.appendChild(quoteElement);

      scrollToBottom();
    }, 1500);
  }
});
