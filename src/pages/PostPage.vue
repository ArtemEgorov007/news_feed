<template>
  <div class="global-post">
    <header class="global-post__header">
      <router-link to="/" class="global-post__title">
        Vuex for post
      </router-link>

      <my-input
          v-focus
          :model-value="searchQuery"
          @update:model-value="setSearchQuery"
          placeholder="Поиск..."
          size="medium"
          class="global-post__search"
      />

      <div class="global-post__actions">
        <div class="global-post__controls">
          <my-button
              :disabled="isPostsLoading"
              variant="secondary"
              @click="fetchPosts"
              class="global-post__button"
          >
            {{ isPostsLoading ? 'Loading...' : 'Give a posts' }}
          </my-button>

          <my-select
              :model-value="selectedSort"
              :options="sortOptions"
              @update:model-value="setSelectedSort"
          />
        </div>

        <my-button
            :disabled="isPostsLoading"
            variant="primary"
            @click="dialogVisible = true"
            class="global-post__button global-post__button--icon"
        >
          <span>My post</span>
          <Icon icon="line-md:downloading-loop" width="24" height="24"/>
        </my-button>
      </div>
    </header>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" class="global-post__form"/>
    </my-dialog>

    <main class="global-post__main">
      <div v-if="isPostsLoading && page === 1" class="global-post__loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading posts...</p>
      </div>

      <post-list
          v-else
          :posts="sortedAndSearchedPosts"
          @delete="deletePost"
      />

      <div v-if="isPostsLoading && page > 1" class="global-post__loading-more">
        <div class="loading-spinner"></div>
        <p>Loading more posts...</p>
      </div>

      <div v-intersection="loadMorePosts" class="global-post__observer-target"></div>

      <div v-if="error" class="error-message">
        <p>Unable to load data from the server. Test data is displayed.</p>
      </div>
    </main>

    <transition name="fade">
      <my-button
          v-show="showScrollTop"
          class="global-post__scroll-top"
          @click="scrollToTop"
      >
        ↑
      </my-button>
    </transition>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from "vuex";

import {Icon} from "@iconify/vue";

import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

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
      "error"
    ]),
    ...mapGetters("post", ["sortedAndSearchedPosts"])
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

<style lang="sass" scoped>
.global-post
  padding: clamp(1.25rem, 1rem + 1.25vw, 2.5rem)

.global-post__header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 30px
  padding-bottom: 20px
  border-bottom: 1px solid #eee
  flex-wrap: wrap
  gap: 15px

.global-post__title
  font-size: 2rem
  font-weight: 600
  text-decoration: none
  color: inherit
  transition: color 0.2s ease

  &:hover
    color: #4CAF50

.global-post__search
  flex: 1
  min-width: 200px

.global-post__actions
  display: flex
  gap: 20px
  align-items: center
  flex-wrap: wrap

.global-post__controls
  display: flex
  gap: 10px
  align-items: center
  flex-wrap: wrap

.global-post__button
  white-space: nowrap
  transition: all 0.2s ease

.global-post__button--icon
  display: flex
  align-items: center
  gap: 6px

.global-post__main
  margin-top: 30px

.global-post__loading,
.global-post__loading-more
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 60px 20px

.global-post__loading-more
  padding: 30px 20px

.loading-spinner
  width: 40px
  height: 40px
  border: 4px solid #f3f3f3
  border-top: 4px solid #4CAF50
  border-radius: 50%
  animation: spin 1s linear infinite
  margin-bottom: 20px

.loading-text
  color: #666
  font-size: 1.2rem

.global-post__observer-target
  height: 20px

.global-post__scroll-top
  position: fixed
  bottom: 100px
  right: 20px
  z-index: 1000
  border-radius: 50%
  width: 50px
  height: 50px
  display: flex
  align-items: center
  justify-content: center
  font-size: 1.2rem
  transition: background 0.2s ease

  &:hover
    background: #4CAF50
    color: #fff

.error-message
  background-color: #fff3cd
  border: 1px solid #ffeaa7
  color: #856404
  padding: 15px
  border-radius: 4px
  margin-bottom: 20px

.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s ease

.fade-enter-from, .fade-leave-to
  opacity: 0

@keyframes spin
  to
    transform: rotate(360deg)
</style>
