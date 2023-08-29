<script lang="ts" setup>
import SidebarAccordion from './components/SidebarAccordion/SidebarAccordion.vue'
import type { IMenuListItem } from '@/state'

const props = defineProps<{ menuItems: IMenuListItem[] }>()
const { menuItems } = props
</script>
<template>
  <SidebarAccordion
    v-for="listItem in menuItems"
    :key="listItem.name"
    :is-collapsible="!!listItem.childPages"
    :level="listItem.level"
    :list-item-key="listItem.key"
  >
    <template #title>
      {{ listItem.name }}
    </template>
    <template #content>
      <SidebarMenu v-if="listItem.childPages" :menu-items="listItem.childPages" />
    </template>
  </SidebarAccordion>
</template>
<style scoped src="./SidebarMenu.scss" />
