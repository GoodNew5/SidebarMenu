<script lang="ts" setup>
import { ref, computed } from 'vue'
import Icon from '@/baseComponents/SvgIcon/SvgIcon.vue'
import { useSidebarAccordionStore } from '@/state'

interface IProps {
  level: number
  isCollapsible: boolean
  listItemKey: string
}

const isOpen = ref(false)
const props = defineProps<IProps>()
const { level, isCollapsible, listItemKey } = props
const emit = defineEmits(['handleAccordionClickItem'])
const store = useSidebarAccordionStore()
const { setMenuItemKey, checkOnActive } = store

const openSubItems = () => (isOpen.value = !isOpen.value)

const handleAccordionClickItem = () => {
  emit('handleAccordionClickItem')

  setMenuItemKey(listItemKey)

  if (!isCollapsible) return

  openSubItems()
}

const isOpenClass = computed(() => (isOpen.value ? 'sidebar-accordion-is-open' : ''))
const isCollapsibleClass = computed(() => (isCollapsible ? 'sidebar-accordion-is-collapsible' : ''))
const isActiveClass = computed(() =>
  checkOnActive(listItemKey) ? 'sidebar-accordion-item-is-active' : ''
)
const accordionLevelCustomProperty = computed(() => `--sidebar-accordion-level: ${level}`)
</script>

<template>
  <div
    class="sidebar-accordion"
    :style="accordionLevelCustomProperty"
    :class="[`sidebar-accordion-${level}-level`, isOpenClass, isCollapsibleClass, isActiveClass]"
  >
    <div role="button" class="sidebar-accordion-item" @click.stop="handleAccordionClickItem">
      <div class="sidebar-accordion-header">
        <div v-if="isCollapsible" class="sidebar-accordion-arrow-button" role="button">
          <Icon name="arrow" class="sidebar-accordion-icon" />
        </div>
        <slot name="title" />
      </div>
    </div>
    <div v-if="isOpen" class="sidebar-accordion-content">
      <slot name="content" />
    </div>
  </div>
</template>
<style scoped src="./SidebarAccordion.scss" />
