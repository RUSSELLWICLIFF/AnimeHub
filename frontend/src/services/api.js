import axiosInstance from '../config/axios.config';

// ============================================
// ANIME API ENDPOINTS
// ============================================

/**
 * Get trending anime
 * @param {number} page - Page number
 * @param {number} limit - Number of items per page
 * @returns {Promise} Anime list
 */
export const getTrendingAnime = async (page = 1, limit = 25) => {
    try {
        const response = await axiosInstance.get('/api/anime/trending', {
            params: { page, limit }
        });
        return response.data.success ? response.data.data : [];
    } catch (error) {
        console.error('Error fetching trending anime:', error);
        return [];
    }
};

/**
 * Get popular anime
 * @param {number} page - Page number
 * @param {number} limit - Number of items per page
 * @returns {Promise} Anime list
 */
export const getPopularAnime = async (page = 1, limit = 25) => {
    try {
        const response = await axiosInstance.get('/api/anime/popular', {
            params: { page, limit }
        });
        return response.data.success ? response.data.data : [];
    } catch (error) {
        console.error('Error fetching popular anime:', error);
        return [];
    }
};

/**
 * Get anime by ID
 * @param {string|number} id - Anime ID
 * @returns {Promise} Anime details
 */
export const getAnimeById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/anime/${id}`);
        return response.data.success ? response.data.data : null;
    } catch (error) {
        console.error(`Error fetching anime ${id}:`, error);
        return null;
    }
};

/**
 * Get anime reviews
 * @param {string|number} id - Anime ID
 * @param {number} limit - Number of reviews to fetch
 * @returns {Promise} Reviews list
 */
export const getAnimeReviews = async (id, limit = 5) => {
    try {
        const response = await axiosInstance.get(`/api/anime/${id}/reviews`, {
            params: { limit }
        });
        return response.data.success ? response.data.data : [];
    } catch (error) {
        console.error(`Error fetching reviews for anime ${id}:`, error);
        return [];
    }
};

/**
 * Search anime by query
 * @param {string} query - Search query
 * @param {number} limit - Number of results
 * @returns {Promise} Search results
 */
export const searchAnime = async (query, limit = 10) => {
    if (!query || query.trim() === '') return [];

    try {
        const response = await axiosInstance.get('/api/anime/search/query', {
            params: { q: query, limit }
        });
        return response.data.success ? response.data.data : [];
    } catch (error) {
        console.error('Error searching anime:', error);
        return [];
    }
};

// ============================================
// AUTHENTICATION API ENDPOINTS
// ============================================

/**
 * User signup
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Signup response
 */
export const signup = async (email, password) => {
    try {
        const response = await axiosInstance.post('/signup', {
            email,
            password
        });

        // Store token if provided
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }

        return {
            success: response.data.success,
            message: response.data.message,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to connect to server',
            error: error
        };
    }
};

/**
 * User login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Login response
 */
export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', {
            email,
            password
        });

        // Store token if provided
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }

        return {
            success: response.data.success,
            message: response.data.message,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to connect to server',
            error: error
        };
    }
};

/**
 * User logout
 */
export const logout = () => {
    localStorage.removeItem('authToken');
};

// Export all API functions
export default {
    // Anime
    getTrendingAnime,
    getPopularAnime,
    getAnimeById,
    getAnimeReviews,
    searchAnime,
    // Auth
    signup,
    login,
    logout
};
