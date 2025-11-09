class NotificationManager {
  constructor() {
    this.notifications = [];
    this.listeners = [];
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  notify(message, type = 'info', duration = 3000) {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };
    
    this.notifications.push(notification);
    this.listeners.forEach(listener => listener(this.notifications));
    
    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
    
    return id;
  }

  remove(id) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index > -1) {
      this.notifications.splice(index, 1);
      this.listeners.forEach(listener => listener(this.notifications));
    }
  }

  clear() {
    this.notifications = [];
    this.listeners.forEach(listener => listener(this.notifications));
  }
}

// Create a singleton instance
export default new NotificationManager();