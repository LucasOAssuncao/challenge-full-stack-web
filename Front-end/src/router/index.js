import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const isAuthenticated = () => {
  return !!localStorage.getItem('user-token')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  const publicRoutes = ['/auth/login', '/auth/register'];

  if (!isAuthenticated() && !publicRoutes.includes(to.path)) {
    next('/auth/login');
  } else if (isAuthenticated() && to.path === '/auth/login') {
    next('/dashboard');
  } else {
    next();
  }
});

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
