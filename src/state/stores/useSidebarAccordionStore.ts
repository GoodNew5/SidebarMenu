import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSidebarAccordionStore = defineStore('useSidebarAccordionStore', () => {
  const clickedMenuItemKey = ref('')

  const setMenuItemKey = (key: string) => {
    clickedMenuItemKey.value = key
  }

  const checkOnActive = (listItemKey: string) => {
    return clickedMenuItemKey.value === listItemKey
  }

  return {
    clickedMenuItemKey,
    setMenuItemKey,
    checkOnActive
  }
})

export { useSidebarAccordionStore }
