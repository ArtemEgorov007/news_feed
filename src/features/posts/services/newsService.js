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
        if (!API_KEY || API_KEY === 'your_api_key_here') {
            return this.getFallbackData(page, pageSize);
        }

        try {
            const response = await axios.get(`${BASE_URL}/everything`, {
                params: {
                    q: 'technology OR ai OR "neural network" OR programming',
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
            
            // More specific error handling
            if (error.response && error.response.status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            } else if (error.response && error.response.status >= 500) {
                throw new Error('Server error. Please try again later.');
            } else if (error.response && error.response.status >= 400) {
                throw new Error('API error. Please check your API key or try again later.');
            } else {
                throw new Error('Network error. Please check your connection.');
            }
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
        if (!API_KEY || API_KEY === 'your_api_key_here') {
            return this.getFallbackData(page, pageSize);
        }

        try {
            const params = {
                category: 'technology',
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
            
            // More specific error handling
            if (error.response && error.response.status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            } else if (error.response && error.response.status >= 500) {
                throw new Error('Server error. Please try again later.');
            } else if (error.response && error.response.status >= 400) {
                throw new Error('API error. Please check your API key or try again later.');
            } else {
                throw new Error('Network error. Please check your connection.');
            }
        }
    },

    /**
     * Get fallback data when API is not available
     * @param {number} page - Page number
     * @param {number} pageSize - Number of articles per page
     * @returns {Object} - Fallback data
     */
    getFallbackData(page, pageSize) {
        // Create more realistic fallback data for technology news
        const fallbackArticles = [
            {
                id: 1,
                title: '🚀 Breakthrough in Quantum Computing Achieved',
                body: 'Scientists demonstrate quantum supremacy with new 128-qubit processor, paving the way for revolutionary advances in cryptography and drug discovery.',
                userId: 1,
                source: 'Tech Science Journal',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL
            },
            {
                id: 2,
                title: '🤖 AI Assistant Surpasses Human Performance in Coding Tasks',
                body: 'New language model shows exceptional ability to generate, debug, and optimize code across multiple programming languages with near-perfect accuracy.',
                userId: 2,
                source: 'AI Research Daily',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL
            },
            {
                id: 3,
                title: '🌐 Next-Gen Internet Protocol Deployment Accelerates',
                body: 'IPv6 adoption reaches 75% globally as organizations migrate to the new standard, promising enhanced security and unlimited address space.',
                userId: 3,
                source: 'Network World',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL
            },
            {
                id: 4,
                title: '🔋 Solid-State Battery Technology Promises 10-Minute Charging',
                body: 'Revolutionary battery design offers 500-mile range electric vehicles with charging times comparable to filling a gas tank.',
                userId: 4,
                source: 'Energy Tech Review',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL
            },
            {
                id: 5,
                title: '📱 Foldable Smartphone Market Expands with New Competitors',
                body: 'Three major manufacturers announce next-generation foldable devices with improved durability and innovative form factors.',
                userId: 5,
                source: 'Mobile Tech Today',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL
            },
            {
                id: 6,
                title: '☁️ Edge Computing Reduces Latency to Near Zero',
                body: 'Distributed computing architecture brings data processing closer to end users, enabling real-time applications like autonomous vehicles.',
                userId: 6,
                source: 'Cloud Computing Weekly',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL
            },
            {
                id: 7,
                title: '🔒 Post-Quantum Cryptography Standard Announced',
                body: 'NIST selectsCRYSTALS-Kyber as the new encryption standard to protect against future quantum computer attacks.',
                userId: 7,
                source: 'Cybersecurity Magazine',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL
            },
            {
                id: 8,
                title: '🎮 Virtual Reality Achieves Photorealistic Visuals',
                body: 'New VR headset with eye-tracking and foveated rendering delivers cinema-quality graphics while reducing hardware requirements.',
                userId: 8,
                source: 'VR Gaming Network',
                publishedAt: new Date().toISOString(),
                url: '#'  // Use '#' to indicate no real URL
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