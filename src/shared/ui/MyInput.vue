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

<style scoped>
.my-input {
  padding: 10px 15px;
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-md);
  font-family: inherit;
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;
  width: 100%;
  background-color: var(--color-neutral-50);
  color: var(--color-neutral-800);
}

.my-input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.my-input:disabled {
  background-color: var(--color-neutral-100);
  cursor: not-allowed;
}

.dark-theme .my-input {
  background-color: var(--color-neutral-800);
  color: var(--color-neutral-100);
  border: 1px solid var(--color-neutral-600);
}

.dark-theme .my-input:focus {
  border-color: var(--color-primary-400);
  box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.3);
}

.my-input--small {
  padding: 6px 12px;
  font-size: 14px;
}

.my-input--medium {
  padding: 10px 15px;
  font-size: 16px;
}

.my-input--large {
  padding: 14px 18px;
  font-size: 18px;
}

.my-input--disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
