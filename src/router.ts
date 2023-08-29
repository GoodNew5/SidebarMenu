import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage/HomePage.vue'
import NotFound from './pages/NotFoundPage/NotFoundPage.vue'
import { appConstants } from '@/config/appConstants'

const APP_ROUTES = [
  {
    path: appConstants.ROUTES.HOME_PAGE.PATH,
    name: appConstants.ROUTES.HOME_PAGE.NAME,
    component: HomePage
  },
  {
    path: appConstants.ROUTES.MY_SKILLS.PATH,
    name: appConstants.ROUTES.MY_SKILLS.NAME,
    component: HomePage
  },
  {
    path: appConstants.ROUTES.CONTACTS.PATH,
    name: appConstants.ROUTES.CONTACTS.NAME,
    component: HomePage
  },
  {
    path: appConstants.ROUTES.NOT_FOUND_PAGE.PATH,
    name: appConstants.ROUTES.NOT_FOUND_PAGE.NAME,
    component: NotFound
  }
]

const APP_MAIN_ROUTES = APP_ROUTES.filter(
  (route) => route.name !== appConstants.ROUTES.NOT_FOUND_PAGE.NAME
).map((route) => ({ name: route.name, path: route.path }))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: APP_ROUTES
})

export { router, APP_ROUTES, APP_MAIN_ROUTES }
