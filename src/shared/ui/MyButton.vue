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

<style scoped>
.my-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.my-button:focus {
  box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.3);
}

.my-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.my-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.my-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.my-button--primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
  color: white;
}

.my-button--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800));
}

.my-button--secondary {
  background: var(--color-neutral-100);
  color: var(--color-neutral-700);
  border: 1px solid var(--color-neutral-200);
}

.my-button--secondary:hover:not(:disabled) {
  background: var(--color-neutral-200);
}

.my-button--danger {
  background: linear-gradient(135deg, var(--color-error-500), var(--color-error-600));
  color: white;
}

.my-button--danger:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-error-600), var(--color-error-500));
}

.dark-theme .my-button--secondary {
  background: var(--color-neutral-700);
  color: var(--color-neutral-200);
  border: 1px solid var(--color-neutral-600);
}

.dark-theme .my-button--secondary:hover:not(:disabled) {
  background: var(--color-neutral-600);
}

.my-button--small {
  padding: 8px 16px;
  font-size: 0.875rem;
}

.my-button--medium {
  padding: 12px 18px;
  font-size: 1rem;
}

.my-button--large {
  padding: 16px 32px;
  font-size: 1.125rem;
}

.my-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
}
</style>
