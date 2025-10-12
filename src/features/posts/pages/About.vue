<template>
  <div class="about-page">
    <div class="container">
      <div class="about-page__header">
        <h1 class="about-page__title">About Our Vue.js Project</h1>
        <p class="about-page__subtitle">Crafted with passion and modern technologies</p>
      </div>

      <div class="about-page__content card">
        <div class="about-page__section">
          <h2 class="about-page__section-title">Our Mission</h2>
          <p class="about-page__text">
            We strive to create beautiful, productive, and user-friendly web applications using the latest Vue.js
            ecosystem. Our goal is to provide exceptional digital capabilities that exceed expectations.
          </p>

          <p class="about-page__text">
            One example is our To-Do List mini-application: a compact but functional tool that allows you to add posts,
            sort them, search, drag and drop tasks, select and delete multiple items at once. This solution demonstrates
            ease of use, attention to detail, and thoughtful architecture.
          </p>

          <p class="about-page__text">
            The app was developed by Egorov and tested by Oleshkevich, ensuring high quality and stability.
          </p>
        </div>

        <div class="about-page__section">
          <h2 class="about-page__section-title">Technologies We Use</h2>
          <div class="about-page__tech-stack">
            <span class="about-page__tech-item">Vue 3</span>
            <span class="about-page__tech-item">Vue Router</span>
            <span class="about-page__tech-item">Vuex</span>
            <span class="about-page__tech-item">Drag and drop</span>
            <span class="about-page__tech-item">Composition API</span>
            <span class="about-page__tech-item">Sass</span>
            <span class="about-page__tech-item">Axios</span>
            <span class="about-page__tech-item">ES6+</span>
          </div>
        </div>

        <div class="about-page__section">
          <h2 class="about-page__section-title">Why Vue.js?</h2>
          <p class="about-page__text">
            Vue.js offers the best of both worlds: the approachability of traditional
            frameworks and the performance of modern solutions. Its progressive nature
            allows us to build applications of any scale with confidence.
          </p>
        </div>

        <div class="about-page__actions">
          <router-link to="/posts" class="about-page__button">
            View Posts
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style lang="sass" scoped>
.about-page
  padding: var(--spacing-xl) 0

.about-page__header
  text-align: center
  margin-bottom: var(--spacing-xl)
  padding: var(--spacing-2xl) var(--spacing-lg)
  border-radius: var(--border-radius-lg)
  background: linear-gradient(135deg, var(--color-primary-700), var(--color-secondary-600))
  color: white
  box-shadow: var(--shadow-lg)

.about-page__title
  font-size: var(--font-size-4xl)
  font-weight: var(--font-weight-bold)
  margin: 0 0 var(--spacing-md) 0

  @media (max-width: 768px)
    font-size: var(--font-size-3xl)

.about-page__subtitle
  font-size: var(--font-size-xl)
  opacity: 0.9
  margin: 0
  font-weight: var(--font-weight-medium)

  @media (max-width: 768px)
    font-size: var(--font-size-lg)

.about-page__content
  padding: var(--spacing-xl)
  background: white

.about-page__section
  margin-bottom: var(--spacing-xl)

  &:last-child
    margin-bottom: 0

.about-page__section-title
  color: var(--color-neutral-900)
  font-size: var(--font-size-2xl)
  margin-bottom: var(--spacing-md)
  font-weight: var(--font-weight-semibold)

  @media (max-width: 768px)
    font-size: var(--font-size-xl)

.about-page__text
  color: var(--color-neutral-600)
  font-size: var(--font-size-base)
  line-height: 1.7
  margin: 0 0 var(--spacing-md) 0

.about-page__tech-stack
  display: flex
  flex-wrap: wrap
  gap: var(--spacing-sm)

.about-page__tech-item
  background: var(--color-primary-100)
  color: var(--color-primary-800)
  padding: var(--spacing-sm) var(--spacing-md)
  border-radius: var(--border-radius-full)
  font-size: var(--font-size-sm)
  font-weight: var(--font-weight-medium)

.about-page__actions
  text-align: center
  margin-top: var(--spacing-xl)
  padding-top: var(--spacing-xl)
  border-top: 1px solid var(--color-neutral-200)

.about-page__button
  display: inline-flex
  align-items: center
  justify-content: center
  gap: var(--spacing-xs)
  padding: var(--spacing-md) var(--spacing-xl)
  border-radius: var(--border-radius-full)
  background-color: var(--color-primary-600)
  color: white
  font-weight: var(--font-weight-semibold)
  text-decoration: none
  transition: all var(--transition-fast)
  box-shadow: var(--shadow-md)

  &:hover
    background-color: var(--color-primary-700)
    transform: translateY(-2px)
    box-shadow: var(--shadow-lg)

  &:active
    transform: translateY(0)
</style>
