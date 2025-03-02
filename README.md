# GhostSolution - Cybersecurity Website

Site web professionnel pour GhostSolution, spécialisé dans la cybersécurité et les audits de sécurité.

## Fonctionnalités

- Design moderne et professionnel avec thème cyberpunk
- Formulaire de contact avec notifications Discord
- Animation de fond Matrix
- Curseur personnalisé
- Effets sonores interactifs
- Design responsive
- Terminal interactif avec commandes personnalisées
- Effets de glitch activables
- Favicon personnalisé en forme de fantôme

## Nouvelles fonctionnalités

### Terminal Hacker

Un terminal interactif qui permet aux visiteurs d'exécuter des commandes prédéfinies pour découvrir des informations sur GhostSolution de manière ludique.

### Effets de Glitch

Des effets visuels de glitch peuvent être activés pour donner une ambiance cyberpunk plus immersive au site.

### Favicon Personnalisé

Un favicon en forme de fantôme avec un dégradé bleu sur fond sombre, représentant parfaitement l'identité "Ghost" de la marque.

## Configuration

### Configuration des informations sensibles

Pour configurer des informations sensibles comme l'URL du webhook Discord :

1. Copiez `js/config.local.js.example` vers `js/config.local.js`
2. Modifiez `js/config.local.js` avec vos propres valeurs :

```javascript
const configLocal = {
    // URL du webhook Discord pour les notifications du formulaire de contact
    discordWebhookUrl: 'VOTRE_URL_WEBHOOK_DISCORD'
};
```

Le fichier `config.local.js` est ignoré par Git et ne sera pas poussé vers le dépôt, gardant vos informations sensibles sécurisées.

### Installation

1. Clonez ce dépôt
2. Configurez les informations sensibles comme décrit ci-dessus
3. Ouvrez `index.html` dans votre navigateur

## Structure du Projet

- `index.html` - Page principale
- `css/` - Styles CSS
  - `style.css` - Styles principaux (1931 lignes)
- `js/` - Fichiers JavaScript
  - `config.js` - Configuration par défaut
  - `config.local.js` - Configuration locale (non suivi par Git)
  - `main.js` - Script principal (538 lignes)
  - `terminal.js` - Fonctionnalités du terminal (768 lignes)
  - `glitch.js` - Effets de glitch (275 lignes)
- `img/` - Images
  - `favicon.svg` - Icône de fantôme pour l'onglet du navigateur
  - `circuit-pattern.svg` - Motif de circuit pour le fond
- `audio/` - Fichiers audio
  - `cyberpunk-ambient.mp3` - Musique d'ambiance
  - `hover.mp3` - Son au survol
  - `click.mp3` - Son au clic
  - `terminal-key.mp3` - Son de frappe du terminal
  - `terminal-error.mp3` - Son d'erreur du terminal
  - `terminal-success.mp3` - Son de succès du terminal
  - `glitch.mp3` - Son d'effet glitch

## Statistiques du Projet

- **Nombre total de lignes** : 10 941
- **Répartition par langage** :
  - HTML : 280 lignes (7,2%)
  - CSS : 1 931 lignes (49,7%)
  - JavaScript : 1 581 lignes (40,7%)
  - SVG : 50 lignes (1,3%)
  - Markdown : 61 lignes (1,6%)
  - Fichiers audio : 7 038 lignes (binaires)

## Compatibilité Navigateurs

- Chrome (recommandé)
- Firefox
- Safari
- Edge

## Licence

Ce projet est sous licence MIT. 