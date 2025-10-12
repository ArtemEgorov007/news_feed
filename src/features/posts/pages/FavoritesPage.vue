<template>
  <div class="favorites-page">
    <header class="favorites-page__header">
      <router-link to="/posts" class="favorites-page__back">
        ← Back to Posts
      </router-link>
      <h1 class="favorites-page__title">Favorite Posts</h1>
      <div class="favorites-page__count">
        {{ favorites.length }} {{ favorites.length === 1 ? 'post' : 'posts' }}
      </div>
    </header>

    <main class="favorites-page__main">
      <div v-if="favorites.length === 0" class="favorites-page__empty">
        <Icon icon="mdi:heart-outline" width="64" height="64" class="favorites-page__empty-icon"/>
        <h2>No Favorite Posts Yet</h2>
        <p>Click the heart icon on posts to add them to your favorites</p>
        <my-button @click="$router.push('/posts')" variant="primary">
          Browse Posts
        </my-button>
      </div>

      <post-list
          v-else
          :posts="favorites"
          @delete="handleRemoveFavorite"
      />
    </main>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {PostList} from "@/features/posts/components";
import {Icon} from "@iconify/vue";

export default {
  name: "FavoritesPage",
  components: {PostList, Icon},

  computed: {
    ...mapState("post", ["favorites"])
  },

  methods: {
    handleRemoveFavorite(postId) {
      this.$store.commit("post/removeFavorite", postId);
    }
  }
};
</script>

<style lang="sass" scoped>
.favorites-page
  padding: clamp(1.25rem, 1rem + 1.25vw, 2.5rem)

.favorites-page__header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 30px
  padding-bottom: 20px
  border-bottom: 1px solid #eee
  flex-wrap: wrap
  gap: 15px

.favorites-page__back
  text-decoration: none
  color: #1d4ed8
  font-weight: 500
  transition: color 0.2s ease

  &:hover
    color: #1e3a8a

.favorites-page__title
  font-size: 2rem
  font-weight: 600
  margin: 0
  text-align: center

.favorites-page__count
  background: #1e3a8a
  color: white
  padding: 5px 15px
  border-radius: 20px
  font-weight: 500

.favorites-page__main
  margin-top: 30px

.favorites-page__empty
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  text-align: center
  padding: 60px 20px
  color: #666

.favorites-page__empty-icon
  color: #ccc
  margin-bottom: 20px

.favorites-page__empty h2
  color: #333
  margin-bottom: 10px

.favorites-page__empty p
  margin-bottom: 30px

.dark-theme .favorites-page__header
  border-bottom: 1px solid var(--color-border)

.dark-theme .favorites-page__back
  color: var(--color-primary-400)

.dark-theme .favorites-page__back:hover
  color: var(--color-primary-300)

.dark-theme .favorites-page__empty
  color: var(--color-neutral-400)

.dark-theme .favorites-page__empty h2
  color: var(--color-neutral-200)

.dark-theme .favorites-page__empty-icon
  color: var(--color-neutral-600)
</style>
