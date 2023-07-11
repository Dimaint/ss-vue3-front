// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/layouts/Default.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  //     },
  //     {
  //       path: '/employee',
  //       name: 'Employee',
  //       component: () => import( '@/views/Employee.vue'),
  //     },
  //   ],
  // },
  {
    path: '/',
    component: () => import( '@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/Login.vue'),
  },
  {
    path: '/employee',
    name: 'Employee',
    component: () => import( '@/views/Employee.vue'),
  },
  {
    path: '/employee/:id',
    name: 'EmployeeCard',
    component: () => import( '@/views/EmployeeCard.vue'),
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import( '@/views/Clients.vue'),
  },
  {
    path: '/client/:id',
    name: 'ClientCard',
    component: () => import( '@/views/ClientCard.vue'),
  },
  { path: '/:pathMatch(.*)*', component: () => import( '@/views/PageNotFound.vue'), }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
