// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/store/user";

const routes = [
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
  {
    path: '/journal',
    name: 'journal',
    component: () => import( '@/views/VisitLogs.vue'),
  },
  { path: '/:pathMatch(.*)*', component: () => import( '@/views/PageNotFound.vue'), }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useUserStore();

  if (authRequired && !auth.user) {
      auth.returnUrl = to.fullPath;
      return '/login';
  }
});
export default router
