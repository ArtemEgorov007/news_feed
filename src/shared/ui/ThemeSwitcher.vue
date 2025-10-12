<template>
  <div class="theme-switcher">
    <button
      @click="toggleTheme"
      class="theme-switcher__button"
      :aria-label="`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`"
    >
      <Icon
        v-if="currentTheme === 'light'"
        icon="mdi:white-balance-sunny"
        width="20"
        height="20"
      />
      <Icon
        v-else
        icon="mdi:moon-waning-crescent"
        width="20"
       height="20"
      />
    </button>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'ThemeSwitcher',
  components: {
    Icon
  },
  data() {
    return {
      currentTheme: 'light'
   };
  },
  mounted() {
    // Check for saved theme or respect system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else if (systemPrefersDark) {
      this.currentTheme = 'dark';
    }

    this.applyTheme();
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme();
      localStorage.setItem('theme', this.currentTheme);
    },
    applyTheme() {
      // Add a class to the body for transition
      document.body.classList.add('theme-transition');

      if (this.currentTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }

      // Remove transition class after animation completes
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 300);
    }
  }
};
</script>

<style scoped>
.theme-switcher__button {
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--border-radius-full);
  padding: var(--spacing-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  color: var(--color-primary-100);
  position: relative;
  overflow: hidden;
}

.theme-switcher__button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-primary-50);
  opacity: 0;
  transition: opacity var(--transition-fast);
  z-index: -1;
}

.theme-switcher__button:hover {
  background-color: var(--color-primary-50);
  color: var(--color-primary-800);
  border-color: var(--color-primary-400);
}

.theme-switcher__button:hover::before {
  opacity: 1;
}

.dark-theme .theme-switcher__button {
  border-color: var(--color-primary-600);
  color: var(--color-primary-400);
}

.dark-theme .theme-switcher__button::before {
  background: var(--color-primary-900);
}

.dark-theme .theme-switcher__button:hover {
  background-color: var(--color-primary-900);
  color: var(--color-primary-200);
  border-color: var(--color-primary-500);
}

/* Additional styling for better visibility */
.navbar__list li:last-child {
  display: flex;
  align-items: center;
}
</style>
