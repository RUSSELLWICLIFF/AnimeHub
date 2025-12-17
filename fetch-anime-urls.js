// Disable SSL verification globally
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fs = require('fs');
const path = require('path');

// Configuration
const ANIME_DATA_PATH = path.join(__dirname, 'frontend', 'src', 'data', 'animeData.js');
const OUTPUT_PATH = path.join(__dirname, 'anime-urls.json');
const DELAY_MS = 2500; // 2.5s delay to be safe

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    console.log('Reading anime data...');
    const content = fs.readFileSync(ANIME_DATA_PATH, 'utf8');

    const titleRegex = /title:\s*"([^"]+)"/g;
    let match;
    const titles = new Set();

    while ((match = titleRegex.exec(content)) !== null) {
        titles.add(match[1]);
    }

    console.log(`Found ${titles.size} unique anime titles to resolve.`);

    const urlMap = {};
    let count = 0;

    for (const title of titles) {
        // If we already have it (from partial run), skip? No, we overwrite.

        console.log(`[FETCH] Resolving URL for: ${title}`);

        try {
            const searchUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&limit=1`;
            const searchRes = await fetch(searchUrl);

            if (!searchRes.ok) {
                if (searchRes.status === 429) {
                    console.log('[RATE] Rate limited, waiting 5s...');
                    await sleep(5000);
                    // Retry once
                    const retryRes = await fetch(searchUrl);
                    if (!retryRes.ok) {
                        console.error(`Status: ${retryRes.status} on retry. Skipping.`);
                        continue;
                    }
                    const retryData = await retryRes.json();
                    if (retryData.data && retryData.data.length > 0) {
                        urlMap[title] = retryData.data[0].images.jpg.large_image_url;
                        console.log(`[FOUND] ${title} -> ${urlMap[title]}`);
                    }
                } else {
                    console.error(`Search failed with status: ${searchRes.status}`);
                }
                continue;
            }

            const searchData = await searchRes.json();

            if (searchData.data && searchData.data.length > 0) {
                urlMap[title] = searchData.data[0].images.jpg.large_image_url;
                console.log(`[FOUND] ${title} -> ${urlMap[title]}`);
            } else {
                console.log(`[MISS] No results found for: ${title}`);
            }

            await sleep(DELAY_MS);

            // Periodically save
            count++;
            if (count % 5 === 0) {
                fs.writeFileSync(OUTPUT_PATH, JSON.stringify(urlMap, null, 2));
            }

        } catch (error) {
            console.error(`[ERROR] Failed to process ${title}:`, error.message);
        }
    }

    // Final save
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(urlMap, null, 2));
    console.log(`Done! Saved ${Object.keys(urlMap).length} URLs to ${OUTPUT_PATH}`);
}

main();
