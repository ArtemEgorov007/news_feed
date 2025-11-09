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
      default:'text',
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
      default:'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },

  emits: ['update:modelValue', 'input', 'blur', 'focus'],

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
     this.$emit('input', event.target.value);
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
  padding: 12px 16px;
  border: 2px solid var(--color-neutral-200);
  border-radius: 12px;
  font-family: inherit;
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;
  width:100%;
  background-color: var(--color-neutral-50);
  color: var(--color-neutral-800);
 box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.my-input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.2);
  background-color: white;
}

.my-input:disabled {
  background-color: var(--color-neutral-100);
  cursor: not-allowed;
}

.dark-theme .my-input {
  background-color: var(--color-neutral-800);
color: var(--color-neutral-100);
  border: 2px solid var(--color-neutral-700);
}

.dark-theme .my-input:focus {
  border-color: var(--color-primary-400);
  box-shadow: 0 4px 12px rgba(147, 197, 253, 0.3);
 background-color: var(--color-neutral-900);
}

.my-input--small {
  padding: 8px 12px;
  font-size: 14px;
}

.my-input--medium {
  padding: 12px 16px;
  font-size: 16px;
}

.my-input--large {
  padding: 16px 20px;
  font-size: 18px;
}

.my-input--disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
