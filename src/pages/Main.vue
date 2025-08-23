<template>
  <div class="main-page">
    <div class="main-page__container">
      <h1 class="main-page__title">Welcome to Vue App</h1>

      <div class="main-page__links">
        <router-link to="/posts" class="main-page__link">
          View Posts
        </router-link>

        <router-link to="/about" class="main-page__link">
          About Us
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style lang="sass" scoped>
.main-page
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
  padding: 20px

.main-page__container
  text-align: center
  background: rgba(255, 255, 255, 0.95)
  padding: 60px 40px
  border-radius: 16px
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1)
  backdrop-filter: blur(10px)
  max-width: 500px
  width: 100%

.main-page__title
  color: #333
  font-size: 2.5rem
  margin-bottom: 40px
  font-weight: 300
  letter-spacing: -0.5px

.main-page__links
  display: flex
  flex-direction: column
  gap: 20px

.main-page__link
  display: inline-block
  padding: 15px 30px
  background: linear-gradient(135deg, #4CAF50, #45a049)
  color: white
  text-decoration: none
  border-radius: 8px
  font-size: 1.1rem
  font-weight: 500
  transition: all 0.3s ease
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3)

  &:hover
    transform: translateY(-3px)
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4)
    background: linear-gradient(135deg, #45a049, #3d8b40)

  &:active
    transform: translateY(-1px)

  &:focus
    outline: none
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3), 0 0 0 3px rgba(76, 175, 80, 0.2)
</style>
