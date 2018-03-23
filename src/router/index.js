import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/components/Home'
import Login from '@/components/Login'
import RoomChat from '@/components/Chat/RoomChat';
import PrivateChat from '@/components/Chat/PrivateChat';

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
      component: RoomChat,
      props: (route) => ({roomName: route.query.roomName}),
    },
    {
      path: '/private-chat',
      name: 'private-chat',
      component: PrivateChat,
      props: (route) => ({chatUser: route.query.chatUser}),
    },
  ]
})
