import { it, describe, beforeEach, vi, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSidebarAccordionStore } from '@/state/stores/useSidebarAccordionStore'

describe('Тестирует SidebarAccordionStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
    setActivePinia(createPinia())
  })

  it('Проверяет, что функция устанавливает переданное значение setMenuItemKey', () => {
    const mockValue = 'perfectly_love'
    const store = useSidebarAccordionStore()

    store.setMenuItemKey(mockValue)

    expect(store.clickedMenuItemKey).toBe(mockValue)
  })

  describe('Тестирует функцию checkOnActive', () => {
    it('Проверяет, что функция возвращает true если переданное ей значение идентично clickedMenuItemKey', () => {
      const mockValue = 'Best of the best'
      const clickedMenuItemKeyMockedValue = 'Best of the best'
      const store = useSidebarAccordionStore()

      store.clickedMenuItemKey = clickedMenuItemKeyMockedValue

      expect(store.checkOnActive(mockValue)).toBe(true)
    })

    it('Проверяет, что функция возвращает false если переданное ей значение НЕ идентично clickedMenuItemKey', () => {
      const mockValue = 'Frontend world is the best'
      const clickedMenuItemKey = 'Best of the best'
      const store = useSidebarAccordionStore()

      store.clickedMenuItemKey = clickedMenuItemKey

      expect(store.checkOnActive(mockValue)).toBe(false)
    })
  })
})
