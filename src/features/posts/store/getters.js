export const postGetters = {
    allPosts(state) {
        // Added safety checks for arrays
        const localPosts = Array.isArray(state.localPosts) ? state.localPosts : [];
        const posts = Array.isArray(state.posts) ? state.posts : [];
        return [...localPosts, ...posts];
    },

    sortedPosts(state, getters) {
        const key = state.selectedSort;
        // Added safety check
        const allPosts = getters.allPosts || [];
        
        if (!key) return allPosts;

        return [...allPosts].sort((a, b) => {
            // Added safety checks for properties
            const valA = a[key];
            const valB = b[key];
            
            // Handle undefined values
            if (valA === undefined && valB === undefined) return 0;
            if (valA === undefined) return 1;
            if (valB === undefined) return -1;
            
            return typeof valA === 'number' && typeof valB === 'number'
                ? valA - valB
                : String(valA).localeCompare(String(valB), undefined, {numeric: true});
        });
    },

    sortedAndSearchedPosts(state, getters) {
        // Added safety checks
        const sortedPosts = getters.sortedPosts || [];
        const searchQuery = state.searchQuery || '';
        
        if (!searchQuery) return sortedPosts;
        
        return sortedPosts.filter(post => {
            // Added safety checks for post properties
            const title = post.title || '';
            const body = post.body || '';
            const query = searchQuery.toLowerCase();
            
            return title.toLowerCase().includes(query) || 
                   body.toLowerCase().includes(query);
        });
    }
};