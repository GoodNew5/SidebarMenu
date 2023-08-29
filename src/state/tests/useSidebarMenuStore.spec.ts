import { expect, it, describe, beforeEach, vi } from 'vitest'
import { makeTree, useSidebarMenuStore } from '@/state/stores/useSidebarMenuStore'
import { useFetchSidebarMenuItemsStore } from '@/state/stores/apiActions/useFetchSidebarMenuItemsStore'
import { setActivePinia, createPinia } from 'pinia'
import type { IMenuListItem, IMenuList } from '@/state/stores/useSidebarMenuStore'

describe('Тестирует useHomePageStore', () => {
  let rawPages: IMenuList = {}
  let updatedPages: IMenuListItem[] = []

  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
    setActivePinia(createPinia())

    updatedPages = [
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
      },
      {
        key: 'capital_vol',
        name: 'Capital vol',
        level: 0,
        link: 'capital-vol.html',
        childPageKeys: ['bronze_gah_whenever'],
        childPages: [
          {
            key: 'bronze_gah_whenever',
            name: 'Bronze gah whenever',
            level: 1,
            link: 'bronze-gah-whenever.html',
            parentKey: 'capital_vol',
            childPageKeys: ['nor_oblong_thanks_pigpen_hydrate'],
            childPages: [
              {
                key: 'nor_oblong_thanks_pigpen_hydrate',
                name: 'Nor oblong thanks pigpen hydrate',
                level: 2,
                link: 'nor-oblong-thanks-pigpen-hydrate.html',
                parentKey: 'bronze_gah_whenever',
                childPageKeys: ['through_definitive_whoever_epitomize_martyr'],
                childPages: [
                  {
                    key: 'through_definitive_whoever_epitomize_martyr',
                    name: 'Through definitive whoever epitomize martyr',
                    level: 3,
                    link: 'through-definitive-whoever-epitomize-martyr.html',
                    parentKey: 'nor_oblong_thanks_pigpen_hydrate',
                    childPageKeys: ['millet_justly_royal'],
                    childPages: [
                      {
                        key: 'millet_justly_royal',
                        name: 'Millet justly royal',
                        level: 4,
                        link: 'millet-justly-royal.html',
                        parentKey: 'through_definitive_whoever_epitomize_martyr',
                        childPageKeys: ['near_oversee_expansionism_heartfelt_zowie'],
                        childPages: [
                          {
                            key: 'near_oversee_expansionism_heartfelt_zowie',
                            name: 'Near oversee expansionism heartfelt zowie',
                            level: 5,
                            link: 'near-oversee-expansionism-heartfelt-zowie.html',
                            parentKey: 'millet_justly_royal'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    rawPages = {
      perfectly_love: {
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
      },
      circa_midst_unimpressively_armpit_brr: {
        key: 'circa_midst_unimpressively_armpit_brr',
        name: 'Circa midst unimpressively armpit brr',
        level: 1,
        link: 'circa-midst-unimpressively-armpit-brr.html',
        parentKey: 'perfectly_love'
      },
      although_composite_display: {
        key: 'although_composite_display',
        name: 'Although composite display',
        level: 1,
        link: 'although-composite-display.html',
        parentKey: 'perfectly_love'
      },
      definite_confute_mmm: {
        key: 'definite_confute_mmm',
        name: 'Definite confute mmm',
        level: 1,
        link: 'definite-confute-mmm.html',
        parentKey: 'perfectly_love'
      },
      scarce_afforest: {
        key: 'scarce_afforest',
        name: 'Scarce afforest',
        level: 1,
        link: 'scarce-afforest.html',
        parentKey: 'perfectly_love'
      },
      capital_vol: {
        key: 'capital_vol',
        name: 'Capital vol',
        level: 0,
        link: 'capital-vol.html',
        childPageKeys: ['bronze_gah_whenever']
      },
      bronze_gah_whenever: {
        key: 'bronze_gah_whenever',
        name: 'Bronze gah whenever',
        level: 1,
        link: 'bronze-gah-whenever.html',
        parentKey: 'capital_vol',
        childPageKeys: ['nor_oblong_thanks_pigpen_hydrate']
      },
      nor_oblong_thanks_pigpen_hydrate: {
        key: 'nor_oblong_thanks_pigpen_hydrate',
        name: 'Nor oblong thanks pigpen hydrate',
        level: 2,
        link: 'nor-oblong-thanks-pigpen-hydrate.html',
        parentKey: 'bronze_gah_whenever',
        childPageKeys: ['through_definitive_whoever_epitomize_martyr']
      },
      through_definitive_whoever_epitomize_martyr: {
        key: 'through_definitive_whoever_epitomize_martyr',
        name: 'Through definitive whoever epitomize martyr',
        level: 3,
        link: 'through-definitive-whoever-epitomize-martyr.html',
        parentKey: 'nor_oblong_thanks_pigpen_hydrate',
        childPageKeys: ['millet_justly_royal']
      },
      millet_justly_royal: {
        key: 'millet_justly_royal',
        name: 'Millet justly royal',
        level: 4,
        link: 'millet-justly-royal.html',
        parentKey: 'through_definitive_whoever_epitomize_martyr',
        childPageKeys: ['near_oversee_expansionism_heartfelt_zowie']
      },
      near_oversee_expansionism_heartfelt_zowie: {
        key: 'near_oversee_expansionism_heartfelt_zowie',
        name: 'Near oversee expansionism heartfelt zowie',
        level: 5,
        link: 'near-oversee-expansionism-heartfelt-zowie.html',
        parentKey: 'millet_justly_royal'
      }
    }
  })

  describe('Тестирует getSidebarMenuItems', () => {
    it('Проверяет, что getSidebarMenuItems прервет выполнение вернув undefined если не удалось получить данные', async () => {
      const responseMocked = { data: { value: { pages: null } } }
      const mockFetchSidebarMenuItems = vi.fn().mockResolvedValue(responseMocked)
      const useFetchSidebarMenu = useFetchSidebarMenuItemsStore()

      useFetchSidebarMenu.fetchSidebarMenuItems = mockFetchSidebarMenuItems

      const homePageStore = useSidebarMenuStore()
      const result = await homePageStore.getSidebarMenuItems()

      expect(result).toBeNull()
    })

    it('Проверяет, что getSidebarMenuItems завершает свое выполнение и обновит sidebarMenuItems', async () => {
      const responseMocked = { data: { value: { pages: rawPages } } }
      const mockFetchSidebarMenuItems = vi.fn().mockResolvedValue(responseMocked)
      const useFetchSidebarMenu = useFetchSidebarMenuItemsStore()

      useFetchSidebarMenu.fetchSidebarMenuItems = mockFetchSidebarMenuItems

      const homePageStore = useSidebarMenuStore()
      await homePageStore.getSidebarMenuItems()

      expect(homePageStore.$state.sidebarMenuItems).toStrictEqual(updatedPages)
    })
  })

  describe('Тестирует функцию makeTree', () => {
    it('Проверяет что функция makeTree преобразует rawPages в updatedPages 1', () => {
      expect(makeTree(rawPages)).toEqual(updatedPages)
    })

    it('Проверяет что функция makeTree преобразует rawPages в updatedPages 2', () => {
      rawPages = {
        perfectly_love: {
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
        },
        circa_midst_unimpressively_armpit_brr: {
          key: 'circa_midst_unimpressively_armpit_brr',
          name: 'Circa midst unimpressively armpit brr',
          level: 1,
          link: 'circa-midst-unimpressively-armpit-brr.html',
          parentKey: 'perfectly_love'
        },
        although_composite_display: {
          key: 'although_composite_display',
          name: 'Although composite display',
          level: 1,
          link: 'although-composite-display.html',
          parentKey: 'perfectly_love'
        },
        definite_confute_mmm: {
          key: 'definite_confute_mmm',
          name: 'Definite confute mmm',
          level: 1,
          link: 'definite-confute-mmm.html',
          parentKey: 'perfectly_love'
        },
        scarce_afforest: {
          key: 'scarce_afforest',
          name: 'Scarce afforest',
          level: 1,
          link: 'scarce-afforest.html',
          parentKey: 'perfectly_love'
        }
      }

      updatedPages = [
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

      expect(makeTree(rawPages)).toEqual(updatedPages)
    })
  })

  describe('Тестирует getter isSidebarMenuItemsEmpty', () => {
    it('Проверяет что getter isSidebarMenuItemsEmpty возвращает false если sidebarMenuItems НЕ пустой', () => {
      const homePageStore = useSidebarMenuStore()
      homePageStore.sidebarMenuItems = updatedPages

      expect(homePageStore.isSidebarMenuItemsEmpty).toBe(false)
    })

    it('Проверяет что getter isSidebarMenuItemsEmpty возвращает true если sidebarMenuItems пустой', () => {
      const homePageStore = useSidebarMenuStore()
      homePageStore.sidebarMenuItems = []

      expect(homePageStore.isSidebarMenuItemsEmpty).toBe(true)
    })
  })
})
