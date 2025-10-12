<template>
  <div class="delete-wrapper">
    <button
        class="delete-icon"
        @click="showConfirm = true"
        :title="title"
    >
      <Icon icon="mdi:trash-can-outline" width="24" height="24"/>
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

  emits: ["delete"],

  props: {
    title: {
      type: String,
      default: "Delete",
    },
  },

  data: () => ({
    showConfirm: false,
  }),

  methods: {
    confirmDelete() {
      this.$emit("delete");
      this.showConfirm = false;
    },
  },
};
</script>

<style scoped>
.delete-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: var(--color-neutral-500);
  transition: all 0.25s ease;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-icon:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-error-500);
  transform: scale(1.1);
}

.delete-icon:focus {
  outline: 2px solid var(--color-error-500);
  outline-offset: 2px;
}

.dark-theme .delete-icon {
  color: var(--color-neutral-400);
}

.dark-theme .delete-icon:hover {
  background-color: rgba(248, 113, 113, 0.1);
  color: var(--color-error-500);
}

.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.confirm-dialog {
  background: #fff;
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  max-width: 280px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-xl);
  animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.confirm-icon {
  color: var(--color-warning-500);
  font-size: 48px;
  margin-bottom: 16px;
}

.confirm-text {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: var(--color-neutral-800);
  font-weight: 600;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:active {
  transform: translateY(1px);
}

.btn--danger {
  background: var(--color-error-500);
  color: #fff;
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);
}

.btn--danger:hover {
  background: var(--color-error-600);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(239, 68, 68, 0.3);
}

.btn--secondary {
  background: var(--color-neutral-100);
  color: var(--color-neutral-600);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.btn--secondary:hover {
  background: var(--color-neutral-200);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.08);
}

.dark-theme .confirm-dialog {
  background: var(--color-card-background);
}

.dark-theme .confirm-text {
  color: var(--color-neutral-500);
}

.dark-theme .btn--secondary {
  background: var(--color-neutral-700);
  color: var(--color-neutral-200);
}

.dark-theme .btn--secondary:hover {
  background: var(--color-neutral-600);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
