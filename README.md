# GhostSolution - Cybersecurity Showcase Website

A modern showcase website for GhostSolution, a company specializing in cybersecurity and security audits. The site features ASCII art aesthetics with advanced JavaScript animations and visual effects inspired by the world of cybersecurity.

## Features

- ASCII art design with glitch effects and animations
- Interactive custom cursor
- Sound effects and ambient music
- Scroll animations
- Simulated interactive terminal
- Contact form
- Matrix background effect
- Responsive design

## Project Structure

```
GhostSolutionWeb/
├── index.html          # Main page
├── css/
│   └── style.css       # CSS styles
├── js/
│   └── main.js         # JavaScript scripts
├── audio/              # Audio files
│   ├── cyberpunk-ambient.mp3
│   ├── hover.mp3
│   └── click.mp3
└── img/                # Images
    └── matrix-bg.png
```

## How to Use

1. Clone this repository to your local machine
2. Open the `index.html` file in your web browser
3. For a complete experience, make sure you have audio files in the `audio/` folder

## Customization

### Colors

The main colors are defined as CSS variables in the `style.css` file:

```css
:root {
    --bg-color: #0a0a0a;
    --text-color: #33ff33;
    --accent-color: #ff00ff;
    --secondary-color: #00ffff;
    --dark-accent: #330033;
    --light-bg: #111111;
    --terminal-bg: #0c0c0c;
    --terminal-border: #333333;
    --terminal-text: #33ff33;
    --glitch-color1: #ff00ff;
    --glitch-color2: #00ffff;
}
```

You can modify these variables to change the color theme of the site.

### Content

To modify the site content, edit the `index.html` file. The main sections are:

- Header with logo and navigation
- Home section (hero)
- Services section
- Expertise section
- Contact section
- Footer

### Sounds

To customize sounds, replace the files in the `audio/` folder:

- `cyberpunk-ambient.mp3`: Ambient music
- `hover.mp3`: Sound on hover over interactive elements
- `click.mp3`: Sound on click

## Compatibility

The site is compatible with modern browsers:
- Chrome (recommended for optimal experience)
- Firefox
- Safari
- Edge

## Credits

- Fonts: Google Fonts (Space Mono, VT323, Orbitron)
- Sound effects: To be added by the user
- ASCII Art: Generated for GhostSolution

## License

This project is under the MIT License. See the LICENSE file for more details. 