export const postMutations = {
    setPosts(state, posts) {
        state.posts = posts.map(p => ({
            ...p,
            pinned: p.pinned || false
        }));
    },

    addPosts(state, newPosts) {
        const mapped = newPosts.map(p => ({
            ...p,
            pinned: p.pinned || false
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
    },

    // Added mutations for favorites functionality
    addFavorite(state, post) {
        // Check if post is already in favorites
        const isAlreadyFavorite = state.favorites.some(fav => fav.id === post.id);
        if (!isAlreadyFavorite) {
            // Create a deep copy to avoid reference issues
           state.favorites.push(JSON.parse(JSON.stringify(post)));
       }
    },

    removeFavorite(state, postId) {
        state.favorites = state.favorites.filter(post => post.id !== postId);
    },

    setFavorites(state, favorites) {
        state.favorites = favorites;
    }
};