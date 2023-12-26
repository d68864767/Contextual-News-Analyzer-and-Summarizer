const express = require('express');
const router = express.Router();

// Import news controller
const newsController = require('../controllers/newsController');

// @route   GET api/news
// @desc    Retrieve news articles
// @access  Public
router.get('/', newsController.getNews);

// @route   POST api/news/summarize
// @desc    Summarize a news article
// @access  Public
router.post('/summarize', newsController.summarizeArticle);

// @route   POST api/news/contextualize
// @desc    Provide context for a news article
// @access  Public
router.post('/contextualize', newsController.contextualizeArticle);

module.exports = router;
