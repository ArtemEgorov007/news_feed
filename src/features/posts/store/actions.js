import newsService from "@/features/posts/services/newsService.js";

export const postActions = {
    async fetchPosts({state, commit}) {
        if (state.isPostsLoading) return;

        commit('setLoading', true);
        commit('setError', null);
        commit('setPage', 1);

        try {
            // Using our news service to fetch general news
            const newsData = await newsService.fetchTopHeadlines(
                state.page, 
                state.limit
            );

            commit('setTotalPages', Math.ceil(newsData.totalResults / state.limit));
            commit('setPosts', newsData.articles);
        } catch (error) {
            console.error('Error fetching general news:', error);
            commit('setError', error.message);
            // Show fallback posts if API fails
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
            // Load more general news
            const newsData = await newsService.fetchTopHeadlines(
                state.page, 
                state.limit
            );

            commit('setTotalPages', Math.ceil(newsData.totalResults / state.limit));
            commit('addPosts', newsData.articles);
        } catch (error) {
            console.error('Error loading more general news:', error);
            commit('setError', error.message);
        } finally {
            commit('setLoading', false);
        }
    }
};