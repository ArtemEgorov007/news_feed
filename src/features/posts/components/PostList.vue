<template>
  <div class="post-list">
    <div class="post-list__container">
      <post-item
          v-for="element in sortedPosts"
          :key="element.id"
          :post="element"
          @delete="$emit('delete', element.id)"
          @pin="togglePin"
      />
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import {PostItem} from "@/features/posts/components";

export default {
  name: "PostList",
  components: {PostItem},

  props: {
    posts: {type: Array, required: true},
  },

  emits: ["delete"],

  data() {
    return {
      isMobile: window.innerWidth <= 768,
    };
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });
    },
  },

  methods: {
    ...mapMutations("post", ["togglePin"]),

    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
};
</script>

<style scoped>
.post-list {
  max-width: 1400px;
  margin: var(--spacing-lg) auto;
}

.post-list__title {
  text-align: center;
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing:-0.02em;
}

.post-list__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-sm);
}

.post-list__empty {
  text-align:center;
  padding: var(--spacing-2xl) var(--spacing-lg);
  background: var(--color-neutral-50);
  border-radius: var(--border-radius-lg);
  margin: var(--spacing-lg) auto;
  max-width: 600px;
  box-shadow: var(--shadow-md);
}

.post-list__empty-title {
  color: var(--color-neutral-600);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xl);
}

.post-list__item {
  position: relative;
  height: 100%;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.post-list__item:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.dark-theme .post-list__empty {
  background: var(--color-card-background);
}

.dark-theme .post-list__title {
  color: var(--color-neutral-100);
}

.dark-theme .post-list__empty-title {
  color: var(--color-neutral-400);
}

@media (max-width: 768px) {
  .post-list__container {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-md);
  }
  
  .post-list__title {
    font-size: var(--font-size-2xl);
  }
}

@media (max-width: 480px) {
  .post-list__container {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .post-list__item {
    min-height: 260px;
  }

  .post-list__title {
    font-size: var(--font-size-xl);
  }
}
</style>