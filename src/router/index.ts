import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AboutView from '../components/Article/Contents/About/AboutView.vue';
import PortfolioView from '../components/Article/Contents/Portfolio/PortfolioView.vue';
import ContectView from '../components/Article/Contents/Contect/ContectView.vue';
import NotFoundView from '../views/NotFoundView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/renewalprofile/',
    name: 'about',
    component: AboutView
  },
  {
    path: '/renewalprofile/portfolio',
    name: 'portfolio',
    component: PortfolioView
  },
  {
    path: '/renewalprofile/*',
    name: 'notfound',
    component: NotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
