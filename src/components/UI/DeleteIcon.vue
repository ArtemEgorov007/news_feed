<template>
  <div class="delete-wrapper">
    <button
        class="delete-icon"
        @click="showConfirm = true"
        :title="title"
    >
      <Icon icon="mdi:trash-can-outline" width="22" height="22"/>
    </button>

    <transition name="fade">
      <div
          v-if="showConfirm"
          class="confirm-overlay"
          @click.self="showConfirm = false"
      >
        <div class="confirm-dialog">
          <Icon icon="mdi:alert-circle-outline" class="confirm-icon"/>
          <p class="confirm-text">Delete this post?</p>
          <div class="confirm-actions">
            <button class="btn btn--danger" @click="confirmDelete">Delete</button>
            <button class="btn btn--secondary" @click="showConfirm = false">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue";

export default {
  name: "DeleteIcon",
  components: {Icon},

  props: {
    title: {
      type: String,
      default: "Delete"
    }
  },
  data: () => ({
    showConfirm: false
  }),
  methods: {
    confirmDelete() {
      this.$emit("delete");
      this.showConfirm = false;
    }
  }
};
</script>

<style lang="sass" scoped>
.delete-icon
  background: none
  border: none
  cursor: pointer
  padding: 6px
  color: #e74c3c
  transition: all 0.25s ease
  border-radius: 6px
  display: flex
  align-items: center
  justify-content: center

  &:hover
    background-color: rgba(231, 76, 60, 0.1)
    transform: scale(1.1)

  &:focus
    outline: 2px solid #e74c3c

.confirm-overlay
  position: fixed
  inset: 0
  background: rgba(0, 0, 0, 0.45)
  display: flex
  align-items: center
  justify-content: center
  z-index: 2000
  backdrop-filter: blur(2px)

.confirm-dialog
  background: #fff
  padding: 1.5rem
  border-radius: 12px
  max-width: 220px
  width: 100%
  text-align: center
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15)
  animation: scaleIn 0.25s ease

.confirm-icon
  color: #f39c12
  font-size: 36px
  margin-bottom: 12px

.confirm-text
  margin-bottom: 1.25rem
  font-size: 1rem
  color: #2c3e50
  font-weight: 500

.confirm-actions
  display: flex
  justify-content: center
  gap: 12px

.btn
  padding: 8px 16px
  border: none
  border-radius: 6px
  cursor: pointer
  font-size: 0.9rem
  font-weight: 500
  transition: background 0.2s ease, transform 0.15s ease

  &:active
    transform: translateY(1px)

.btn--danger
  background: #e74c3c
  color: #fff

  &:hover
    background: #c0392b

.btn--secondary
  background: #ecf0f1
  color: #2c3e50

  &:hover
    background: #d5dbdb

.fade-enter-active, .fade-leave-active
  transition: opacity 0.25s ease

.fade-enter-from, .fade-leave-to
  opacity: 0

@keyframes scaleIn
  from
    transform: scale(0.9)
    opacity: 0
  to
    transform: scale(1)
    opacity: 1
</style>
