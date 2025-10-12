<template>
  <div class="post-list" v-if="localPosts.length">
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

  <div v-else class="post-list__empty">
    <h3 class="post-list__empty-title">No posts yet</h3>
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
      localPosts: [...this.posts],
      isMobile: window.innerWidth <= 768,
    };
  },

  watch: {
    posts(newPosts) {
      this.localPosts = [...newPosts];
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  computed: {
    sortedPosts: {
      get() {
        return [...this.localPosts].sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return 0;
        });
      },
      set(val) {
        this.localPosts = val;
      },
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

<style lang="sass" scoped>
.post-list
  max-width: 1400px
  margin: 30px auto

.post-list__title
  text-align: center
  color: #1e293b
  margin-bottom: 30px
  font-size: 2rem
  font-weight: 800
  letter-spacing: -0.02em

.post-list__container
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))
  gap: 28px
  padding: 8px

.post-list__empty
  text-align: center
  padding: 80px 20px
  background: linear-gradient(145deg, #f8fafc, #f1f5f9)
  border-radius: 24px
  margin: 30px auto
  max-width: 600px

.post-list__empty-title
  color: #64748b
  font-weight: 600
  font-size: 1.5rem

.post-list__item
  position: relative
  height: 100%
  transition: transform 0.3s ease, box-shadow 0.3s ease

  &:hover
    transform: translateY(-6px)
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.06)

@media (max-width: 768px)
  .post-list__container
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))
    gap: 20px

@media (max-width: 480px)
  .post-list__container
    grid-template-columns: 1fr
    gap: 20px

  .post-list__item
    min-height: 260px

  .post-list__title
    font-size: 1.75rem
</style>
