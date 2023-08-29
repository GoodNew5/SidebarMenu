import { useMediaQuery } from '@vueuse/core'
import { ref } from 'vue'
import scssBreakpoints from '@/styles/breakpoints.scss?inline'
import { defineStore } from 'pinia'

export interface Breakpoints {
  LAP: string
  TO_LAP: string
  DESK: string
  TO_DESK: string
  HANDS: string
  TO_HANDS: string
}

const scssVariablesToJSObject = () => {
  const result = {} as Breakpoints
  const regex = /(\n|\s|{|}|:export|;\s*}$)/g

  return scssBreakpoints
    .replace(regex, '')
    .split(';')
    .reduce((acc, item) => {
      return Object.assign(acc, {
        [item.split(':')[0]]: item.split(':')[1]
      })
    }, result)
}

const breakpoints = scssVariablesToJSObject()

const LAP = useMediaQuery(`(min-width: ${breakpoints.LAP})`)
const TO_LAP = useMediaQuery(`(max-width: ${breakpoints.TO_LAP})`)
const DESK = useMediaQuery(`(min-width: ${breakpoints.DESK})`)
const TO_DESK = useMediaQuery(`(max-width: ${breakpoints.TO_DESK})`)
const HANDS = useMediaQuery(`(min-width: ${breakpoints.HANDS})`)
const TO_HANDS = useMediaQuery(`(max-width: ${breakpoints.TO_HANDS})`)

export const useBreakpointsStore = defineStore('useBreakpointsStore', () => {
  const isLap = ref(LAP)
  const isToLap = ref(TO_LAP)
  const isDesk = ref(DESK)
  const isToDesk = ref(TO_DESK)
  const isHands = ref(HANDS)
  const isToHands = ref(TO_HANDS)

  return { isLap, isToLap, isDesk, isToDesk, isHands, isToHands }
})
