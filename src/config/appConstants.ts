export const appConstants = {
  ROUTES: {
    HOME_PAGE: {
      NAME: 'Home',
      PATH: '/'
    },
    MY_SKILLS: {
      NAME: 'My Skills',
      PATH: '/skills'
    },
    CONTACTS: {
      NAME: 'Contacts',
      PATH: '/contacts'
    },
    NOT_FOUND_PAGE: {
      NAME: 'NotFound',
      PATH: '/:pathMatch(.*)*'
    }
  },
  API_BASE_URL: import.meta.env.VITE_BASE_URL
}
