<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { APP_MAIN_ROUTES } from '@/router'
import { useBreakpointsStore } from '@/state/stores/base/useBreakpointsStore'
import SvgIcon from '@/baseComponents/SvgIcon/SvgIcon.vue'
import AppMobileMenu from '@/components/AppMobileMenu/AppMobileMenu.vue'

const breakpoints = useBreakpointsStore()
const { isToLap } = storeToRefs(breakpoints)
</script>
<template>
  <div class="app-layout">
    <header class="app-header">
      <RouterLink class="app-logo-link" to="/">
        <SvgIcon class="app-logo" name="logo" />
      </RouterLink>
      <AppMobileMenu v-if="isToLap" />
      <div v-else class="app-header-menu">
        <RouterLink
          v-for="(route, index) in APP_MAIN_ROUTES"
          :key="index"
          :to="route.path"
          class="app-menu-link"
        >
          <span class="app-menu-link-text">
            {{ route.name }}
          </span>
        </RouterLink>
      </div>
    </header>
    <main class="app-content">
      <slot></slot>
    </main>
    <footer class="app-footer">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto provident iusto placeat
      eveniet quidem quaerat tempore, fugit veniam tenetur culpa a quisquam nam numquam iste vitae
      magni? Ipsa aperiam, labore sint laborum temporibus consequuntur. Dicta repellat, nisi
      assumenda nam reprehenderit tempora error expedita totam voluptas magni, explicabo numquam?
      Neque aspernatur impedit sequi repudiandae rem est omnis pariatur fugit excepturi nobis
      doloribus labore sed exercitationem tempora tenetur in ipsam error cupiditate, consectetur
      enim alias velit fuga modi perspiciatis. Unde qui est sed error, eum fugit, non consequuntur,
      sunt ducimus sequi quam quibusdam hic cumque quisquam nulla laboriosam. Repudiandae obcaecati
      et tenetur deleniti enim explicabo labore aperiam accusamus ea, adipisci quibusdam commodi,
      hic laudantium libero, optio asperiores quisquam odio? Nihil laboriosam ab minus nostrum porro
      illum. Fugiat excepturi dicta et cumque nemo expedita nihil accusantium sit quisquam voluptas
      magni nobis necessitatibus fugit, veritatis iusto quis sapiente iste ex! Ut accusamus eius
      iure.
    </footer>
  </div>
</template>
<style scoped src="./AppLayout.scss" />
