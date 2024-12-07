import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetails from '../views/event/Details.vue'
import NotFoundView from '../views/NotFoundView.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import Layout from '../views/event/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },

    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: Layout,
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetails,
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
        },
      ],
    },
    // {
    //   path: '/event/:id',
    //   // redirect: (to) => {
    //   //   return { name: 'event-details', params: { id: to.params.id } }
    //   // },
    //   redirect: () => {
    //     return { name: 'event-details' }
    //   },
    //   children: [
    //     ...needed when redirected to a nested route
    //   ]
    // },
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent }
      },
    },
    {
      path: '/:pathMatch(.*)*', // Matches any path
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

export default router
