<template>
  <div class="post-item">
    <div
        class="post-item__pin"
        :title="post.pinned ? 'Unpin' : 'Pin'"
        @click="$emit('pin', post.id)"
    >
      <Icon :icon="post.pinned ? 'mdi:pin' : 'mdi:paperclip'" width="20" height="20"/>
    </div>

    <div class="post-item__content">
      <div class="post-item__text">
        <h4 class="post-item__title">{{ post.title }}</h4>
        <p class="post-item__subtitle">{{ post.body }}</p>
      </div>

      <div class="post-item__actions">
        <delete-icon
            @delete="onDelete"
            title="Delete post"
        />
        <my-button
            variant="primary"
            size="small"
            @click="$router.push(`/posts/${post.id}`)"
        >
          Create
        </my-button>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteIcon from "@/components/UI/DeleteIcon.vue";
import {Icon} from "@iconify/vue";

export default {
  name: "PostItem",
  components: {DeleteIcon, Icon},

  props: {
    post: {type: Object, required: true}
  },

  methods: {
    onDelete() {
      this.$emit("delete", this.post.id);
    }
  }
};
</script>

<style lang="sass" scoped>
.post-item
  position: relative
  overflow: hidden
  padding: 1.25rem
  border-radius: 16px
  border: 1px solid #e5e7eb
  background-color: #fff
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05)
  transition: transform 0.25s ease, box-shadow 0.25s ease
  display: flex
  flex-direction: column
  justify-content: space-between
  animation: fadeInUp 0.4s ease forwards
  opacity: 0
  transform: translateY(15px)

  &:hover
    transform: translateY(-4px)
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08)

@keyframes fadeInUp
  to
    opacity: 1
    transform: translateY(0)

.post-item__pin
  position: absolute
  top: 8px
  right: 8px
  color: #888
  transition: color 0.2s ease
  cursor: pointer

  &:hover
    color: #4CAF50

.post-item__content
  display: flex
  flex-direction: column
  height: 100%

.post-item__text
  flex: 1
  margin-bottom: 1rem

.post-item__title
  font-size: 1.1rem
  font-weight: 600
  color: #111827
  margin-bottom: 0.5rem
  line-height: 1.4

.post-item__subtitle
  font-size: 0.95rem
  color: #4b5563
  line-height: 1.5

.post-item__actions
  display: flex
  align-items: center
  justify-content: space-between
  gap: 0.5rem

  & > *:first-child
    flex-shrink: 0
</style>
