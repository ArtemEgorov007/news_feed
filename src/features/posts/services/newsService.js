import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'your_api_key_here';
const BASE_URL = 'https://newsapi.org/v2';

const newsService = {
    /**
     * Fetch general news
     * @param {number} page - Page number
     * @param {number} pageSize - Number of articles per page
     * @returns {Promise<Object>} - News data with articles
     */
    async fetchGeneralNews(page = 1, pageSize = 10) {
        // If no API key is provided, return fallback data immediately
        if (API_KEY === 'your_api_key_here') {
            return this.getFallbackData(page, pageSize);
        }

        try {
            const response = await axios.get(`${BASE_URL}/everything`, {
                params: {
                    q: 'latest OR trending OR important OR significant',
                    sortBy: 'publishedAt',
                    language: 'en',
                    page: page,
                    pageSize: pageSize,
                    apiKey: API_KEY
                }
            });

            // Transform news articles to match the existing post structure
            const articles = response.data.articles.map((article, index) => ({
                id: (page - 1) * pageSize + index + 1,
                title: article.title,
                body: article.description || article.content || 'No description available',
                userId: 1, // Default user ID
                url: article.url,
                publishedAt: article.publishedAt,
                source: article.source?.name || 'Unknown Source'
            }));

            return {
                articles: articles,
                totalResults: response.data.totalResults
            };
        } catch (error) {
            console.error('Error fetching general news:', error);
            // Return fallback data if API call fails
            return this.getFallbackData(page, pageSize);
        }
    },

    /**
     * Fetch top headlines
     * @param {number} page - Page number
     * @param {number} pageSize - Number of articles per page
     * @returns {Promise<Object>} - News data with articles
     */
    async fetchTopHeadlines(page = 1, pageSize = 10) {
        // If no API key is provided, return fallback data immediately
        if (API_KEY === 'your_api_key_here') {
            return this.getFallbackData(page, pageSize);
        }

        try {
            const params = {
                language: 'en',
                page: page,
                pageSize: pageSize,
                apiKey: API_KEY
            };

            // Log the query for debugging
            console.log('Fetching top headlines with params:', params);

            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                params
            });

            // Transform news articles to match the existing post structure
            const articles = response.data.articles.map((article, index) => ({
                id: (page - 1) * pageSize + index + 1,
                title: article.title,
                body: article.description || article.content || 'No description available',
                userId: 1, // Default user ID
                url: article.url,
                publishedAt: article.publishedAt,
                source: article.source?.name || 'Unknown Source'
            }));

            return {
                articles: articles,
                totalResults: response.data.totalResults
            };
        } catch (error) {
            console.error('Error fetching top headlines:', error);
            // Return fallback data if API call fails
            return this.getFallbackData(page, pageSize);
        }
    },

    /**
     * Get fallback data when API is not available
     * @param {number} page - Page number
     * @param {number} pageSize - Number of articles per page
     * @returns {Object} - Fallback data
     */
    getFallbackData(page, pageSize) {
        // Create more realistic fallback data for general news
        const fallbackArticles = [
            {
                id: 1,
                title: '🌍 Global Summit Addresses Climate Change Challenges',
                body: 'World leaders gather to discuss innovative solutions for reducing carbon emissions and promoting sustainable development worldwide.',
                userId: 1,
                source: 'Global News Network',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL, which will show "View Details" button
            },
            {
                id: 2,
                title: '🏥 Medical Breakthrough in Cancer Treatment Research',
                body: 'Scientists announce promising results from clinical trials of a new immunotherapy approach that could revolutionize cancer treatment.',
                userId: 2,
                source: 'Health Science Journal',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL, which will show "View Details" button
            },
            {
                id: 3,
                title: '🎓 Education Initiative Launches to Bridge Digital Divide',
                body: 'Non-profit organization partners with tech companies to provide underprivileged students with devices and internet access for remote learning.',
                userId: 3,
                source: 'Education Today',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL, which will show "View Details" button
            },
            {
                id: 4,
                title: '🚀 Space Exploration Mission Discovers New Exoplanet',
                body: 'Astronomers identify Earth-like planet in habitable zone of nearby star system, raising hopes for finding extraterrestrial life.',
                userId: 4,
                source: 'Space Science Daily',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL, which will show "View Details" button
            },
            {
                id: 5,
                title: '💼 Economic Recovery Shows Strong Signs of Growth',
                body: 'Latest economic indicators suggest robust recovery with employment rates rising and consumer confidence at all-time highs.',
                userId: 5,
                source: 'Financial Times',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL, which will show "View Details" button
            }
        ];

        // Simulate pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedArticles = fallbackArticles.slice(startIndex, endIndex);

        return {
            articles: paginatedArticles,
            totalResults: fallbackArticles.length
        };
    }
};

export default newsService;