const fs = require('fs');
const path = require('path');

// Read the anime data file
const filePath = path.join(__dirname, 'frontend', 'src', 'data', 'animeData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Function to generate a simple SVG data URL with anime-specific styling
function getSvgDataUrl(title, season, id) {
    const colors = [
        '#ff4d4d', '#ff6b6b', '#ff8787', '#ffa5a5',
        '#c92a2a', '#e03131', '#f03e3e', '#fa5252',
        '#ff6b9d', '#cc5de8', '#a61e4d', '#e64980'
    ];

    const color = colors[id % colors.length];
    const displayText = season ? `${title.substring(0, 12)}... S${season}` : title.substring(0, 15);

    // Create SVG with text
    const svg = `<svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="600" fill="#1a1a3e"/>
  <text x="200" y="280" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${color}" text-anchor="middle">${displayText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
  <text x="200" y="320" font-family="Arial, sans-serif" font-size="18" fill="#ffffff" text-anchor="middle" opacity="0.7">AnimeHub</text>
</svg>`;

    // Convert to base64 data URL
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
}

// Update each anime entry with a unique thumbnail
const lines = content.split('\n');
const updatedLines = lines.map(line => {
    // Match anime entry lines
    const match = line.match(/\{ id: (\d+), title: "([^"]+)"(?:, season: (\d+))?,/);
    if (match) {
        const id = parseInt(match[1]);
        const title = match[2];
        const season = match[3] ? parseInt(match[3]) : null;

        const svgUrl = getSvgDataUrl(title, season, id);

        // Replace existing thumbnail
        if (line.includes('thumbnail:')) {
            return line.replace(/thumbnail: "[^"]*"/, `thumbnail: "${svgUrl}"`);
        } else {
            return line.replace(/(image: "[^"]*")/, `$1, thumbnail: "${svgUrl}"`);
        }
    }
    return line;
});

// Write back to file
fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf8');
console.log('Successfully added SVG data URL thumbnails to all anime entries!');
