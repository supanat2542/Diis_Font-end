const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') }
    ]
  },
  {
    path: '/map',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Map.vue') }
    ]
  },
  {
    path: '/report',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/timelineTable.vue') }
    ]
  },
  {
    path: '/register/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/install/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Install.vue') }
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/test.vue') }
    ]
  },
  {
    path: '/detail',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/detail.vue') }
    ]
  },
  {
    path: '/timeline/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: (id) => import('pages/timeline.vue') }
    ]
  },
  {
    path: '/objects/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: (id) => import('pages/objects.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
]

export default routes
