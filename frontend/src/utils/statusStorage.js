// Local storage key for anime statuses
const STORAGE_KEY = 'animeStatuses';

/**
 * Get the status data for a specific anime
 * @param {string} animeId - The anime ID
 * @returns {Object|null} - The status data { status, episode } or null if not set
 */
export function getAnimeStatus(animeId) {
    try {
        const statuses = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return statuses[animeId] || null;
    } catch (error) {
        console.error('Error reading anime status:', error);
        return null;
    }
}

/**
 * Set the status data for a specific anime
 * @param {string} animeId - The anime ID
 * @param {Object|string} data - The status data { status, episode } or just status string
 */
export function setAnimeStatus(animeId, data) {
    try {
        const statuses = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        // Support both old format (string) and new format (object)
        if (typeof data === 'string') {
            statuses[animeId] = { status: data, episode: 0 };
        } else {
            statuses[animeId] = data;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
    } catch (error) {
        console.error('Error setting anime status:', error);
    }
}

/**
 * Get all anime statuses
 * @returns {Object} - Object with anime IDs as keys and statuses as values
 */
export function getAllStatuses() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (error) {
        console.error('Error reading all statuses:', error);
        return {};
    }
}

/**
 * Remove the status for a specific anime
 * @param {string} animeId - The anime ID
 */
export function removeAnimeStatus(animeId) {
    try {
        const statuses = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        delete statuses[animeId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
    } catch (error) {
        console.error('Error removing anime status:', error);
    }
}
