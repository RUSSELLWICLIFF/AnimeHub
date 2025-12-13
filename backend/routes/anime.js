const express = require('express');
const router = express.Router();
const animeService = require('../services/animeService');

// Get top/trending anime
router.get('/trending', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 25;
        const anime = await animeService.getTopAnime(page, limit);
        res.json({ success: true, data: anime });
    } catch (error) {
        console.error('Error fetching trending anime:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch trending anime' });
    }
});

// Get popular anime (same as trending for now)
router.get('/popular', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 25;
        const anime = await animeService.getTopAnime(page, limit);
        res.json({ success: true, data: anime });
    } catch (error) {
        console.error('Error fetching popular anime:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch popular anime' });
    }
});

// Get anime by ID
router.get('/:id', async (req, res) => {
    try {
        const anime = await animeService.getAnimeById(req.params.id);
        res.json({ success: true, data: anime });
    } catch (error) {
        console.error(`Error fetching anime ${req.params.id}:`, error);
        res.status(500).json({ success: false, error: 'Failed to fetch anime details' });
    }
});

// Get anime reviews
router.get('/:id/reviews', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const reviews = await animeService.getAnimeReviews(req.params.id, limit);
        res.json({ success: true, data: reviews });
    } catch (error) {
        console.error(`Error fetching reviews for anime ${req.params.id}:`, error);
        res.status(500).json({ success: false, error: 'Failed to fetch reviews' });
    }
});

// Search anime
router.get('/search/query', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ success: false, error: 'Query parameter required' });
        }
        const limit = parseInt(req.query.limit) || 10;
        const anime = await animeService.searchAnime(query, limit);
        res.json({ success: true, data: anime });
    } catch (error) {
        console.error('Error searching anime:', error);
        res.status(500).json({ success: false, error: 'Failed to search anime' });
    }
});

module.exports = router;
