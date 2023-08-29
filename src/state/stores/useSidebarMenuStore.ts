import { defineStore, storeToRefs } from 'pinia'
import { useFetchSidebarMenuItemsStore } from '@/state/stores/apiActions/useFetchSidebarMenuItemsStore'
import { ref, computed } from 'vue'
import type { IResponseMenuItem } from '@/state/stores/apiActions/useFetchSidebarMenuItemsStore'

interface IMenuListItem extends IResponseMenuItem {
  childPages?: IMenuListItem[]
}

type IMenuList = Record<string, IResponseMenuItem>

const makeTree = (sidebarMenuItems: IMenuList): IMenuListItem[] => {
  const tree = []
  const treeCopy = { ...sidebarMenuItems }

  for (const key in treeCopy) {
    const children = treeCopy[key]

    if (children.parentKey) {
      const parentPage: IMenuListItem = treeCopy[children.parentKey]

      if (!parentPage.childPages) {
        parentPage.childPages = []
      }

      parentPage.childPages.push(children)
    } else {
      tree.push(children)
    }
  }

  return tree
}

const useSidebarMenuStore = defineStore('useSidebarMenuStore', () => {
  const useFetchSidebarMenu = useFetchSidebarMenuItemsStore()
  const { isLoadingSidebarMenuItems } = storeToRefs(useFetchSidebarMenu)
  const { fetchSidebarMenuItems } = useFetchSidebarMenu
  const sidebarMenuItems = ref<IMenuListItem[]>([])

  const getSidebarMenuItems = async () => {
    try {
      const response = await fetchSidebarMenuItems()
      const data: IMenuList = response?.data.value?.pages

      if (!data) return null

      sidebarMenuItems.value = makeTree(data)
    } catch (error) {
      console.error(error)
    }
  }

  const isSidebarMenuItemsEmpty = computed(() => !sidebarMenuItems.value.length)

  return {
    isSidebarMenuItemsEmpty,
    isLoadingSidebarMenuItems,
    getSidebarMenuItems,
    sidebarMenuItems
  }
})

export { makeTree, useSidebarMenuStore }
export type { IMenuListItem, IMenuList }
