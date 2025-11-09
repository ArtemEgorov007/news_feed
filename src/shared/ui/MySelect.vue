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

  emits: ['update:modelValue', 'update:value'],

  methods: {
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value);
      this.$emit('update:value', event.target.value);
    }
  }
};
</script>

<style scoped>
.my-select {
  padding: 12px 45px 12px 16px;
  border: 2px solid var(--color-neutral-200);
  border-radius: 12px;
  font-family: inherit;
  font-size: 16px;
  background-color: var(--color-neutral-50);
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 20px;
  color: var(--color-neutral-800);
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.my-select:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.2);
  background-color: white;
}

.my-select:disabled {
  background-color: var(--color-neutral-100);
  cursor: not-allowed;
}

.dark-theme .my-select {
  background-color: var(--color-neutral-800);
  border: 2px solid var(--color-neutral-700);
  color: var(--color-neutral-100);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
}

.dark-theme .my-select:focus {
  border-color: var(--color-primary-400);
  box-shadow: 0 4px 12px rgba(147, 197, 253, 0.3);
  background-color: var(--color-neutral-900);
}

.my-select__placeholder {
  color: #999;
}

.my-select__option {
  color: #333;
  padding: 8px;
 background-color: white;
}

.my-select__option:hover {
  background-color: var(--color-neutral-100);
}

.dark-theme .my-select__option {
  color: #e2e8f0;
  background-color: var(--color-neutral-800);
}

.dark-theme .my-select__option:hover {
  background-color: var(--color-neutral-700);
}
</style>
