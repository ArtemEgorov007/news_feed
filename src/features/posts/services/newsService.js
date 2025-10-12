import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'your_api_key_here';
const BASE_URL = 'https://newsapi.org/v2';

// Check if we're running on GitHub Pages
const isGithubPages = window.location.hostname.includes('github.io');

const newsService = {
    /**
     * Fetch general news
     * @param {number} page - Page number
     * @param {number} pageSize - Number of articles per page
     * @returns {Promise<Object>} - News data with articles
     */
    async fetchGeneralNews(page = 1, pageSize = 10) {
        // If on GitHub Pages or no API key, return fallback data immediately
        if (isGithubPages || !API_KEY || API_KEY === 'your_api_key_here') {
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
                // Return fallback data when API fails
                return this.getFallbackData(page, pageSize);
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
        // If on GitHub Pages or no API key, return fallback data immediately
        if (isGithubPages || !API_KEY || API_KEY === 'your_api_key_here') {
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
                // Return fallback data when API fails
                return this.getFallbackData(page, pageSize);
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
                body: 'Scientists demonstrate quantum supremacy with new 128-qubit processor, paving the way for revolutionary advances in cryptography and drug discovery. This breakthrough represents a significant milestone in the field of quantum computing, with potential applications spanning multiple industries including finance, healthcare, and cybersecurity.',
                userId: 1,
                source: 'Tech Science Journal',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/quantum-computing-breakthrough'  // Example URL
            },
            {
                id: 2,
                title: '🤖 AI Assistant Surpasses Human Performance in Coding Tasks',
                body: 'New language model shows exceptional ability to generate, debug, and optimize code across multiple programming languages with near-perfect accuracy. In benchmark tests, the AI outperformed human developers in both speed and correctness when completing complex programming challenges.',
                userId: 2,
                source: 'AI Research Daily',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/ai-coding-performance'
            },
            {
                id: 3,
                title: '🌐 Next-Gen Internet Protocol Deployment Accelerates',
                body: 'IPv6 adoption reaches 75% globally as organizations migrate to the new standard, promising enhanced security and unlimited address space. The transition is expected to enable new technologies and services that were previously constrained by the limited number of IPv4 addresses.',
                userId: 3,
                source: 'Network World',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/ipv6-deployment'
            },
            {
                id: 4,
                title: '🔋 Solid-State Battery Technology Promises 10-Minute Charging',
                body: 'Revolutionary battery design offers 500-mile range electric vehicles with charging times comparable to filling a gas tank. The new solid-state batteries are also significantly safer and more environmentally friendly than traditional lithium-ion batteries.',
                userId: 4,
                source: 'Energy Tech Review',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/solid-state-batteries'
            },
            {
                id: 5,
                title: '📱 Foldable Smartphone Market Expands with New Competitors',
                body: 'Three major manufacturers announce next-generation foldable devices with improved durability and innovative form factors. The new devices feature ultra-thin glass and improved hinge mechanisms that promise better longevity and user experience.',
                userId: 5,
                source: 'Mobile Tech Today',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/foldable-smartphones'
            },
            {
                id: 6,
                title: '☁️ Edge Computing Reduces Latency to Near Zero',
                body: 'Distributed computing architecture brings data processing closer to end users, enabling real-time applications like autonomous vehicles. This technology is expected to revolutionize industries that require instant data processing and decision-making capabilities.',
                userId: 6,
                source: 'Cloud Computing Weekly',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/edge-computing'
            },
            {
                id: 7,
                title: '🔒 Post-Quantum Cryptography Standard Announced',
                body: 'NIST selectsCRYSTALS-Kyber as the new encryption standard to protect against future quantum computer attacks. This new standard will ensure data security remains robust even as quantum computing technology advances.',
                userId: 7,
                source: 'Cybersecurity Magazine',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/post-quantum-cryptography'
            },
            {
                id: 8,
                title: '🎮 Virtual Reality Achieves Photorealistic Visuals',
                body: 'New VR headset with eye-tracking and foveated rendering delivers cinema-quality graphics while reducing hardware requirements. Users report unprecedented levels of immersion, opening new possibilities for entertainment, education, and training applications.',
                userId: 8,
                source: 'VR Gaming Network',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/vr-photorealistic'
            },
            {
                id: 9,
                title: '📡 Satellite Internet Coverage Reaches Remote Areas Worldwide',
                body: 'Global satellite constellation project completes deployment, bringing high-speed internet access to previously underserved regions. This development is expected to bridge the digital divide and enable economic growth in remote areas around the world.',
                userId: 9,
                source: 'Space Technology Review',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/satellite-internet'
            },
            {
                id: 10,
                title: '🧬 Bioinformatics Advances Enable Personalized Medicine',
                body: 'New algorithms can analyze genetic data in real-time, allowing doctors to tailor treatments to individual patients. This approach has shown remarkable success in cancer treatment and rare disease diagnosis.',
                userId: 10,
                source: 'Medical Technology Journal',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/personalized-medicine'
            },
            {
                id: 11,
                title: '📡 6G Wireless Technology Trials Show Unprecedented Speeds',
                body: 'Early tests of 6G networks demonstrate data transmission speeds 10 times faster than 5G. Researchers believe this technology will enable new applications in telemedicine, autonomous systems, and augmented reality.',
                userId: 11,
                source: 'Telecom Innovation',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/6g-wireless'
            },
            {
                id: 12,
                title: '🔬 Carbon Capture Technology Reaches Commercial Viability',
                body: 'New carbon capture method reduces costs by 70% compared to previous technologies, making large-scale deployment economically feasible. This breakthrough could significantly impact efforts to combat climate change.',
                userId: 12,
                source: 'Environmental Tech',
                publishedAt: new Date().toISOString(),
                url: 'https://example.com/carbon-capture'
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