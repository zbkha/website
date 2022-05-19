import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home"
import Register from "../views/Register"
import Login from "../views/Login"
import ToDoList from "../views/ToDoList"
import Info from "../views/Info"
import GreedySnake from "../snake/GreedySnake"
import Database from '../views/Database'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/todolist',
        name: 'ToDoList',
        component: ToDoList
      },
      {
        path: '/info',
        name: 'Info',
        component: Info
      },
      {
        path: '/snake',
        name: 'GreedySnake',
        component: GreedySnake
      },
      {
        path: '/database',
        name: 'Database',
        component: Database
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router