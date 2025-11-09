<template>
  <nav class="mobile-nav" v-if="isMobile">
    <router-link to="/posts" class="mobile-nav__link" :class="{ 'mobile-nav__link--active': $route.name === 'Posts' }">
      <Icon icon="mdi:home" width="24" height="24"/>
      <span class="link-text">Home</span>
    </router-link>

    <router-link to="/favorites" class="mobile-nav__link"
                 :class="{ 'mobile-nav__link--active': $route.name === 'Favorites' }">
      <Icon icon="mdi:heart" width="24" height="24"/>
      <span class="link-text">Favorites</span>
    </router-link>

    <router-link to="/about" class="mobile-nav__link" :class="{ 'mobile-nav__link--active': $route.name === 'About' }">
      <Icon icon="mdi:information" width="24" height="24"/>
      <span class="link-text">About</span>
    </router-link>
  </nav>
</template>

<script>
import {Icon} from '@iconify/vue';
import {ref, onMounted, onBeforeUnmount} from 'vue';

export default {
  name: 'MobileNav',
  components: {
    Icon
  },
  setup() {
    const isMobile = ref(false);
    const isSmallScreen = ref(false);

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768;
      isSmallScreen.value = window.innerWidth <= 480;
    };

    onMounted(() => {
      checkMobile();
      window.addEventListener('resize', checkMobile);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile);
    });

    return {
      isMobile,
      isSmallScreen
    };
  }
};
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  background: linear-gradient(135deg, var(--color-primary-700), var(--color-primary-900));
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-theme .mobile-nav {
  background: linear-gradient(135deg, var(--color-neutral-100), var(--color-neutral-200));
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.mobile-nav__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--color-primary-100);
  font-size: 12px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
  gap: 4px;
}

.mobile-nav__link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-2px);
}

.mobile-nav__link--active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;

}

.dark-theme .mobile-nav__link {
  color: var(--color-primary-200);
}

.dark-theme .mobile-nav__link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.dark-theme .mobile-nav__link--active {
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
  padding: var(--spacing-lg);
}

.link-text {
  font-size: 10px;
  margin-top: 2px;
}

/*Always hide text on mobile devices */
@media (max-width: 768px) {
  .link-text {
    display: none;
  }

  .mobile-nav__link {
    padding: 16px 0;
  }
}
</style>
