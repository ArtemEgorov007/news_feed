<template>
  <div class="notification-container">
    <transition-group name="notification-list" tag="div">
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :message="notification.message"
        :type="notification.type"
        @close="closeNotification(notification.id)"
        class="notification-container__item"
      />
    </transition-group>
  </div>
</template>

<script>
import Notification from './Notification.vue';
import notificationManager from '@/shared/lib/utils/notificationManager.js';

export default {
  name: 'NotificationContainer',
  components: { Notification },
  data() {
    return {
      notifications: []
    };
  },
  mounted() {
    notificationManager.addListener(this.updateNotifications);
  },
  beforeUnmount() {
    notificationManager.removeListener(this.updateNotifications);
  },
  methods: {
    updateNotifications(notifications) {
      this.notifications = [...notifications];
    },
    closeNotification(id) {
      notificationManager.remove(id);
    }
  }
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-container__item {
  transition: all 0.3s ease;
}

.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.notification-list-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-list-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
  }
}
</style>