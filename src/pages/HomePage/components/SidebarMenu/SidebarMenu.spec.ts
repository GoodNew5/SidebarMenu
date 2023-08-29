import SidebarMenu from './SidebarMenu.vue'
import { mount } from '@vue/test-utils'
import { expect, it, describe, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('Тестирует SidebarMenu', () => {
  beforeEach(() => {
    const pinia = createPinia()

    setActivePinia(pinia)
  })

  it('Тестирует snapshot компонента', () => {
    const menuItems = [
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
        ],
        childPages: [
          {
            key: 'circa_midst_unimpressively_armpit_brr',
            name: 'Circa midst unimpressively armpit brr',
            level: 1,
            link: 'circa-midst-unimpressively-armpit-brr.html',
            parentKey: 'perfectly_love'
          },
          {
            key: 'although_composite_display',
            name: 'Although composite display',
            level: 1,
            link: 'although-composite-display.html',
            parentKey: 'perfectly_love'
          },
          {
            key: 'definite_confute_mmm',
            name: 'Definite confute mmm',
            level: 1,
            link: 'definite-confute-mmm.html',
            parentKey: 'perfectly_love'
          },
          {
            key: 'scarce_afforest',
            name: 'Scarce afforest',
            level: 1,
            link: 'scarce-afforest.html',
            parentKey: 'perfectly_love'
          }
        ]
      }
    ]

    const Wrapper = mount(SidebarMenu, {
      props: {
        menuItems
      }
    })

    expect(Wrapper).toMatchSnapshot()
  })
})
