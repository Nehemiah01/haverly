
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from "@/database"
import { onAuthStateChanged } from "firebase/auth";


import Home from '../views/Home.vue'
import ErrorPage from '../views/ErrorPage.vue'
// import Profile from '../views/Profile.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Verify from '../views/auth/Verify.vue'
import PasswordReset from '../views/auth/PasswordReset.vue'

const routes = [
  
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresNoAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresNoAuth: true,
    },
  },
  {
    path: "/password-reset",
    name: "passwordreset",
    component: PasswordReset,
    meta: {
      requiresNoAuth: true,
    },
  },
  {
    path: "/verify",
    name: "verify",
    component: Verify,
    meta: {
      requiresVerify: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },


  {
    path: '/:catchAll(.*)',
    name: 'ErrorPage',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });

router.beforeEach(async (to, from, next) => {
  let user = await getCurrentUser();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user && !user.emailVerified) {
      next("/verify");
    } else if (user) {
      next();
    } else {
      next("/login");
    }
  } else if (to.matched.some((record) => record.meta.requiresNoAuth)) {
    if (!user) {
      next();
    } 
    else {
      next("/");
    }
  } else if (to.matched.some((record) => record.meta.requiresVerify)) {
    if (user && !user.emailVerified) {
      next();
    } 
    else if (user) {
      next('/')
    }
    else {
      next("/login");
    }
  } else {
    console.log("else");
    if (user && !user.emailVerified) {
      next("/verify");
    } else {
      next();
    }
  }
});


export default router
