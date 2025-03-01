# GhostSolution - Cybersecurity Website

Professional website for GhostSolution, specializing in cybersecurity and security audits.

## Features

- Modern and professional design
- Contact form with Discord notifications
- Matrix background animation
- Custom cursor
- Sound effects
- Responsive design

## Setup

### Configuration

To configure sensitive information like the Discord webhook URL:

1. Copy `js/config.local.js.example` to `js/config.local.js`
2. Edit `js/config.local.js` with your own values:

```javascript
const configLocal = {
    // Discord webhook URL for contact form notifications
    discordWebhookUrl: 'YOUR_DISCORD_WEBHOOK_URL'
};
```

The `config.local.js` file is ignored by Git and won't be pushed to the repository, keeping your sensitive information secure.

### Installation

1. Clone this repository
2. Configure sensitive information as described above
3. Open `index.html` in your browser

## Project Structure

- `index.html` - Main page
- `css/` - CSS styles
- `js/` - JavaScript files
  - `config.js` - Default configuration
  - `config.local.js` - Local configuration (not tracked by Git)
  - `main.js` - Main script
- `img/` - Images
- `audio/` - Audio files

## Security

Sensitive information like webhook URLs are stored in the `js/config.local.js` file which should not be shared or pushed to the Git repository.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is licensed under the MIT License. 