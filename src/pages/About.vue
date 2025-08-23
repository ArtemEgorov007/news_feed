<template>
  <div class="about-page">
    <div class="about-page__container">
      <div class="about-page__header">
        <h1 class="about-page__title">About Our Vue.js Project</h1>
        <p class="about-page__subtitle">Crafted with passion and modern technologies</p>
      </div>

      <div class="about-page__content">
        <div class="about-page__section">
          <h2 class="about-page__section-title">Our Mission</h2>
          <p class="about-page__text">
            We strive to create beautiful, productive, and user-friendly web applications using the latest Vue.js
            ecosystem. Our goal is to provide exceptional digital capabilities that exceed expectations.

            One example is our To-Do List mini-application: a compact but functional tool that allows you to add posts,
            sort them, search, drag and drop tasks, select and delete multiple items at once. This solution demonstrates
            ease of use, attention to detail, and thoughtful architecture.

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
  min-height: 100svh
  padding: clamp(3.75rem, 3.5rem + 1.25vw, 5rem) clamp(1rem, 0.7rem + 1.5vw, 2.5rem) clamp(6.25rem, 7rem + -3.75vw, 2.5rem) clamp(1rem, 0.7rem + 1.5vw, 2.5rem)

.about-page__container
  max-width: 800px
  height: calc(100% - 69px)
  margin: 0 auto
  background: rgba(255, 255, 255, 0.95)
  border-radius: 16px
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1)
  overflow: hidden

.about-page__header
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
  color: white
  padding: clamp(1.875rem, 1.5rem + 1.875vw, 3.75rem) clamp(1.25rem, 1rem + 1.25vw, 2.5rem)
  text-align: center

.about-page__title
  font-size: 2.5rem
  font-weight: 300
  margin: 0 0 15px 0
  letter-spacing: -0.5px

.about-page__subtitle
  font-size: 1.2rem
  opacity: 0.9
  margin: 0
  font-weight: 300

.about-page__content
  padding: clamp(1.25rem, 1rem + 1.25vw, 2.5rem)

.about-page__section
  margin-bottom: 40px

  &:last-child
    margin-bottom: 0

.about-page__section-title
  color: #333
  font-size: 1.8rem
  margin-bottom: 20px
  font-weight: 400

.about-page__text
  color: #666
  font-size: 1.1rem
  line-height: 1.7
  margin: 0

.about-page__tech-stack
  display: flex
  flex-wrap: wrap
  gap: 12px

.about-page__tech-item
  background: #667eea
  color: white
  padding: 8px 16px
  border-radius: 20px
  font-size: 0.9rem
  font-weight: 500

.about-page__cta
  text-align: center
  margin-top: 30px
</style>
