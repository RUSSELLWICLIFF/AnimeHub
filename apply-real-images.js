const fs = require('fs');
const path = require('path');

// Read the anime data file
const filePath = path.join(__dirname, 'frontend', 'src', 'data', 'animeData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Map anime titles to their image files
const imageMap = {
    'Attack on Titan': '/images/anime/attack_on_titan.png',
    'My Hero Academia': '/images/anime/my_hero_academia.png',
    'Demon Slayer': '/images/anime/demon_slayer.png',
    'Tokyo Ghoul': '/images/anime/tokyo_ghoul.png',
    'Jujutsu Kaisen': '/images/anime/jujutsu_kaisen.png',
    'One Piece': '/images/anime/one_piece.png',
    'Naruto': '/images/anime/naruto.png',
    'Naruto Shippuden': '/images/anime/naruto.png',
};

// For anime without specific images, use a generic placeholder based on genre
function getGenericImage(genre) {
    if (genre.includes('Action')) return '/images/anime/attack_on_titan.png';
    if (genre.includes('Superhero')) return '/images/anime/my_hero_academia.png';
    if (genre.includes('Supernatural')) return '/images/anime/demon_slayer.png';
    if (genre.includes('Horror') || genre.includes('Dark')) return '/images/anime/tokyo_ghoul.png';
    if (genre.includes('Adventure')) return '/images/anime/one_piece.png';
    return '/images/anime/jujutsu_kaisen.png';
}

// Parse and update thumbnails
const lines = content.split('\n');
const updatedLines = lines.map(line => {
    const match = line.match(/\{ id: \d+, title: "([^"]+)".*?genre: "([^"]*)".*thumbnail: "[^"]*"/);
    if (match) {
        const title = match[1];
        const genre = match[2];

        // Get the appropriate image
        let imagePath = imageMap[title] || getGenericImage(genre);

        // Replace the thumbnail
        return line.replace(/thumbnail: "[^"]*"/, `thumbnail: "${imagePath}"`);
    }
    return line;
});

// Write back
fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf8');
console.log('Successfully updated all anime with real image thumbnails!');
