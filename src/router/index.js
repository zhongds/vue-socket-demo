import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      props: (route) => ({isPrivate: false, roomName: route.query.roomName}),
    },
    {
      path: '/private-chat',
      name: 'private-chat',
      component: Chat,
      props: (route) => ({isPrivate: true, chatUser: route.query.chatUser}),
    },
  ]
})
