<template>
  <div class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <h1 class="hero__title">Stay Updated with the Latest Tech News</h1>
        <p class="hero__subtitle">Discover and share amazing technology stories from around the world</p>

        <div class="hero__actions">
          <router-link to="/posts" class="hero__button hero__button--primary">
            Explore Posts
          </router-link>

          <router-link to="/about" class="hero__button hero__button--secondary">
            Learn More
          </router-link>
        </div>
      </div>

      <div class="hero__image">
        <div class="hero__image-placeholder">
          <Icon icon="mdi:newspaper-variant-multiple" width="120" height="120"/>
        </div>
      </div>
    </div>

    <div class="hero__features">
      <div class="feature-card">
        <Icon icon="mdi:heart" width="48" height="48" class="feature-card__icon"/>
        <h3 class="feature-card__title">Save Favorites</h3>
        <p class="feature-card__description">Bookmark articles you love and read them later</p>
      </div>

      <div class="feature-card">
        <Icon icon="mdi:magnify" width="48" height="48" class="feature-card__icon"/>
        <h3 class="feature-card__title">Smart Search</h3>
        <p class="feature-card__description">Find exactly what you're looking for quickly</p>
      </div>

      <div class="feature-card">
        <Icon icon="mdi:bell" width="48" height="48" class="feature-card__icon"/>
        <h3 class="feature-card__title">Get Notified</h3>
        <p class="feature-card__description">Stay updated with breaking news and updates</p>
      </div>
    </div>
  </div>
</template>

<script>
import {Icon} from '@iconify/vue';

export default {
  name: 'MainPage',
  components: {
    Icon
  }
}
</script>

<style scoped>
.hero {
  padding: var(--spacing-xl) var(--spacing-lg);
}

.hero__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-3xl);
}

@media (max-width: 768px) {
  .hero__container {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }
}

.hero__content {
  flex: 1;
}

.hero__title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
  color: var(--color-neutral-900);
}

@media (max-width: 768px) {
  .hero__title {
    font-size: var(--font-size-3xl);
  }
}

.hero__subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-neutral-600);
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
}

@media (max-width: 768px) {
  .hero__subtitle {
    font-size: var(--font-size-lg);
    margin-left: auto;
    margin-right: auto;
  }
}

.hero__actions {
  display: flex;
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .hero__actions {
    justify-content: center;
  }
}

.hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-full);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  text-decoration: none;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
}

.hero__button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero__button:active {
  transform: translateY(0);
}

.hero__button--primary {
  background-color: var(--color-primary-600);
  color: white;
}

.hero__button--primary:hover {
  background-color: var(--color-primary-700);
}

.hero__button--secondary {
  background-color: transparent;
  color: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.hero__button--secondary:hover {
  background-color: var(--color-primary-50);
}

.hero__image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero__image-placeholder {
  width: 300px;
  height: 300px;
  border-radius: var(--border-radius-full);
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-secondary-100));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-600);
}

@media (max-width: 768px) {
  .hero__image-placeholder {
    width: 200px;
    height: 200px;
  }
}

.hero__features {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

@media (max-width: 768px) {
  .hero__features {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}

.feature-card {
  background: white;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.dark-theme .feature-card {
  background: var(--color-card-background);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.feature-card__icon {
  color: var(--color-primary-600);
  margin-bottom: var(--spacing-md);
}

.feature-card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--color-neutral-800);
}

.feature-card__description {
  color: var(--color-neutral-600);
  line-height: 1.6;
}
</style>