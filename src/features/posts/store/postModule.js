import{postActions} from './actions.js';
import {postMutations} from './mutations.js';
import {postGetters} from './getters.js';

export const postModule = {
    namespaced: true,

    state: () => ({
        posts: [],
        localPosts: [],
        favorites: [], // Addedfavorites array
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        showScrollTop: false,
        error: null,
        sortOptions: [
            {value: "", name: "No sorting"},
            {value: "title", name: "By title"},
            {value: "body", name: "By description"}
],
       fallbackPosts: [
            {
                id: 1,
                title: '🚀 Breakthrough in Quantum Computing Achieved',
                body: 'Scientists demonstrate quantum supremacy with new 128-qubit processor, paving the way for revolutionary advances in cryptography and drug discovery.',
                userId: 1,
                source: 'Tech Science Journal',
                publishedAt: new Date().toISOString(),
                url: '#'
            },
            {
                id: 2,
                title: '🤖 AI Assistant Surpasses Human Performance in Coding Tasks',
                body: 'New language model shows exceptional ability to generate, debug, and optimize code across multiple programming languages with near-perfect accuracy.',
                userId: 2,
                source: 'AI Research Daily',
                publishedAt: new Date().toISOString(),
                url: '#'
            },
            {
                id: 3,
                title: '🌐 Next-Gen Internet Protocol Deployment Accelerates',
                body: 'IPv6 adoption reaches 75% globally as organizations migrate to the new standard, promising enhanced security and unlimited address space.',
                userId: 3,
                source: 'Network World',
                publishedAt: new Date().toISOString(),
                url: '#'
            },
            {
                id: 4,
                title: '🔋 Solid-State Battery Technology Promises 10-Minute Charging',
                body: 'Revolutionary battery design offers 500-mile range electric vehicles with charging times comparable to filling a gas tank.',
                userId: 4,
                source: 'Energy Tech Review',
                publishedAt: new Date().toISOString(),
                url: '#'
            },
            {
                id: 5,
                title: '📱 Foldable Smartphone Market Expands with New Competitors',
                body: 'Three major manufacturers announce next-generation foldable devices with improved durability and innovative form factors.',
                userId: 5,
                source: 'Mobile Tech Today',
                publishedAt: new Date().toISOString(),
                url: '#'
            },
            {
                id: 6,
                title: '☁️ Edge Computing Reduces Latency to Near Zero',
                body: 'Distributed computing architecture brings data processing closer to end users, enabling real-time applications like autonomous vehicles.',
                userId: 6,
                source: 'Cloud Computing Weekly',
                publishedAt: new Date().toISOString(),
                url: '#'
            },
            {
                id: 7,
                title: '🔒 Post-Quantum Cryptography Standard Announced',
                body: 'NIST selects CRYSTALS-Kyber as the new encryption standard to protect against future quantum computer attacks.',
                userId: 7,
                source: 'Cybersecurity Magazine',
                publishedAt: new Date().toISOString(),
                url: '#'
            },
            {
                id: 8,
                title: '🎮 Virtual Reality Achieves Photorealistic Visuals',
                body: 'New VR headset with eye-tracking and foveated rendering delivers cinema-quality graphics while reducing hardware requirements.',
                userId: 8,
                source: 'VR Gaming Network',
                publishedAt: new Date().toISOString(),
                url: '#'
            }
        ]
    }),

    getters: postGetters,

    mutations: postMutations,

    actions: postActions
};