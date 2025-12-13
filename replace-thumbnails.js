// Script to update all anime thumbnails in animeData.js
// This script will replace all SVG base64 thumbnails with getThumbnail() function calls

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'src', 'data', 'animeData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace all SVG base64 thumbnails with getThumbnail function calls
// Pattern: thumbnail: "data:image/svg+xml;base64,..." 
// Replace with: thumbnail: getThumbnail("Title", season)

// This regex finds the thumbnail property with base64 data
const thumbnailRegex = /thumbnail: "data:image\/svg\+xml;base64,[^"]+"/g;

// Count replacements
let count = 0;

// Replace each occurrence
content = content.replace(
    /{ id: (\d+), title: "([^"]+)", season: (\d+), rating: "[^"]+", image: "[^"]+", thumbnail: "data:image\/svg\+xml;base64,[^"]+"/g,
    (match, id, title, season) => {
        count++;
        return match.replace(
            /thumbnail: "data:image\/svg\+xml;base64,[^"]+"/,
            `thumbnail: getThumbnail("${title}", ${season})`
        );
    }
);

// Also handle anime without seasons (season: 1 by default)
content = content.replace(
    /{ id: (\d+), title: "([^"]+)", season: 1, rating: "[^"]+", image: "[^"]+", thumbnail: "data:image\/svg\+xml;base64,[^"]+"/g,
    (match, id, title) => {
        count++;
        return match.replace(
            /thumbnail: "data:image\/svg\+xml;base64,[^"]+"/,
            `thumbnail: getThumbnail("${title}", 1)`
        );
    }
);

// Write the updated content back
fs.writeFileSync(filePath, content, 'utf8');

console.log(`✅ Successfully updated ${count} anime thumbnails!`);
console.log(`📝 File updated: ${filePath}`);
console.log(`\n🎨 All anime now use colored placeholder images based on their series and season.`);
console.log(`\n💡 To use real anime posters:`);
console.log(`   1. Download anime poster images`);
console.log(`   2. Place them in frontend/public/images/anime/`);
console.log(`   3. Update the getThumbnail function to return local paths instead of placehold.co URLs`);
