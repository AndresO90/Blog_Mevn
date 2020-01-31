import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)


const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/post/:idPost',
    name: 'post',
    component: () => import('../views/Post.vue')
  }, {
    path: '/mypost',
    name: 'post',
    component: () => import('../views/MyPost_CreatePost.vue'),
    meta: {
      requiresAuth: true
    }
 
  },
  {
    path: '/manageposts',
    name: 'manageposts',
    component: () => import('../views/ManagePost.vue'),

  },
  {
    path: '/offensivewords',
    name: 'offensivewords',
    component: () => import('../views/OffensiveWords.vue')
  },
  
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresGuest: true
    }
  }, {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      requiresGuest: true
    }
  }, {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/profile');
    } else {
      next();
    }
  } else {
    next()
  }
});



export default router;