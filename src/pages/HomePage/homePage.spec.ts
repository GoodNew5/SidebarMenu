import { expect, vi, describe, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from './HomePage.vue'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia, createPinia } from 'pinia'
import { useSidebarMenuStore } from '@/state'

const $reset = vi.fn()

const createComponent = (state?: Record<string, any>) => {
  const Wrapper = mount(HomePage, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: state,
          stubReset: true
        })
      ],
      mocks: $reset
    }
  })

  return Wrapper
}

describe('Тестирует страницу HomePage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Тестирует snapshot компонента', () => {
    expect(createComponent()).toMatchSnapshot()
  })

  it('Проверяет, что метод getSidebarMenuItems вызывается когда компонент отрисовался', () => {
    createComponent()

    const store = useSidebarMenuStore()

    expect(store.getSidebarMenuItems).toHaveBeenCalled()
  })

  it('Проверяет, что метод store.$reset вызывается когда компонент удален из DOM дерева', () => {
    const Wrapper = createComponent()

    Wrapper.unmount()

    const store = useSidebarMenuStore()

    expect(store.$reset).toHaveBeenCalled()
  })

  describe('Тестирует поведение SidebarMenu', () => {
    it('Проверяет, что компонент SidebarMenu отрисовался если массив sidebarMenuItems НЕ пустой', () => {
      const sidebarMenuItemsMock = [
        {
          key: 'perfectly_love',
          name: 'Perfectly love',
          level: 0,
          link: 'perfectly-love.html',
          childPageKeys: [
            'circa_midst_unimpressively_armpit_brr',
            'although_composite_display',
            'definite_confute_mmm',
            'scarce_afforest'
          ]
        }
      ]

      const Wrapper = createComponent({
        useSidebarMenuStore: {
          sidebarMenuItems: sidebarMenuItemsMock
        }
      })

      expect(Wrapper.find('.sidebar-accordion').exists()).toBeTruthy()
    })

    it('Проверяет, что компонент SidebarMenu НЕ отрисовался если массив sidebarMenuItems пустой', () => {
      const Wrapper = createComponent({
        useSidebarMenuStore: {
          sidebarMenuItems: []
        }
      })

      expect(Wrapper.find('.sidebar-accordion').exists()).toBeFalsy()
    })
  })

  describe('Тестирует поведение skeleton', () => {
    it('Проверяет, что компонент skeleton отрисовался если isLoadingSidebarMenuItems === true', () => {
      const Wrapper = createComponent({
        useSidebarMenuStore: {
          isLoadingSidebarMenuItems: true
        }
      })

      expect(Wrapper.find('.skeleton').exists()).toBeTruthy()
    })

    it('Проверяет, что компонент Preloader НЕ отрисовался если isLoadingSidebarMenuItems === false', () => {
      const Wrapper = createComponent({
        useSidebarMenuStore: {
          isLoadingSidebarMenuItems: false
        }
      })

      expect(Wrapper.find('.skeleton').exists()).toBeFalsy()
    })
  })
})
