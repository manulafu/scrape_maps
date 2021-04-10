
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
    	{ path: '', component: () => import('pages/Index.vue'), name: 'index' },
	    { path: 'api/', component: () => import('pages/Api.vue'), name: 'api' },
	    { path: 'servicios/', component: () => import('pages/Servicios.vue'), name: 'servicios'},
	    { path: 'help/', component: () => import('pages/Help.vue'), name: 'help'},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
