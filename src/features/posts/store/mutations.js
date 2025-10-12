export const postMutations = {
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
    },

    // Added mutations for favorites functionality
    addFavorite(state, post) {
        // Check if post is already in favorites
        const isAlreadyFavorite = state.favorites.some(fav => fav.id === post.id);
        if (!isAlreadyFavorite) {
            state.favorites.push({...post});
        }
    },

    removeFavorite(state, postId) {
        state.favorites = state.favorites.filter(post => post.id !== postId);
    },

    setFavorites(state, favorites) {
        state.favorites = favorites;
    }
};