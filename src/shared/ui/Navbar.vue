<template>
  <nav class="navbar">
    <div class="navbar__brand">
      <router-link to="/" class="navbar__logo">
        <span class="navbar__logo-text">NewsFeed</span>
      </router-link>
    </div>

    <ul class="navbar__list">
      <li>
        <router-link to="/posts" class="navbar__link">
          <Icon icon="mdi:home" width="20" height="20"/>
        </router-link>
      </li>
      <li>
        <router-link to="/favorites" class="navbar__link">
          <Icon icon="mdi:heart" width="20" height="20"/>
        </router-link>
      </li>
      <li>
        <router-link to="/about" class="navbar__link">
          <Icon icon="mdi:information" width="20" height="20"/>
        </router-link>
      </li>
      <li>
        <theme-switcher />
      </li>
    </ul>
  </nav>
</template>

<script>
import {Icon} from '@iconify/vue';
import ThemeSwitcher from './ThemeSwitcher.vue';

export default {
  name: 'Navbar',
  components: {
    Icon,
    ThemeSwitcher
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-primary-700), var(--color-primary-900));
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar__brand {
  display: flex;
  align-items: center;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: white;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xl);
  transition: opacity var(--transition-fast);
}

.navbar__logo:hover {
  opacity: 0.9;
}

.navbar__list {
  display: flex;
  list-style: none;
  gap: var(--spacing-md);
}

.navbar__link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  text-decoration: none;
  color: var(--color-primary-100);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-full);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.navbar__link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity var(--transition-fast);
  z-index: -1;
}

.navbar__link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.navbar__link:hover::before {
  opacity: 1;
}

.navbar__link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.dark-theme .navbar__link {
  color: var(--color-primary-200);
}

.dark-theme .navbar__link::before {
  background: rgba(255, 255, 255, 0.1);
}

.dark-theme .navbar__link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.dark-theme .navbar__link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
}

@media (max-width: 768px) {
  .navbar {
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .navbar__logo-text {
    font-size: var(--font-size-lg);
  }

  .navbar__list {
    gap: var(--spacing-xs);
  }

  .navbar__link span {
    display: none;
  }

  .navbar__link {
    padding: var(--spacing-sm);
  }
}
</style>
