<template>
  <div class="app-layout">
    <navbar></navbar>

    <main class="app-main">
      <router-view></router-view>
    </main>

    <footer class="app-footer">
      <div class="app-footer__content">
        <p>© 2025 News Feed. All rights reserved.</p>
        <div class="app-footer__links">
          <router-link to="/about">About</router-link>
          <router-link to="/posts">Posts</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from "@/shared/ui/Navbar.vue";

export default {
  components: {Navbar}
  // Removed duplicate theme application code since it's handled in ThemeSwitcher.vue
}
</script>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  padding: var(--spacing-lg);
}

.app-footer {
  margin-top: auto;
  background-color: var(--color-neutral-100);
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--color-neutral-200);
}

.dark-theme .app-footer {
  background-color: var(--color-neutral-800);
  border-top: 1px solid var(--color-border);
}

.app-footer__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.app-footer__links {
  display: flex;
  gap: var(--spacing-lg);
}

.app-footer__links a {
  color: var(--color-primary-600);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.app-footer__links a:hover {
  color: var(--color-primary-800);
}

.dark-theme .app-footer__links a {
  color: var(--color-primary-400);
}

.dark-theme .app-footer__links a:hover {
  color: var(--color-primary-300);
}

@media (max-width: 768px) {
  .app-footer__content {
    flex-direction:column;
    text-align: center;
  }

  .app-main {
    padding: var(--spacing-md);
  }
}
</style>