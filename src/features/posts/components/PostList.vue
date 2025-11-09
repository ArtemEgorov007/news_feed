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
    posts: {type: Array,required: true},
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
      //Added safety check for posts array
      if (!Array.isArray(this.posts)) return [];
      
      return [...this.posts].sort((a, b) => {
        // Added safety checks for pinned property
        const aPinned = a.pinned|| false;
        const bPinned = b.pinned || false;
if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;
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
  margin: 32px auto;
  padding: 0 16px;
}

.post-list__title {
  text-align: center;
  color: var(--color-neutral-900);
  margin-bottom: 32px;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.post-list__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  padding: 16px;
}

.post-list__empty{
  text-align: center;
  padding: 80px 20px;
  background: var(--color-neutral-50);
  border-radius: 16px;
  margin: 32px auto;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.post-list__empty-title {
  color: var(--color-neutral-600);
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 16px;
}

.post-list__item {
  position: relative;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-list__item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
  
  .post-list__title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .post-list__container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .post-list__item {
    min-height: 280px;
  }

  .post-list__title {
    font-size: 24px;
  }
}
</style>