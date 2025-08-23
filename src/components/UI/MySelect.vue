<template>
  <select
      :value="modelValue"
      @change="handleChange"
      class="my-select"
  >
    <option
        disabled
        value=""
        class="my-select__placeholder"
    >
      Select from the list...
    </option>

    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="my-select__option"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'MySelect',

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },

    options: {
      type: Array,
      default: () => []
    }
  },

  emits: ['update:modelValue'],

  methods: {
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style lang="sass" scoped>
.my-select
  padding: 10px 45px 10px 15px
  border: 1px solid #ddd
  border-radius: 4px
  font-family: inherit
  font-size: 14px
  background-color: white
  cursor: pointer
  transition: all 0.3s ease
  outline: none
  appearance: none
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")
  background-repeat: no-repeat
  background-position: right 15px center
  background-size: 16px

  &:focus
    border-color: #4CAF50
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2)

  &:disabled
    background-color: #f5f5f5
    cursor: not-allowed

.my-select__placeholder
  color: #999

.my-select__option
  color: #333
</style>
