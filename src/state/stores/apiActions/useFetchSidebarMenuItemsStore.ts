import { apiEndpoints } from '@/config/apiEndpoints'
import { useFetch } from '@/composables/useFetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const syntheticDelay = () => new Promise((resolve) => setTimeout(resolve, 500))

interface IResponseMenuItem {
  key: string
  name: string
  level: number
  link: string
  parentKey?: string | null
  childPageKeys?: string[]
}

const useFetchSidebarMenuItemsStore = defineStore('useFetchSidebarMenuItemsStore', () => {
  const isLoadingSidebarMenuItems = ref(false)

  const fetchSidebarMenuItems = async () => {
    try {
      isLoadingSidebarMenuItems.value = true

      await syntheticDelay()

      const { data, isFetching } = await useFetch(apiEndpoints.SIDEBAR_MENU_ITEMS).get().json()

      isLoadingSidebarMenuItems.value = isFetching.value

      return {
        data,
        isLoadingSidebarMenuItems
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoadingSidebarMenuItems.value = false
    }
  }

  return {
    fetchSidebarMenuItems,
    isLoadingSidebarMenuItems
  }
})

export { useFetchSidebarMenuItemsStore }
export type { IResponseMenuItem }
