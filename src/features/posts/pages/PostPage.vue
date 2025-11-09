<template>
  <div class="posts-page">
    <header class="posts-page__header">
      <div class="posts-page__header-content">
        <div class="posts-page__header-left">
          <h1 class="posts-page__title">Latest Posts</h1>
          <router-link to="/favorites" class="posts-page__favorites-link">
            <Icon icon="mdi:heart" width="20" height="20"/>
            <span>Favorites ({{ favoritesCount }})</span>
          </router-link>
        </div>

        <div class="posts-page__search-container">
          <my-input
              :value="searchQuery"
              @input="handleSearchQueryChange"
              placeholder="Search posts..."
              size="medium"
              class="posts-page__search"
          />
        </div>
      </div>

      <div class="posts-page__actions">
        <div class="posts-page__controls">
          <my-button
              :disabled="isPostsLoading"
              variant="secondary"
              @click="fetchPosts"
              class="posts-page__button"
          >
            <Icon
                :icon="isPostsLoading ? 'mdi:loading' : 'mdi:reload'"
                width="20"
                height="20"
                :class="{'posts-page__refresh-icon--spinning': isPostsLoading}"
            />
            <span>{{ isPostsLoading ? 'Loading...' : 'Refresh' }}</span>
          </my-button>

          <my-select
              :value="selectedSort"
              @update:value="handleSortChange"
              :options="sortOptions"
              placeholder="Sort by"
          />
        </div>
      </div>
    </header>

    <main class="posts-page__main">
      <div v-if="isPostsLoading && page === 1" class="posts-page__loading">
        <!-- Show skeleton loaders when first page is loading -->
        <div class="skeleton-post" v-for="i in 5" :key="i">
          <div class="skeleton-title"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-meta">
            <div class="skeleton-meta-item"></div>
            <div class="skeleton-meta-item"></div>
          </div>
        </div>
      </div>

      <div v-else-if="sortedAndSearchedPosts.length === 0 && !isPostsLoading" class="posts-page__empty">
        <Icon icon="mdi:file-document-outline" width="64" height="64" class="posts-page__empty-icon"/>
        <h3 class="posts-page__empty-title">No posts found</h3>
        <p class="posts-page__empty-description">Try changing your search or check back later</p>
      </div>

      <post-list
          v-else
          :posts="sortedAndSearchedPosts"
          @delete="deletePost"
      />

      <div v-if="isPostsLoading && page > 1" class="posts-page__loading-more">
        <div class="loading-spinner"></div>
        <p>Loading more posts...</p>
      </div>

      <div v-intersection="loadMorePosts" class="posts-page__observer-target"></div>

      <div v-if="error" class="error-message">
        <Icon icon="mdi:alert-circle" width="24" height="24"/>
        <div>
          <p><strong>Unable to load data from the server.</strong></p>
          <p>We're displaying sample data while we resolve this issue. Please try again later.</p>
          <p v-if="isGithubPages">Note: API access is restricted on GitHub Pages for security reasons.</p>
        </div>
      </div>
    </main>

    <transition name="fade">
      <my-button
          v-show="showScrollTop"
          class="posts-page__scroll-top"
          @click="scrollToTop"
          title="Back to top"
      >
        <Icon icon="mdi:arrow-up" width="24" height="24"/>
      </my-button>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { Icon } from "@iconify/vue";
import { PostList } from "@/features/posts/components";

export default {
  name: "GlobalPost",
  components: { PostList, Icon },

  computed: {
    ...mapState("post", [
      "isPostsLoading",
      "selectedSort",
      "searchQuery",
      "page",
      "limit",
      "totalPages",
      "sortOptions",
      "showScrollTop",
      "error",
      "favorites"
    ]),
    ...mapGetters("post", ["sortedAndSearchedPosts"]),

    favoritesCount() {
      return this.favorites.length;
    },
    
    isGithubPages() {
      return window.location.hostname.includes('github.io');
    }
  },

  methods: {
    ...mapMutations("post", [
      "setSearchQuery",
      "setSelectedSort",
      "setShowScrollTop",
      "removePost"
    ]),

    ...mapActions("post", ["loadMorePosts", "fetchPosts"]),

    deletePost(postId) {
      this.removePost(postId);
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    handleScroll() {
      this.setShowScrollTop(window.scrollY > 500);
    },
    
    // Add methods to handle search and sort changes
    handleSearchQueryChange(value) {
      this.setSearchQuery(value);
    },
    
    handleSortChange(value) {
      this.setSelectedSort(value);
    }
  },

  mounted() {
    this.fetchPosts();
    window.addEventListener("scroll", this.handleScroll);
    
    // Focus the search input when page loads
    this.$nextTick(() => {
      const searchInput = document.querySelector('.posts-page__search input');
      if (searchInput) {
        searchInput.focus();
      }
    });
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.posts-page {
  padding: 0;
  max-width: 1400px;
  margin: 0 auto;
}

.posts-page__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 32px;
  margin-bottom: 32px;
  color: white;
}

.dark-theme .posts-page__header {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.posts-page__header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 24px;
}

@media (max-width: 768px) {
  .posts-page__header {
    padding: 24px;
  }
  
  .posts-page__header-content {
    flex-direction: column;
    align-items: stretch;
  }
}

.posts-page__header-left {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.posts-page__title {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.posts-page__favorites-link {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 20px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.posts-page__favorites-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.posts-page__search-container {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.posts-page__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

@media (max-width: 768px) {
  .posts-page__actions {
    flex-direction: column;
    align-items: stretch;
  }
}

.posts-page__controls {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .posts-page__controls {
    flex-direction: column;
    align-items: stretch;
  }
}

.posts-page__button {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.posts-page__button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.posts-page__button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.posts-page__refresh-icon--spinning {
  animation: spin 1s linear infinite;
}

.posts-page__main {
  margin-top: 32px;
}

.posts-page__loading,
.posts-page__loading-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.posts-page__loading-more {
  padding: 40px 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 24px;
}

.loading-text {
  color: var(--color-neutral-600);
  font-size: 18px;
  font-weight: 500;
}

.posts-page__observer-target {
  height: 20px;
}

.posts-page__scroll-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  background: var(--color-primary-500);
  color: white;
  border: none;
}

.posts-page__scroll-top:hover {
  background: var(--color-primary-600);
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.posts-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.posts-page__empty-icon {
  color: var(--color-neutral-300);
  margin-bottom: 24px;
  width: 80px;
  height: 80px;
}

.posts-page__empty-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-neutral-800);
  margin-bottom: 16px;
}

.posts-page__empty-description {
  color: var(--color-neutral-600);
  margin-bottom: 32px;
  font-size: 18px;
  max-width: 500px;
}

.error-message {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border: 1px solid #ffcc80;
  color: #e65100;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 32px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.dark-theme .error-message {
  background: linear-gradient(135deg, #3e2723 0%, #4e342e 100%);
  border: 1px solid #6d4c41;
  color: #ffcc80;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Add skeleton loading styles */
.skeleton-post {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-bottom: 24px;
  animation: pulse 1.5s ease-in-out infinite alternate;
  border: 1px solid var(--color-neutral-100);
}

.dark-theme .skeleton-post {
  background: var(--color-card-background);
  border: 1px solid var(--color-neutral-800);
}

@keyframes pulse {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}

.skeleton-title {
  height: 24px;
  background: linear-gradient(90deg, var(--color-neutral-200) 25%, var(--color-neutral-300) 50%, var(--color-neutral-200) 75%);
  border-radius: 8px;
  margin-bottom: 20px;
  width: 70%;
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-text {
  height: 16px;
  background: linear-gradient(90deg, var(--color-neutral-200) 25%, var(--color-neutral-300) 50%, var(--color-neutral-200) 75%);
  border-radius: 8px;
  margin-bottom: 12px;
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-text:last-child {
  width: 50%;
  margin-bottom: 24px;
}

.skeleton-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--color-neutral-100);
}

.dark-theme .skeleton-meta {
  border-top: 1px solid var(--color-neutral-800);
}

.skeleton-meta-item {
  height: 16px;
  background: linear-gradient(90deg, var(--color-neutral-200) 25%, var(--color-neutral-300) 50%, var(--color-neutral-200) 75%);
  border-radius: 8px;
  width: 30%;
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 768px) {
  .posts-page__header {
    padding: 24px;
  }

  .posts-page__header-left {
    flex-direction: column;
    align-items: flex-start;
  }

  .posts-page__search-container {
    min-width: auto;
  }

  .posts-page__actions {
    flex-direction: column;
  }

  .posts-page__controls {
    width: 100%;
  }

  .posts-page__button {
    justify-content: center;
    width: 100%;
  }
  
  .posts-page__title {
    font-size: 28px;
  }
}
</style>