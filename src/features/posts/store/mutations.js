export const postMutations = {
    setPosts(state, posts) {
        // Added safety check for posts parameter
        if (!Array.isArray(posts)) {
            state.posts = [];
            return;
        }
        
        state.posts = posts.map(p => ({
            ...p,
            pinned: p.pinned || false
        }));
    },

    addPosts(state, newPosts) {
        // Added safety check for newPosts parameter
        if (!Array.isArray(newPosts)) return;
        
        const mapped = newPosts.map(p => ({
            ...p,
            pinned: p.pinned || false
        }));
        state.posts = [...state.posts, ...mapped];
    },

    addLocalPost(state, post) {
        // Added safety check for post parameter
        if (!post) return;
        
        state.localPosts.push({
            ...post,
            pinned: false
        });
    },

    removePost(state, postId) {
        // Added safety checks for arrays
        if (!Array.isArray(state.posts)) state.posts = [];
        if (!Array.isArray(state.localPosts)) state.localPosts = [];
        
        state.posts = state.posts.filter(p => p.id !== postId);
        state.localPosts = state.localPosts.filter(p => p.id !== postId);
    },

    setLoading(state, value) {
        state.isPostsLoading = Boolean(value);
    },

    setPage(state, value) {
        state.page = Number(value) || 1;
    },

    setSelectedSort(state, value) {
        state.selectedSort = value || '';
    },

    setSearchQuery(state, value) {
        state.searchQuery = value || '';
    },

    setTotalPages(state, value) {
        state.totalPages = Number(value) || 0;
    },

    setShowScrollTop(state, value) {
        state.showScrollTop = Boolean(value);
    },

    setError(state, value) {
        state.error = value || null;
    },

    togglePin(state, postId) {
        // Added safety checks
        if (!postId) return;
        
        const allPosts = [...(state.localPosts || []), ...(state.posts || [])];
        const post = allPosts.find(p => p.id === postId);
        if (post) {
            post.pinned = !post.pinned;
        }
    },

    // Added mutations for favorites functionality
    addFavorite(state, post) {
        // Added safety checks
        if (!post || !post.id) return;
        
        // Check if post is already in favorites
        const favorites = state.favorites || [];
        const isAlreadyFavorite = favorites.some(fav => fav.id === post.id);
        if (!isAlreadyFavorite) {
            // Create a deep copy to avoid reference issues
            state.favorites.push(JSON.parse(JSON.stringify(post)));
        }
    },

    removeFavorite(state, postId) {
        // Added safety check
        if (!postId) return;
        
        const favorites = state.favorites || [];
        state.favorites = favorites.filter(post => post.id !== postId);
    },

    setFavorites(state, favorites) {
        state.favorites = Array.isArray(favorites) ? favorites : [];
    }
};