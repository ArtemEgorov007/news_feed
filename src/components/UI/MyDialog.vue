<template>
  <div
      v-if="show"
      @click="handleBackdropClick"
      class="my-dialog"
  >
    <div
        @click.stop
        class="my-dialog__content"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin.js";

export default {
  name: 'MyDialog',
  mixins: [toggleMixin],
  emits: ['update:show'],
};
</script>

<style lang="sass" scoped>
.my-dialog
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center
  z-index: 1000

.my-dialog__content
  padding: 16px
  width: 100%
  max-width: 500px
  transform: translateY(0)
  transition: transform 0.3s ease

.my-dialog-enter-active,
.my-dialog-leave-active
  transition: opacity 0.3s ease

.my-dialog-enter-from,
.my-dialog-leave-to
  opacity: 0

.my-dialog-enter-from .my-dialog__content,
.my-dialog-leave-to .my-dialog__content
  transform: translateY(-20px)
</style>
