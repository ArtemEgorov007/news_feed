<template>
  <button
      :class="buttonClass"
      :disabled="disabled"
      @click="$emit('click', $event)"
      class="my-button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',

  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
    },

    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    buttonClass() {
      return [
        `my-button--${this.variant}`,
        `my-button--${this.size}`,
        {
          'my-button--disabled': this.disabled
        }
      ];
    }
  }
};
</script>

<style lang="sass" scoped>
.my-button
  display: inline-flex
  align-items: center
  justify-content: center
  border: none
  border-radius: 4px
  cursor: pointer
  font-family: inherit
  font-weight: 500
  transition: all 0.3s ease
  outline: none

  &:focus
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5)

  &:disabled
    cursor: not-allowed
    opacity: 0.6

.my-button--primary
  background-color: #4CAF50
  color: white

  &:hover:not(:disabled)
    background-color: #45a049
    transform: translateY(-2px)

.my-button--secondary
  background-color: #f5f5f5
  color: #333
  border: 1px solid #ddd

  &:hover:not(:disabled)
    background-color: #e0e0e0
    transform: translateY(-2px)

.my-button--danger
  background-color: #f44336
  color: white

  &:hover:not(:disabled)
    background-color: #d32f2f
    transform: translateY(-2px)

.my-button--small
  padding: 6px 12px
  font-size: 14px

.my-button--medium
  padding: 10px 20px
  font-size: 16px

.my-button--large
  padding: 14px 28px
  font-size: 18px

.my-button--disabled
  opacity: 0.6
  cursor: not-allowed
  transform: none !important
</style>
