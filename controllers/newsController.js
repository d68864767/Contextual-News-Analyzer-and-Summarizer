const axios = require('axios');
const OpenAI = require('openai-api');
const News = require('../models/newsModel');
const Summarizer = require('../utils/summarizer');
const ContextAnalyzer = require('../utils/contextAnalyzer');

// Load OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

// @route   GET api/news
// @desc    Retrieve news articles
// @access  Public
exports.getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   POST api/news/summarize
// @desc    Summarize a news article
// @access  Public
exports.summarizeArticle = async (req, res) => {
  try {
    const { articleUrl } = req.body;

    // Fetch the article content
    const response = await axios.get(articleUrl);
    const articleContent = response.data;

    // Summarize the article
    const summary = await Summarizer.summarize(articleContent, openai);

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   POST api/news/contextualize
// @desc    Provide context for a news article
// @access  Public
exports.contextualizeArticle = async (req, res) => {
  try {
    const { articleUrl } = req.body;

    // Fetch the article content
    const response = await axios.get(articleUrl);
    const articleContent = response.data;

    // Provide context for the article
    const context = await ContextAnalyzer.contextualize(articleContent, openai);

    res.json({ context });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
