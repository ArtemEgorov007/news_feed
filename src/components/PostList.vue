<template>
  <div class="post-list" v-if="localPosts.length">
    <h3 class="post-list__title">List of Posts</h3>

    <draggable
        v-model="sortedPosts"
        item-key="id"
        class="post-list__container"
        :animation="200"
        :disabled="isMobile"
        :delay="isMobile ? 150 : 0"
        :delay-on-touch-only="true"
        @end="onDragEnd"
    >
      <template #item="{ element }">
        <post-item
            :post="element"
            @delete="$emit('delete', element.id)"
            @pin="togglePin"
        />
      </template>
    </draggable>
  </div>

  <div v-else class="post-list__empty">
    <h3 class="post-list__empty-title">No posts yet</h3>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

import PostItem from "@/components/PostItem.vue";
import draggable from "vuedraggable";

export default {
  name: "PostList",
  components: {PostItem, draggable},

  props: {
    posts: {type: Array, required: true}
  },

  emits: ["delete", "update-order"],

  data() {
    return {
      localPosts: [...this.posts],
      isMobile: window.innerWidth <= 768
    };
  },

  watch: {
    posts(newPosts) {
      this.localPosts = [...newPosts];
    }
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
      }
    }
  },

  methods: {
    ...mapMutations('post', ['togglePin']),

    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },

    onDragEnd() {
      this.$emit("update-order", this.localPosts);
    }
  }
};
</script>

<style lang="sass" scoped>
.post-list
  max-width: 1400px
  margin: 30px auto
  padding: 0 16px

.post-list__title
  text-align: center
  color: #333
  margin-bottom: 20px
  font-size: 1.5rem
  font-weight: 600

.post-list__container
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))
  gap: 20px

.post-list__empty
  text-align: center
  padding: 40px 20px

.post-list__empty-title
  color: #666
  font-weight: normal

.post-list__item
  position: relative
  height: 100%
  transition: transform 0.25s ease, box-shadow 0.25s ease

  &:hover
    transform: translateY(-4px)
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08)

.post-list__item
  cursor: grab

  &:active
    cursor: grabbing

.list-enter-active,
.list-leave-active
  transition: all 0.4s ease

.list-enter-from,
.list-leave-to
  opacity: 0
  transform: translateY(20px) scale(0.95)

.list-move
  transition: transform 0.4s ease

@media (max-width: 480px)
  .post-list__container
    grid-template-columns: 1fr

  .post-list__item
    min-height: 240px
    width: 100%
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: 12px
</style>
