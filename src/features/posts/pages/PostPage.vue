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
              v-focus
              :model-value="searchQuery"
              @update:model-value="setSearchQuery"
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
              :model-value="selectedSort"
              :options="sortOptions"
              @update:model-value="setSelectedSort"
              placeholder="Sort by"
          />
        </div>

        <my-button
            :disabled="isPostsLoading"
            variant="primary"
            @click="dialogVisible = true"
            class="posts-page__button posts-page__button--new"
        >
          <Icon icon="mdi:plus" width="20" height="20"/>
          <span>New Post</span>
        </my-button>
      </div>
    </header>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" class="posts-page__form"/>
    </my-dialog>

    <main class="posts-page__main">
      <div v-if="isPostsLoading && page === 1" class="posts-page__loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading posts...</p>
      </div>

      <div v-else-if="sortedAndSearchedPosts.length === 0 && !isPostsLoading" class="posts-page__empty">
        <Icon icon="mdi:file-document-outline" width="64" height="64" class="posts-page__empty-icon"/>
        <h3 class="posts-page__empty-title">No posts found</h3>
        <p class="posts-page__empty-description">Try changing your search or create a new post</p>
        <my-button @click="dialogVisible = true" variant="primary">
          <Icon icon="mdi:plus" width="20" height="20"/>
          <span>Create Post</span>
        </my-button>
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
        <p>Unable to load data from the server. Test data is displayed.</p>
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
import {mapState, mapActions, mapGetters, mapMutations} from "vuex";

import {Icon} from "@iconify/vue";

import {PostForm, PostList} from "@/features/posts/components";

export default {
  name: "GlobalPost",

  components: {PostForm, PostList, Icon},

  data: () => ({
    dialogVisible: false
  }),

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

    createPost(post) {
      this.$store.commit("post/addLocalPost", post);
      this.dialogVisible = false;
    },

    deletePost(postId) {
      this.removePost(postId);
    },

    scrollToTop() {
      window.scrollTo({top: 0, behavior: "smooth"});
    },

    handleScroll() {
      this.setShowScrollTop(window.scrollY > 500);
    }
  },

  mounted() {
    this.fetchPosts();
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.posts-page {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.posts-page__header {
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.dark-theme .posts-page__header {
  background: var(--color-card-background);
}

.posts-page__header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .posts-page__header-content {
    flex-direction: column;
    align-items: stretch;
  }
}

.posts-page__header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.posts-page__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  margin: 0;
}

.posts-page__favorites-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: var(--color-neutral-100);
  color: var(--color-neutral-700);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-full);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
}

.posts-page__favorites-link:hover {
  background: var(--color-neutral-200);
  color: var(--color-neutral-900);
}

.posts-page__search-container {
  flex: 1;
  min-width: 250px;
}

.posts-page__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .posts-page__actions {
    flex-direction: column;
    align-items: stretch;
  }
}

.posts-page__controls {
  display: flex;
  gap: var(--spacing-md);
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
  gap: var(--spacing-xs);
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.posts-page__button--new {
  box-shadow: var(--shadow-md);
}

.posts-page__button--new:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.posts-page__refresh-icon--spinning {
  animation: spin 1s linear infinite;
}

.posts-page__main {
  margin-top: var(--spacing-lg);
}

.posts-page__loading,
.posts-page__loading-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.posts-page__loading-more {
  padding: 30px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-neutral-200);
  border-top: 4px solid var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-text {
  color: var(--color-neutral-600);
  font-size: var(--font-size-lg);
}

.posts-page__observer-target {
  height: 20px;
}

.posts-page__scroll-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  border-radius: var(--border-radius-full);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-fast);
}

.posts-page__scroll-top:hover {
  background: var(--color-primary-600);
  color: white;
  transform: translateY(-3px);
}

.posts-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl) var(--spacing-lg);
  text-align: center;
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.posts-page__empty-icon {
  color: var(--color-neutral-300);
  margin-bottom: var(--spacing-md);
}

.posts-page__empty-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-800);
  margin-bottom: var(--spacing-sm);
}

.posts-page__empty-description {
  color: var(--color-neutral-600);
  margin-bottom: var(--spacing-lg);
}

.error-message {
  background-color: var(--color-warning-50);
  border: 1px solid var(--color-warning-200);
  color: var(--color-warning-800);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity var(--transition-normal);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .posts-page__header {
    padding: var(--spacing-md);
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
}
</style>