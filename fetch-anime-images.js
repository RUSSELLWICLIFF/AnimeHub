// Disable SSL verification globally
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fs = require('fs');
const path = require('path');
// No external dependencies needed for Node 18+

// Configuration
const ANIME_DATA_PATH = path.join(__dirname, 'frontend', 'src', 'data', 'animeData.js');
const IMAGES_DIR = path.join(__dirname, 'frontend', 'public', 'images', 'anime');
const DELAY_MS = 1000;

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    console.log('Reading anime data...');
    try {
        const content = fs.readFileSync(ANIME_DATA_PATH, 'utf8');

        const titleRegex = /title:\s*"([^"]+)"/g;
        let match;
        const titles = new Set();

        while ((match = titleRegex.exec(content)) !== null) {
            titles.add(match[1]);
        }

        console.log(`Found ${titles.size} unique anime titles.`);

        for (const title of titles) {
            const safeFilename = title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.jpg';
            const imagePath = path.join(IMAGES_DIR, safeFilename);

            // Skip if file exists and has content
            if (fs.existsSync(imagePath) && fs.statSync(imagePath).size > 1000) {
                console.log(`[SKIP] Image already exists for: ${title}`);
                continue;
            }

            console.log(`[FETCH] Searching for: ${title}`);

            try {
                // Search Jikan API
                const searchUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&limit=1`;
                const searchRes = await fetch(searchUrl);

                if (!searchRes.ok) {
                    if (searchRes.status === 429) {
                        console.log('[RATE] Rate limited, waiting 2s...');
                        await sleep(2000);
                        // Retry once? For now just continue, getting 429 usually means slow down globally.
                        // We will just sleep and retry current loop iteration logic is hard in for-of, 
                        // so we will just accept failure for this one.
                    }
                    console.error(`Search failed with status: ${searchRes.status}`);
                    continue;
                }

                const searchData = await searchRes.json();

                if (searchData.data && searchData.data.length > 0) {
                    const anime = searchData.data[0];
                    const imageUrl = anime.images.jpg.large_image_url;

                    console.log(`[DOWNL] Downloading image for: ${title}`);

                    const imageRes = await fetch(imageUrl, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            'Referer': 'https://myanimelist.net/'
                        }
                    });
                    if (!imageRes.ok) throw new Error(`Image download failed: ${imageRes.status}`);

                    const buffer = Buffer.from(await imageRes.arrayBuffer());
                    fs.writeFileSync(imagePath, buffer);

                    await sleep(DELAY_MS);
                } else {
                    console.log(`[MISS] No results found for: ${title}`);
                }
            } catch (error) {
                console.error(`[ERROR] Failed to process ${title}:`, error.message);
            }
        }

        console.log('Done fetching images!');
    } catch (err) {
        console.error("Fatal error:", err);
    }
}

main();
