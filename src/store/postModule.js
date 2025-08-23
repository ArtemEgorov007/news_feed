import axios from "axios";

export const postModule = {
    namespaced: true,

    state: () => ({
        posts: [],
        localPosts: [],
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
                title: '🤔 Where are the posts?',
                body: 'Looks like the server decided to take a short break. While it’s resting, enjoy this placeholder!',
                userId: 1
            },
            {
                id: 2,
                title: '📡 Connection lost',
                body: 'We couldn’t reach the API this time. Don’t worry — the app is still running in limited mode.',
                userId: 2
            },
            {
                id: 3,
                title: '🕒 Try again later',
                body: 'The data is temporarily unavailable. Most likely it won’t take long — refresh the page in a few minutes.',
                userId: 3
            }
        ]
    }),

    getters: {
        allPosts(state) {
            return [...state.localPosts, ...state.posts];
        },

        sortedPosts(state, getters) {
            const key = state.selectedSort;
            if (!key) return getters.allPosts;

            return [...getters.allPosts].sort((a, b) => {
                const valA = a[key];
                const valB = b[key];
                return typeof valA === 'number' && typeof valB === 'number'
                    ? valA - valB
                    : String(valA).localeCompare(String(valB), undefined, {numeric: true});
            });
        },

        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        }
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts.map(p => ({
                ...p,
                pinned: false
            }));
        },

        addPosts(state, newPosts) {
            const mapped = newPosts.map(p => ({
                ...p,
                id: Date.now() + Math.floor(Math.random() * 10000),
                pinned: false
            }));
            state.posts = [...state.posts, ...mapped];
        },

        addLocalPost(state, post) {
            state.localPosts.push({
                ...post,
                pinned: false
            });
        },

        removePost(state, postId) {
            state.posts = state.posts.filter(p => p.id !== postId);
            state.localPosts = state.localPosts.filter(p => p.id !== postId);
        },

        updatePost(state, updatedPost) {
            const index = state.localPosts.findIndex(p => p.id === updatedPost.id);
            if (index !== -1) {
                updatedPost.pinned = state.localPosts[index].pinned;
                state.localPosts[index] = {...state.localPosts[index], ...updatedPost};
            }

            const indexGlobal = state.posts.findIndex(p => p.id === updatedPost.id);
            if (indexGlobal !== -1) {
                updatedPost.pinned = state.posts[indexGlobal].pinned;
                state.posts[indexGlobal] = {...state.posts[indexGlobal], ...updatedPost};
            }
        },

        setLoading(state, value) {
            state.isPostsLoading = value;
        },

        setPage(state, value) {
            state.page = value;
        },

        setSelectedSort(state, value) {
            state.selectedSort = value;
        },

        setSearchQuery(state, value) {
            state.searchQuery = value;
        },

        setTotalPages(state, value) {
            state.totalPages = value;
        },

        setShowScrollTop(state, value) {
            state.showScrollTop = value;
        },

        setError(state, value) {
            state.error = value;
        },

        togglePin(state, postId) {
            const post = [...state.localPosts, ...state.posts].find(p => p.id === postId);
            if (post) {
                post.pinned = !post.pinned;
            }
        }
    },

    actions: {
        async fetchPosts({state, commit}) {
            if (state.isPostsLoading) return;

            commit('setLoading', true);
            commit('setError', null);
            commit('setPage', 1);

            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {_page: state.page, _limit: state.limit}
                });

                const total = parseInt(response.headers['x-total-count'], 10);
                commit('setTotalPages', Math.ceil(total / state.limit));
                commit('setPosts', response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                commit('setError', error.message);
                commit('setPosts', state.fallbackPosts);
            } finally {
                commit('setLoading', false);
            }
        },

        async loadMorePosts({state, commit}) {
            if (state.isPostsLoading || state.page >= state.totalPages) return;

            commit('setLoading', true);
            commit('setPage', state.page + 1);

            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {_page: state.page, _limit: state.limit}
                });

                const total = parseInt(response.headers['x-total-count'], 10);
                commit('setTotalPages', Math.ceil(total / state.limit));
                commit('addPosts', response.data);
            } catch (error) {
                console.error('Error loading more posts:', error);
                commit('setError', error.message);
            } finally {
                commit('setLoading', false);
            }
        }
    }
};
