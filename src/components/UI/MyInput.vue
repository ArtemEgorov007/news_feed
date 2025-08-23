<template>
  <input
      :class="inputClass"
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      class="my-input"
  >
</template>

<script>
export default {
  name: 'MyInput',

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'text',
      validator: (value) => [
        'text', 'password', 'email', 'number', 'tel', 'url'
      ].includes(value)
    },

    disabled: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },

  emits: ['update:modelValue', 'blur', 'focus'],

  computed: {
    inputClass() {
      return [
        `my-input--${this.size}`,
        {
          'my-input--disabled': this.disabled
        }
      ];
    }
  },

  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },

    handleBlur(event) {
      this.$emit('blur', event);
    },

    handleFocus(event) {
      this.$emit('focus', event);
    }
  }
};
</script>

<style lang="sass" scoped>
.my-input
  padding: 10px 15px
  border: 1px solid #ddd
  border-radius: 4px
  font-family: inherit
  font-size: 16px
  transition: all 0.3s ease
  outline: none

  &:focus
    border-color: #4CAF50
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2)

  &:disabled
    background-color: #f5f5f5
    cursor: not-allowed

.my-input--small
  padding: 6px 12px
  font-size: 14px

.my-input--medium
  padding: 10px 15px
  font-size: 16px

.my-input--large
  padding: 14px 18px
  font-size: 18px

.my-input--disabled
  background-color: #f5f5f5
  cursor: not-allowed
</style>
