// Script to update anime thumbnails with real anime poster URLs
// Using placeholder.com with anime-themed colors for now
// You can replace these with actual anime poster URLs later

const fs = require('fs');
const path = require('path');

// Anime image mappings with placeholder URLs (you can replace with real URLs)
const animeImages = {
    // Attack on Titan - Dark red/brown tones
    "Attack on Titan_1": "https://via.placeholder.com/400x600/8B0000/FFFFFF?text=Attack+on+Titan+S1",
    "Attack on Titan_2": "https://via.placeholder.com/400x600/A52A2A/FFFFFF?text=Attack+on+Titan+S2",
    "Attack on Titan_3": "https://via.placeholder.com/400x600/DC143C/FFFFFF?text=Attack+on+Titan+S3",
    "Attack on Titan_4": "https://via.placeholder.com/400x600/8B0000/FFFFFF?text=Attack+on+Titan+S4",

    // My Hero Academia - Green/Blue hero colors
    "My Hero Academia_1": "https://via.placeholder.com/400x600/228B22/FFFFFF?text=My+Hero+Academia+S1",
    "My Hero Academia_2": "https://via.placeholder.com/400x600/32CD32/FFFFFF?text=My+Hero+Academia+S2",
    "My Hero Academia_3": "https://via.placeholder.com/400x600/00FF00/000000?text=My+Hero+Academia+S3",
    "My Hero Academia_4": "https://via.placeholder.com/400x600/9ACD32/000000?text=My+Hero+Academia+S4",
    "My Hero Academia_5": "https://via.placeholder.com/400x600/6B8E23/FFFFFF?text=My+Hero+Academia+S5",
    "My Hero Academia_6": "https://via.placeholder.com/400x600/556B2F/FFFFFF?text=My+Hero+Academia+S6",
    "My Hero Academia_7": "https://via.placeholder.com/400x600/8FBC8F/000000?text=My+Hero+Academia+S7",

    // Demon Slayer - Purple/Red demon colors
    "Demon Slayer_1": "https://via.placeholder.com/400x600/4B0082/FFFFFF?text=Demon+Slayer+S1",
    "Demon Slayer_2": "https://via.placeholder.com/400x600/8B008B/FFFFFF?text=Demon+Slayer+S2",
    "Demon Slayer_3": "https://via.placeholder.com/400x600/9370DB/FFFFFF?text=Demon+Slayer+S3",
    "Demon Slayer_4": "https://via.placeholder.com/400x600/BA55D3/000000?text=Demon+Slayer+S4",

    // Tokyo Ghoul - Dark red/black
    "Tokyo Ghoul_1": "https://via.placeholder.com/400x600/2F4F4F/FFFFFF?text=Tokyo+Ghoul+S1",
    "Tokyo Ghoul_2": "https://via.placeholder.com/400x600/696969/FFFFFF?text=Tokyo+Ghoul+S2",
    "Tokyo Ghoul_3": "https://via.placeholder.com/400x600/708090/FFFFFF?text=Tokyo+Ghoul+S3",
    "Tokyo Ghoul_4": "https://via.placeholder.com/400x600/778899/FFFFFF?text=Tokyo+Ghoul+S4",

    // Jujutsu Kaisen - Purple/Black
    "Jujutsu Kaisen_1": "https://via.placeholder.com/400x600/483D8B/FFFFFF?text=Jujutsu+Kaisen+S1",
    "Jujutsu Kaisen_2": "https://via.placeholder.com/400x600/6A5ACD/FFFFFF?text=Jujutsu+Kaisen+S2",

    // One Piece - Ocean blue/adventure
    "One Piece_1": "https://via.placeholder.com/400x600/1E90FF/FFFFFF?text=One+Piece+S1",
    "One Piece_2": "https://via.placeholder.com/400x600/4169E1/FFFFFF?text=One+Piece+S2",
    "One Piece_3": "https://via.placeholder.com/400x600/0000CD/FFFFFF?text=One+Piece+S3",
    "One Piece_4": "https://via.placeholder.com/400x600/00008B/FFFFFF?text=One+Piece+S4",
    "One Piece_5": "https://via.placeholder.com/400x600/191970/FFFFFF?text=One+Piece+S5",
    "One Piece_6": "https://via.placeholder.com/400x600/000080/FFFFFF?text=One+Piece+S6",

    // Naruto - Orange
    "Naruto_1": "https://via.placeholder.com/400x600/FF8C00/000000?text=Naruto+S1",
    "Naruto Shippuden_1": "https://via.placeholder.com/400x600/FF4500/FFFFFF?text=Naruto+Shippuden",

    // Other popular anime
    "Fullmetal Alchemist: Brotherhood_1": "https://via.placeholder.com/400x600/B8860B/FFFFFF?text=FMA+Brotherhood",
    "Death Note_1": "https://via.placeholder.com/400x600/000000/FFFFFF?text=Death+Note",
    "Steins;Gate_1": "https://via.placeholder.com/400x600/8B4513/FFFFFF?text=Steins+Gate",
    "Steins;Gate 0_1": "https://via.placeholder.com/400x600/A0522D/FFFFFF?text=Steins+Gate+0",
    "Hunter x Hunter_1": "https://via.placeholder.com/400x600/228B22/FFFFFF?text=Hunter+x+Hunter",
    "Sword Art Online_1": "https://via.placeholder.com/400x600/4682B4/FFFFFF?text=SAO+S1",
    "Sword Art Online_2": "https://via.placeholder.com/400x600/5F9EA0/FFFFFF?text=SAO+S2",
    "Sword Art Online_3": "https://via.placeholder.com/400x600/6495ED/FFFFFF?text=SAO+S3",
    "Sword Art Online_4": "https://via.placeholder.com/400x600/87CEEB/000000?text=SAO+S4",
    "Code Geass_1": "https://via.placeholder.com/400x600/800080/FFFFFF?text=Code+Geass+S1",
    "Code Geass_2": "https://via.placeholder.com/400x600/9932CC/FFFFFF?text=Code+Geass+S2",
    "Cowboy Bebop_1": "https://via.placeholder.com/400x600/2F4F4F/FFFFFF?text=Cowboy+Bebop",
    "Mob Psycho 100_1": "https://via.placeholder.com/400x600/FF1493/FFFFFF?text=Mob+Psycho+100+S1",
    "Mob Psycho 100_2": "https://via.placeholder.com/400x600/FF69B4/000000?text=Mob+Psycho+100+S2",
    "Mob Psycho 100_3": "https://via.placeholder.com/400x600/FFB6C1/000000?text=Mob+Psycho+100+S3",
    "One Punch Man_1": "https://via.placeholder.com/400x600/FFD700/000000?text=One+Punch+Man+S1",
    "One Punch Man_2": "https://via.placeholder.com/400x600/FFA500/000000?text=One+Punch+Man+S2",
    "Bleach_1": "https://via.placeholder.com/400x600/FF4500/FFFFFF?text=Bleach",
    "Bleach: Thousand-Year Blood War_1": "https://via.placeholder.com/400x600/DC143C/FFFFFF?text=Bleach+TYBW",
    "Dragon Ball Z_1": "https://via.placeholder.com/400x600/FF8C00/000000?text=Dragon+Ball+Z",
    "Dragon Ball Super_1": "https://via.placeholder.com/400x600/1E90FF/FFFFFF?text=Dragon+Ball+Super",
    "Vinland Saga_1": "https://via.placeholder.com/400x600/8B4513/FFFFFF?text=Vinland+Saga+S1",
    "Vinland Saga_2": "https://via.placeholder.com/400x600/A0522D/FFFFFF?text=Vinland+Saga+S2",
    "Re:Zero_1": "https://via.placeholder.com/400x600/4B0082/FFFFFF?text=Re+Zero+S1",
    "Re:Zero_2": "https://via.placeholder.com/400x600/8B008B/FFFFFF?text=Re+Zero+S2",
    "The Promised Neverland_1": "https://via.placeholder.com/400x600/FF6347/FFFFFF?text=Promised+Neverland+S1",
    "The Promised Neverland_2": "https://via.placeholder.com/400x600/FF7F50/000000?text=Promised+Neverland+S2",
    "Haikyuu!!_1": "https://via.placeholder.com/400x600/FF8C00/000000?text=Haikyuu+S1",
    "Haikyuu!!_2": "https://via.placeholder.com/400x600/FFA500/000000?text=Haikyuu+S2",
    "Haikyuu!!_3": "https://via.placeholder.com/400x600/FFD700/000000?text=Haikyuu+S3",
    "Haikyuu!!_4": "https://via.placeholder.com/400x600/FFFF00/000000?text=Haikyuu+S4",
    "Spy x Family_1": "https://via.placeholder.com/400x600/DC143C/FFFFFF?text=Spy+x+Family+S1",
    "Spy x Family_2": "https://via.placeholder.com/400x600/FF1493/FFFFFF?text=Spy+x+Family+S2",
    "Chainsaw Man_1": "https://via.placeholder.com/400x600/8B0000/FFFFFF?text=Chainsaw+Man",
    "Frieren: Beyond Journey's End_1": "https://via.placeholder.com/400x600/4682B4/FFFFFF?text=Frieren",
    "Mushoku Tensei_1": "https://via.placeholder.com/400x600/4169E1/FFFFFF?text=Mushoku+Tensei+S1",
    "Mushoku Tensei_2": "https://via.placeholder.com/400x600/1E90FF/FFFFFF?text=Mushoku+Tensei+S2",
    "Overlord_1": "https://via.placeholder.com/400x600/2F4F4F/FFFFFF?text=Overlord+S1",
    "Overlord_2": "https://via.placeholder.com/400x600/696969/FFFFFF?text=Overlord+S2",
    "Overlord_3": "https://via.placeholder.com/400x600/708090/FFFFFF?text=Overlord+S3",
    "Overlord_4": "https://via.placeholder.com/400x600/778899/FFFFFF?text=Overlord+S4",
    "That Time I Got Reincarnated as a Slime_1": "https://via.placeholder.com/400x600/00CED1/000000?text=Slime+S1",
    "That Time I Got Reincarnated as a Slime_2": "https://via.placeholder.com/400x600/40E0D0/000000?text=Slime+S2",
    "That Time I Got Reincarnated as a Slime_3": "https://via.placeholder.com/400x600/48D1CC/000000?text=Slime+S3",
    "Konosuba_1": "https://via.placeholder.com/400x600/9370DB/FFFFFF?text=Konosuba+S1",
    "Konosuba_2": "https://via.placeholder.com/400x600/BA55D3/000000?text=Konosuba+S2",
    "Konosuba_3": "https://via.placeholder.com/400x600/DA70D6/000000?text=Konosuba+S3",
    "Violet Evergarden_1": "https://via.placeholder.com/400x600/9370DB/FFFFFF?text=Violet+Evergarden",
    "Your Lie in April_1": "https://via.placeholder.com/400x600/FFB6C1/000000?text=Your+Lie+in+April",
    "Anohana_1": "https://via.placeholder.com/400x600/87CEEB/000000?text=Anohana",
    "Clannad_1": "https://via.placeholder.com/400x600/FFB6C1/000000?text=Clannad",
    "Clannad: After Story_2": "https://via.placeholder.com/400x600/FFC0CB/000000?text=Clannad+After+Story",
    "Toradora!_1": "https://via.placeholder.com/400x600/FF69B4/000000?text=Toradora",
    "Kaguya-sama: Love is War_1": "https://via.placeholder.com/400x600/FF1493/FFFFFF?text=Kaguya+sama+S1",
    "Kaguya-sama: Love is War_2": "https://via.placeholder.com/400x600/FF69B4/000000?text=Kaguya+sama+S2",
    "Kaguya-sama: Love is War_3": "https://via.placeholder.com/400x600/FFB6C1/000000?text=Kaguya+sama+S3",
    "Horimiya_1": "https://via.placeholder.com/400x600/FFA07A/000000?text=Horimiya",
    "Fruits Basket_1": "https://via.placeholder.com/400x600/FFB6C1/000000?text=Fruits+Basket+S1",
    "Fruits Basket_2": "https://via.placeholder.com/400x600/FFC0CB/000000?text=Fruits+Basket+S2",
    "Fruits Basket_3": "https://via.placeholder.com/400x600/FFE4E1/000000?text=Fruits+Basket+S3",
    "Parasyte_1": "https://via.placeholder.com/400x600/2F4F4F/FFFFFF?text=Parasyte",
    "Erased_1": "https://via.placeholder.com/400x600/4682B4/FFFFFF?text=Erased",
    "Made in Abyss_1": "https://via.placeholder.com/400x600/483D8B/FFFFFF?text=Made+in+Abyss+S1",
    "Made in Abyss_2": "https://via.placeholder.com/400x600/6A5ACD/FFFFFF?text=Made+in+Abyss+S2",
    "Dr. Stone_1": "https://via.placeholder.com/400x600/32CD32/000000?text=Dr+Stone+S1",
    "Dr. Stone_2": "https://via.placeholder.com/400x600/00FF00/000000?text=Dr+Stone+S2",
    "Dr. Stone_3": "https://via.placeholder.com/400x600/7FFF00/000000?text=Dr+Stone+S3",
    "The Rising of the Shield Hero_1": "https://via.placeholder.com/400x600/228B22/FFFFFF?text=Shield+Hero+S1",
    "The Rising of the Shield Hero_2": "https://via.placeholder.com/400x600/32CD32/FFFFFF?text=Shield+Hero+S2",
    "The Rising of the Shield Hero_3": "https://via.placeholder.com/400x600/00FF00/000000?text=Shield+Hero+S3",
    "Assassination Classroom_1": "https://via.placeholder.com/400x600/FFD700/000000?text=Assassination+Classroom+S1",
    "Assassination Classroom_2": "https://via.placeholder.com/400x600/FFA500/000000?text=Assassination+Classroom+S2",
    "Noragami_1": "https://via.placeholder.com/400x600/4169E1/FFFFFF?text=Noragami+S1",
    "Noragami_2": "https://via.placeholder.com/400x600/1E90FF/FFFFFF?text=Noragami+S2",
    "Blue Exorcist_1": "https://via.placeholder.com/400x600/0000CD/FFFFFF?text=Blue+Exorcist+S1",
    "Blue Exorcist_2": "https://via.placeholder.com/400x600/00008B/FFFFFF?text=Blue+Exorcist+S2",
    "Black Clover_1": "https://via.placeholder.com/400x600/2F4F4F/FFFFFF?text=Black+Clover",
    "Fire Force_1": "https://via.placeholder.com/400x600/FF4500/FFFFFF?text=Fire+Force+S1",
    "Fire Force_2": "https://via.placeholder.com/400x600/FF6347/FFFFFF?text=Fire+Force+S2",
    "Dororo_1": "https://via.placeholder.com/400x600/8B4513/FFFFFF?text=Dororo",
    "Beastars_1": "https://via.placeholder.com/400x600/696969/FFFFFF?text=Beastars+S1",
    "Beastars_2": "https://via.placeholder.com/400x600/808080/FFFFFF?text=Beastars+S2",
};

console.log('Anime image mappings created!');
console.log(`Total images: ${Object.keys(animeImages).length}`);
console.log('\nTo use real anime posters, replace the placeholder URLs with actual image URLs from:');
console.log('- MyAnimeList (myanimelist.net)');
console.log('- AniList (anilist.co)');
console.log('- The Movie Database (themoviedb.org)');
console.log('- Or host your own images in frontend/public/images/anime/');

module.exports = { animeImages };
