export const postGetters = {
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
            post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
    }
};
