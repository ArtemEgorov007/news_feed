<template>
  <nav class="navbar" :class="{ 'navbar--bottom': isBottom }" role="navigation" aria-label="Main">
    <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :class="{ 'navbar__link--active': isActive(item) }"
        :aria-label="item.label"
        class="navbar__link"
    >
      <Icon :icon="item.icon" class="navbar__icon"/>
      <span class="navbar__label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import {computed} from 'vue'

import {useRoute} from 'vue-router'
import {Icon} from '@iconify/vue'

const navItems = [
  {path: '/', label: 'Main', icon: 'mdi:home-variant-outline'},
  {path: '/posts', label: 'Post', icon: 'mdi:post-outline'},
  {path: '/about', label: 'About', icon: 'mdi:account-circle-outline'},
  // {path: '/composition', label: 'Compos', icon: 'mdi:post-outline'},
]

const route = useRoute()
const isActive = (item) => {
  if (item.path === '/') return route.path === '/'
  return route.path.startsWith(item.path)
}

const isBottom = computed(() => window.matchMedia('(max-width: 768px)').matches)
</script>

<style lang="sass" scoped>
.navbar
  position: sticky
  top: 0
  z-index: 1000
  display: flex
  align-items: center
  justify-content: center
  gap: 20px
  padding: 10px 16px
  backdrop-filter: blur(6px)
  background: rgba(255, 255, 255, 0.75)
  border-bottom: 1px solid rgba(0, 0, 0, 0.06)

  .navbar__link
    display: inline-flex
    align-items: center
    gap: 10px
    text-decoration: none
    color: #4b5563
    padding: 8px 12px
    border-radius: 10px
    transition: color .2s ease, background-color .2s ease, transform .15s ease
    will-change: transform, background-color

    &:hover
      color: #111827
      background: rgba(0, 0, 0, 0.04)

    &.navbar__link--active
      color: #16a34a
      background: rgba(22, 163, 74, 0.1)

  .navbar__icon
    width: 20px
    height: 20px

  .navbar__label
    font-size: .95rem
    line-height: 1

@media (max-width: 768px)
  .navbar
    position: fixed
    left: 0
    right: 0
    bottom: 0
    top: auto
    border-top: 1px solid rgba(0, 0, 0, 0.06)
    border-bottom: none
    justify-content: space-around
    padding: 8px calc(16px + env(safe-area-inset-right)) calc(8px + env(safe-area-inset-bottom)) calc(16px + env(safe-area-inset-left))

    .navbar__link
      flex-direction: column
      gap: 4px
      padding: 6px 10px
      border-radius: 12px
      min-width: clamp(2.75rem, 2.5rem + 1.25vw, 4rem)

      &:active
        transform: translateY(1px)

    .navbar__icon
      width: 24px
      height: 24px

    .navbar__label
      font-size: .75rem
      line-height: 1
</style>
