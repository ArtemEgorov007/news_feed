import {postActions} from './actions.js';
import {postMutations} from './mutations.js';
import {postGetters} from './getters.js';

export const postModule = {
    namespaced: true,

    state: () => ({
        posts: [],
        localPosts: [],
        favorites: [], // Added favorites array
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
            {value: "body", name: "By description"},
            {value: "id", name: "By ID"}
        ],
        fallbackPosts: [
            {
                id: 1,
                title: '🌍 Global Summit Addresses Climate Change Challenges',
                body: 'World leaders gather to discuss innovative solutions for reducing carbon emissions and promoting sustainable development worldwide.',
                userId: 1,
                source: 'Global News Network',
                publishedAt: new Date().toISOString()
            },
            {
                id: 2,
                title: '🏥 Medical Breakthrough in Cancer Treatment Research',
                body: 'Scientists announce promising results from clinical trials of a new immunotherapy approach that could revolutionize cancer treatment.',
                userId: 2,
                source: 'Health Science Journal',
                publishedAt: new Date().toISOString()
            },
            {
                id: 3,
                title: '🎓 Education Initiative Launches to Bridge Digital Divide',
                body: 'Non-profit organization partners with tech companies to provide underprivileged students with devices and internet access for remote learning.',
                userId: 3,
                source: 'Education Today',
                publishedAt: new Date().toISOString()
            }
        ]
    }),

    getters: postGetters,

    mutations: postMutations,

    actions: postActions
};