<script lang="ts" setup>
import { useSidebarMenuStore } from '@/state'
import { storeToRefs } from 'pinia'
import SidebarMenu from './components/SidebarMenu/SidebarMenu.vue'
import { onMounted, onBeforeUnmount, computed, ref } from 'vue'
import SidebarMenuSkeleton from './components/SidebarMenuSkeleton/SidebarMenuSkeleton.vue'
import SvgIcon from '@/baseComponents/SvgIcon/SvgIcon.vue'
import { useBreakpointsStore } from '@/state/stores/base/useBreakpointsStore'
import SocialLinks from '@/components/SocialLinks/SocialLinks.vue'

const store = useSidebarMenuStore()
const { isLoadingSidebarMenuItems, sidebarMenuItems, isSidebarMenuItemsEmpty } = storeToRefs(store)
const { getSidebarMenuItems } = store
const skeletons = computed(() => new Array(16).fill(''))
const isEasterEggShown = ref(false)
const breakpoints = useBreakpointsStore()

const { isHands, isLap } = storeToRefs(breakpoints)

onMounted(() => {
  getSidebarMenuItems()
})

onBeforeUnmount(() => {
  store.$reset()
})
</script>

<template>
  <div class="home-page">
    <div class="home-page-sidebar">
      <template v-if="isLoadingSidebarMenuItems">
        <SidebarMenuSkeleton v-for="(_, index) in skeletons" :key="index" />
      </template>

      <SidebarMenu v-if="!isSidebarMenuItemsEmpty" :menu-items="sidebarMenuItems" />
      <div v-else-if="!isLoadingSidebarMenuItems" class="home-page-disclaimer">
        Здесь ничего нет
        <span class="home-page-emoji"> 🙅‍♂️ </span>
      </div>
    </div>
    <div class="home-page-content">
      <div v-if="isHands && !isEasterEggShown" class="home-page-show-easter-wrapper">
        <div class="home-page-show-easter">
          <SvgIcon name="me" class="home-page-illustration" />
        </div>
        <div class="home-page-show-easter-button-wrapper">
          <SocialLinks v-if="isLap && !isEasterEggShown" />
          <button class="home-page-show-easter-button" @click="isEasterEggShown = true">
            Bonus
          </button>
        </div>
      </div>
      <iframe
        v-if="isEasterEggShown && isHands"
        class="home-page-iframe"
        src="https://codesandbox.io/embed/test-work-59fk9?fontsize=14&hidenavigation=1&theme=dark"
        style="width: 100%; height: 500px; border: 0; border-radius: 4px; overflow: hidden"
        title="Test Work"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  </div>
</template>
<style scoped src="./HomePage.scss" />
