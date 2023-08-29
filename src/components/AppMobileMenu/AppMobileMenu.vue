<script lang="ts" setup>
import { APP_MAIN_ROUTES } from '@/router'
import { ref, computed } from 'vue'
import SocialLinks from '@/components/SocialLinks/SocialLinks.vue'

const isMenuOpen = ref(false)
const mobileMenuDialog = ref()

const toggleMenu = () => {
  if (isMenuOpen.value) {
    mobileMenuDialog.value?.close()
    isMenuOpen.value = false

    return
  }

  mobileMenuDialog.value?.show()
  isMenuOpen.value = true
}

const isActiveClass = computed(() => {
  return isMenuOpen.value ? 'is-active' : ''
})
</script>

<template>
  <div class="app-mobile-menu">
    <button
      class="hamburger hamburger--arrow"
      :class="isActiveClass"
      type="button"
      aria-label="Menu"
      aria-controls="navigation"
      @click="toggleMenu"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </button>
    <Teleport to="body">
      <dialog ref="mobileMenuDialog" class="app-mobile-dialog">
        <RouterLink
          v-for="(route, index) in APP_MAIN_ROUTES"
          :key="index"
          :to="route.path"
          class="app-mobile-menu-link"
        >
          {{ route.name }}
        </RouterLink>
        <SocialLinks />
      </dialog>
    </Teleport>
  </div>
</template>
<style scoped src="./AppMobileMenu.scss" />
