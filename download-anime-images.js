// Bypass SSL verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Download all anime images locally
const fs = require('fs');
const path = require('path');
const https = require('https');

// Read the anime-urls.json file
const urlsPath = path.join(__dirname, 'anime-urls.json');
const animeUrls = JSON.parse(fs.readFileSync(urlsPath, 'utf8'));

const imagesDir = path.join(__dirname, 'frontend', 'public', 'images', 'anime-posters');

// Create directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(filepath);
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve();
                });
                fileStream.on('error', reject);
            } else {
                reject(new Error(`Failed to download: ${response.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function downloadAll() {
    let downloaded = 0;
    let failed = 0;

    for (const [title, url] of Object.entries(animeUrls)) {
        const filename = title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.jpg';
        const filepath = path.join(imagesDir, filename);

        // Skip if already exists
        if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
            console.log(`[SKIP] ${title}`);
            continue;
        }

        try {
            console.log(`[DOWN] ${title}...`);
            await downloadImage(url, filepath);
            downloaded++;
            console.log(`[OK] ${title}`);

            // Small delay to be nice to the server
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`[FAIL] ${title}: ${error.message}`);
            failed++;
        }
    }

    console.log(`\nComplete! Downloaded: ${downloaded}, Failed: ${failed}`);
}

downloadAll();
