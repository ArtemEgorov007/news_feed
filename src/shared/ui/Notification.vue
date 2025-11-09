<template>
  <div class="notification" :class="`notification--${type}`">
    <div class="notification__icon">
      <Icon :icon="icon" width="24" height="24" />
    </div>
    <div class="notification__content">
      <span class="notification__message">{{ message }}</span>
    </div>
    <button class="notification__close" @click="$emit('close')" aria-label="Close notification">
      <Icon icon="mdi:close" width="20" height="20" />
    </button>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'Notification',
  components: { Icon },
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
    }
  },
  emits: ['close'],
  computed: {
    icon() {
      const icons = {
        info: 'mdi:information-outline',
        success: 'mdi:check-circle-outline',
        warning: 'mdi:alert-outline',
        error: 'mdi:alert-circle-outline'
      };
      return icons[this.type] || icons.info;
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  min-width: 300px;
  max-width: 400px;
  transform: translateX(0);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideIn 0.3s ease-out forwards;
}

.notification--info {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-left: 4px solid #2196f3;
  color: #0d47a1;
}

.notification--success {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-left: 4px solid #4caf50;
  color: #1b5e20;
}

.notification--warning {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border-left: 4px solid #ff9800;
  color: #e65100;
}

.notification--error {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border-left: 4px solid #f44336;
  color: #b71c1c;
}

.dark-theme .notification--info {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  border-left: 4px solid #64b5f6;
  color: #e3f2fd;
}

.dark-theme .notification--success {
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  border-left: 4px solid #81c784;
  color: #e8f5e9;
}

.dark-theme .notification--warning {
  background: linear-gradient(135deg, #e65100 0%, #ef6c00 100%);
  border-left: 4px solid #ffb74d;
  color: #fff8e1;
}

.dark-theme .notification--error {
  background: linear-gradient(135deg, #b71c1c 0%, #c62828 100%);
  border-left: 4px solid #e57373;
  color: #ffebee;
}

.notification__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification__content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.notification__message {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.notification__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  opacity: 0.7;
}

.notification__close:hover {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 1;
}

.dark-theme .notification__close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .notification {
    min-width: 250px;
    max-width: calc(100vw - 40px);
    top: 10px;
    right: 10px;
  }
}
</style>