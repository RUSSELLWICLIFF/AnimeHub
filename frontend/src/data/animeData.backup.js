// API client for fetching anime data from backend using axios
import axiosInstance from '../config/axios.config';

// Cache for client-side data
const clientCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
    const cached = clientCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    return null;
}

function setCache(key, data) {
    clientCache.set(key, { data, timestamp: Date.now() });
}

// Get trending anime
export async function getTrendingAnime(page = 1, limit = 25) {
    const cacheKey = `trending_${page}_${limit}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        const response = await axiosInstance.get('/api/anime/trending', {
            params: { page, limit }
        });
        if (response.data.success) {
            setCache(cacheKey, response.data.data);
            return response.data.data;
        }
        throw new Error(response.data.error || 'Failed to fetch trending anime');
    } catch (error) {
        console.error('Error fetching trending anime:', error);
        return [];
    }
}

// Get popular anime
export async function getPopularAnime(page = 1, limit = 25) {
    const cacheKey = `popular_${page}_${limit}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        const response = await axiosInstance.get('/api/anime/popular', {
            params: { page, limit }
        });
        if (response.data.success) {
            setCache(cacheKey, response.data.data);
            return response.data.data;
        }
        throw new Error(response.data.error || 'Failed to fetch popular anime');
    } catch (error) {
        console.error('Error fetching popular anime:', error);
        return [];
    }
}

// Get anime by ID
export async function getAnimeById(id) {
    const cacheKey = `anime_${id}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        const response = await axiosInstance.get(`/api/anime/${id}`);
        if (response.data.success) {
            setCache(cacheKey, response.data.data);
            return response.data.data;
        }
        throw new Error(response.data.error || 'Failed to fetch anime details');
    } catch (error) {
        console.error(`Error fetching anime ${id}:`, error);
        return null;
    }
}

// Get anime reviews
export async function getAnimeReviews(id, limit = 5) {
    const cacheKey = `reviews_${id}_${limit}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        const response = await axiosInstance.get(`/api/anime/${id}/reviews`, {
            params: { limit }
        });
        if (response.data.success) {
            setCache(cacheKey, response.data.data);
            return response.data.data;
        }
        throw new Error(response.data.error || 'Failed to fetch reviews');
    } catch (error) {
        console.error(`Error fetching reviews for anime ${id}:`, error);
        return [];
    }
}

// Search anime
export async function searchAnime(query, limit = 10) {
    if (!query || query.trim() === '') return [];

    const cacheKey = `search_${query}_${limit}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        const response = await axiosInstance.get('/api/anime/search/query', {
            params: { q: query, limit }
        });
        if (response.data.success) {
            setCache(cacheKey, response.data.data);
            return response.data.data;
        }
        throw new Error(response.data.error || 'Failed to search anime');
    } catch (error) {
        console.error('Error searching anime:', error);
        return [];
    }
}

// Get all seasons of an anime by title
export function getAnimeSeasons(title, allAnime) {
    return allAnime.filter(anime => anime.title === title);
}

// Export for backward compatibility
export const animeData = [];
