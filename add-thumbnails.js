const fs = require('fs');
const path = require('path');

// Read the anime data file
const filePath = path.join(__dirname, 'frontend', 'src', 'data', 'animeData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Define thumbnail mappings
const thumbnailMappings = [
    { title: 'My Hero Academia', thumbnail: '/images/anime/my_hero_academia.png' },
    { title: 'Demon Slayer', thumbnail: '/images/anime/demon_slayer.png' },
    { title: 'Tokyo Ghoul', thumbnail: '/images/anime/tokyo_ghoul.png' },
    { title: 'Jujutsu Kaisen', thumbnail: '/images/anime/jujutsu_kaisen.png' },
    { title: 'One Piece', thumbnail: '/images/anime/one_piece.png' },
    { title: 'Naruto', thumbnail: '/images/anime/naruto.png' },
    { title: 'Naruto Shippuden', thumbnail: '/images/anime/naruto.png' },
];

// Add thumbnail field to each anime entry
thumbnailMappings.forEach(({ title, thumbnail }) => {
    // Match entries with this title that don't already have a thumbnail
    const regex = new RegExp(`(\\{ id: \\d+, title: "${title}"[^}]*image: "[^"]*")`, 'g');
    content = content.replace(regex, (match) => {
        if (!match.includes('thumbnail:')) {
            return match + `, thumbnail: "${thumbnail}"`;
        }
        return match;
    });
});

// Write back to file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully added thumbnails to anime entries!');
