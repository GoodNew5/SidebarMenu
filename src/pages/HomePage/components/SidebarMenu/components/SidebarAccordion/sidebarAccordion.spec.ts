import { it, describe, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SidebarAccordion from './SidebarAccordion.vue'
import { createTestingPinia } from '@pinia/testing'
import { createPinia, setActivePinia } from 'pinia'
import { h } from 'vue'

createTestingPinia({ createSpy: vi.fn })

describe('Тестирует компонент SidebarAccordion', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()

    setActivePinia(createPinia())
  })

  const createComponent = (props?: any, mountFn = mount) =>
    mountFn(SidebarAccordion, {
      props,
      slots: {
        title: h('div', {}, 'Title Slot'),
        conent: h('div', {}, 'Content Slot')
      }
    })

  it('Тестирует snapshot компонента', () => {
    const props = {
      level: 0,
      isCollapsible: true,
      listItemKey: 'perfectly_love'
    }

    const component = createComponent(props)

    expect(component).toMatchSnapshot()
  })

  describe('Тестирует CSS классы', () => {
    it('Компонент SidebarAccordion должен иметь класс sidebar-accordion-is-collapsible', () => {
      const props = {
        level: 0,
        isCollapsible: true,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      expect(component.find('.sidebar-accordion').classes()).toContain(
        'sidebar-accordion-is-collapsible'
      )
    })

    it('Компонент SidebarAccordion НЕ должен иметь класс sidebar-accordion-is-collapsible', () => {
      const props = {
        level: 0,
        isCollapsible: false,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      expect(component.find('.sidebar-accordion').classes()).not.toContain(
        'sidebar-accordion-is-collapsible'
      )
    })

    it('Компонент SidebarAccordion должен иметь класс sidebar-accordion-0-level ', () => {
      const props = {
        level: 0,
        isCollapsible: false,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      expect(component.find('.sidebar-accordion').classes()).toContain('sidebar-accordion-0-level')
    })

    it('Компонент SidebarAccordion должен иметь класс sidebar-accordion-1-level ', () => {
      const props = {
        level: 1,
        isCollapsible: false,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      expect(component.find('.sidebar-accordion').classes()).toContain('sidebar-accordion-1-level')
    })

    it('Компонент SidebarAccordion должен иметь класс sidebar-accordion-item-is-active если текущий элемент был кликнут ', async () => {
      const props = {
        level: 1,
        isCollapsible: false,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      await component.find('.sidebar-accordion-item').trigger('click')

      expect(component.find('.sidebar-accordion').classes()).toContain(
        'sidebar-accordion-item-is-active'
      )
    })

    it('Компонент SidebarAccordion НЕ должен иметь класс sidebar-accordion-item-is-active если текущий элемент НЕ был кликнут', () => {
      const props = {
        level: 1,
        isCollapsible: false,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      expect(component.find('.sidebar-accordion').classes()).not.toContain(
        'sidebar-accordion-item-is-active'
      )
    })

    describe('Тестирует переключение класса sidebar-accordion-item-is-open', () => {
      it('Клик по sidebar-accordion-item добавляет класс sidebar-accordion-is-open', async () => {
        const props = {
          level: 1,
          isCollapsible: true,
          listItemKey: 'perfectly_love'
        }

        const component = createComponent(props)

        await component.find('.sidebar-accordion-item').trigger('click')

        expect(component.find('.sidebar-accordion').classes()).toContain(
          'sidebar-accordion-is-open'
        )
      })

      it('Повторный клик по sidebar-accordion-item убирает класс sidebar-accordion-is-open', async () => {
        const props = {
          level: 1,
          isCollapsible: true,
          listItemKey: 'perfectly_love'
        }

        const component = createComponent(props)

        await component.find('.sidebar-accordion-item').trigger('click')
        await component.find('.sidebar-accordion-item').trigger('click')

        expect(component.find('.sidebar-accordion').classes()).not.toContain(
          'sidebar-accordion-is-open'
        )
      })
    })
  })

  describe('Тестирует sidebar-accordion-arrow-button', () => {
    it('Проверяет, что sidebar-accordion-arrow-button нет в DOM поскольку isCollapsible=false что означает отсутствие детей в списке', async () => {
      const props = {
        level: 1,
        isCollapsible: false,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      expect(component.find('.sidebar-accordion-arrow-button').exists()).toBe(false)
    })

    it('Проверяет, что sidebar-accordion-arrow-button есть в DOM поскольку isCollapsible=true что означает наличие детей в списке', async () => {
      const props = {
        level: 1,
        isCollapsible: true,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      expect(component.find('.sidebar-accordion-arrow-button').exists()).toBe(true)
    })
  })

  describe('Тестирует аттрибуты', () => {
    it('Компонент SidebarAccordion должен иметь style со значением --sidebar-accordion-level: 0;', () => {
      const props = {
        level: 0,
        isCollapsible: false,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)
      expect(component.find('.sidebar-accordion').attributes().style).toBe(
        '--sidebar-accordion-level: 0;'
      )
    })

    it('Компонент SidebarAccordion должен иметь style со значением --sidebar-accordion-level: 10;', () => {
      const props = {
        level: 10,
        isCollapsible: false,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)
      expect(component.find('.sidebar-accordion').attributes().style).toBe(
        '--sidebar-accordion-level: 10;'
      )
    })
  })

  it('Тестирует установку emit(handleAccordionClickItem)', async () => {
    const props = {
      level: 1,
      isCollapsible: false,
      listItemKey: 'perfectly_love'
    }

    const component = createComponent(props)

    component.find('.sidebar-accordion-item').trigger('click')

    expect(component.emitted()).toHaveProperty('handleAccordionClickItem')
  })

  describe('Тестирует видимость вложенного списка', () => {
    it('sidebar-accordion-content присутствует если мы кликнули на sidebar-accordion-arrow-button', async () => {
      const props = {
        level: 1,
        isCollapsible: true,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      await component.find('.sidebar-accordion-arrow-button').trigger('click')

      expect(component.find('.sidebar-accordion-content').exists()).toBe(true)
    })

    it('sidebar-accordion-content должен быть удален из DOM если мы повторно кликнули на sidebar-accordion-arrow-button', async () => {
      const props = {
        level: 1,
        isCollapsible: true,
        listItemKey: 'perfectly_love'
      }

      const component = createComponent(props)

      await component.find('.sidebar-accordion-arrow-button').trigger('click')
      await component.find('.sidebar-accordion-arrow-button').trigger('click')

      expect(component.find('.sidebar-accordion-content').exists()).toBe(false)
    })
  })
})
