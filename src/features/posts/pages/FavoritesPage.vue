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

  methods:{
    handleRemoveFavorite(postId) {
      this.$store.commit("post/removeFavorite", postId);
    }
  }
};
</script>

<style scoped>
.favorites-page {
  padding: clamp(1.25rem, 1rem + 1.25vw, 2.5rem);
 max-width: 1200px;
  margin: 0 auto;
}

.favorites-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.favorites-page__back {
  text-decoration: none;
  color: var(--color-primary-600);
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.favorites-page__back:hover {
  color: var(--color-primary-800);
}

.favorites-page__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
  color: var(--color-neutral-900);
}

.favorites-page__count {
  background: var(--color-primary-600);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-full);
  font-weight: var(--font-weight-medium);
}

.favorites-page__main {
  margin-top: var(--spacing-lg);
}

.favorites-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-lg);
  color: var(--color-neutral-500);
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.favorites-page__empty-icon {
  color: var(--color-neutral-300);
  margin-bottom: var(--spacing-md);
}

.favorites-page__empty h2 {
  color: var(--color-neutral-800);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-2xl);
}

.favorites-page__empty p {
  margin-bottom:var(--spacing-lg);
  color: var(--color-neutral-600);
}

.dark-theme .favorites-page__header {
  border-bottom: 1px solid var(--color-border);
}

.dark-theme .favorites-page__back {
  color: var(--color-primary-400);
}

.dark-theme .favorites-page__back:hover {
  color: var(--color-primary-300);
}

.dark-theme .favorites-page__title{
  color: var(--color-neutral-100);
}

.dark-theme .favorites-page__empty {
  background: var(--color-card-background);
  color: var(--color-neutral-400);
}

.dark-theme .favorites-page__empty h2 {
  color: var(--color-neutral-200);
}

.dark-theme .favorites-page__empty-icon {
  color: var(--color-neutral-600);
}

@media (max-width: 768px) {
  .favorites-page__header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .favorites-page__title {
    font-size: var(--font-size-2xl);
  }
}
</style>
