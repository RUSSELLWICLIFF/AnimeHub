const fs = require('fs');
const path = require('path');

// Read the anime data file
const filePath = path.join(__dirname, 'frontend', 'src', 'data', 'animeData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Parse the anime data to extract all entries
const animeDataMatch = content.match(/export const animeData = \[([\s\S]*?)\];/);
if (!animeDataMatch) {
    console.error('Could not find animeData array');
    process.exit(1);
}

// Function to generate placeholder image URL with anime-specific styling
function getPlaceholderUrl(title, season, id) {
    const colors = [
        'ff4d4d', 'ff6b6b', 'ff8787', 'ffa5a5',
        'c92a2a', 'e03131', 'f03e3e', 'fa5252',
        'ff6b9d', 'cc5de8', 'a61e4d', 'e64980'
    ];

    const color = colors[id % colors.length];
    const bgColor = '1a1a3e';
    const text = season ? `${title.substring(0, 15)}...S${season}` : title.substring(0, 20);
    const encodedText = encodeURIComponent(text);

    return `https://placehold.co/400x600/${bgColor}/${color}?text=${encodedText}&font=roboto`;
}

// Update each anime entry with a unique thumbnail
let idCounter = 1;
const lines = content.split('\n');
const updatedLines = lines.map(line => {
    // Match anime entry lines
    const match = line.match(/\{ id: (\d+), title: "([^"]+)"(?:, season: (\d+))?,/);
    if (match) {
        const id = parseInt(match[1]);
        const title = match[2];
        const season = match[3] ? parseInt(match[3]) : null;

        const placeholderUrl = getPlaceholderUrl(title, season, id);

        // Check if thumbnail already exists in the line
        if (line.includes('thumbnail:')) {
            // Replace existing thumbnail
            return line.replace(/thumbnail: "[^"]*"/, `thumbnail: "${placeholderUrl}"`);
        } else {
            // Add thumbnail after image field
            return line.replace(/(image: "[^"]*")/, `$1, thumbnail: "${placeholderUrl}"`);
        }
    }
    return line;
});

// Write back to file
fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf8');
console.log('Successfully added unique placeholder thumbnails to all anime entries!');
