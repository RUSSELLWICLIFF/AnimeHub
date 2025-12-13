const axios = require('axios');
const NodeCache = require('node-cache');

// Cache for 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

// Helper to delay requests to respect rate limits (3 req/sec)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let lastRequestTime = 0;

async function makeRequest(url) {
    // Check cache first
    const cached = cache.get(url);
    if (cached) {
        console.log(`Cache hit for: ${url}`);
        return cached;
    }

    // Rate limiting: ensure at least 350ms between requests (slightly more than 3/sec)
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < 350) {
        await delay(350 - timeSinceLastRequest);
    }

    try {
        console.log(`Fetching from API: ${url}`);
        const response = await axios.get(url);
        lastRequestTime = Date.now();

        // Cache the response
        cache.set(url, response.data);
        return response.data;
    } catch (error) {
        console.error(`API Error for ${url}:`, error.message);
        throw error;
    }
}

// Get top/trending anime
async function getTopAnime(page = 1, limit = 25) {
    const url = `${JIKAN_BASE_URL}/top/anime?page=${page}&limit=${limit}`;
    const data = await makeRequest(url);
    return data.data.map(transformAnimeData);
}

// Get anime by ID
async function getAnimeById(id) {
    const url = `${JIKAN_BASE_URL}/anime/${id}/full`;
    const data = await makeRequest(url);
    return transformAnimeData(data.data, true);
}

// Search anime
async function searchAnime(query, limit = 10) {
    const url = `${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=${limit}`;
    const data = await makeRequest(url);
    return data.data.map(transformAnimeData);
}

// Get anime reviews
async function getAnimeReviews(id, limit = 5) {
    const url = `${JIKAN_BASE_URL}/anime/${id}/reviews?page=1`;
    const data = await makeRequest(url);

    return data.data.slice(0, limit).map(review => ({
        user: review.user.username,
        rating: Math.round(review.score / 10 * 10) / 10, // Convert 0-10 to decimal
        comment: review.review.substring(0, 500) + (review.review.length > 500 ? '...' : ''),
        date: review.date
    }));
}

// Get seasonal anime
async function getSeasonalAnime(year, season) {
    const url = `${JIKAN_BASE_URL}/seasons/${year}/${season}`;
    const data = await makeRequest(url);
    return data.data.map(transformAnimeData);
}

// Transform Jikan API data to our format
function transformAnimeData(anime, includeReviews = false) {
    const transformed = {
        id: anime.mal_id,
        title: anime.title,
        rating: anime.score ? anime.score.toString() : 'N/A',
        image: getAnimeEmoji(anime.genres),
        thumbnail: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
        genre: anime.genres?.map(g => g.name).join(', ') || 'Unknown',
        description: anime.synopsis || 'No description available.',
        episodes: anime.episodes || 'Unknown',
        year: anime.year || anime.aired?.prop?.from?.year || 'Unknown',
        studio: anime.studios?.[0]?.name || 'Unknown',
        status: anime.status || 'Unknown',
        season: anime.season || null
    };

    // Add reviews if requested (for detail page)
    if (includeReviews && anime.mal_id) {
        // Reviews will be fetched separately to avoid nested async calls
        transformed.reviewsAvailable = true;
    }

    return transformed;
}

// Get appropriate emoji based on genres
function getAnimeEmoji(genres) {
    if (!genres || genres.length === 0) return '🎬';

    const genreNames = genres.map(g => g.name.toLowerCase());

    if (genreNames.includes('action')) return '⚔️';
    if (genreNames.includes('comedy')) return '😂';
    if (genreNames.includes('romance')) return '💕';
    if (genreNames.includes('horror') || genreNames.includes('thriller')) return '👻';
    if (genreNames.includes('sci-fi') || genreNames.includes('space')) return '🚀';
    if (genreNames.includes('fantasy')) return '🔮';
    if (genreNames.includes('sports')) return '⚽';
    if (genreNames.includes('music')) return '🎵';
    if (genreNames.includes('mecha')) return '🤖';
    if (genreNames.includes('supernatural')) return '✨';

    return '🎬';
}

module.exports = {
    getTopAnime,
    getAnimeById,
    searchAnime,
    getAnimeReviews,
    getSeasonalAnime
};
