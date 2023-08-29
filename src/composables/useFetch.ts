import { appConstants } from '@/config/appConstants'
import { createFetch } from '@vueuse/core'

export const useFetch = createFetch({
  baseUrl: appConstants.API_BASE_URL,
  combination: 'overwrite',
  options: {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      }

      return { options }
    },
    onFetchError(context) {
      console.error(context)

      return context
    }
  }
})
