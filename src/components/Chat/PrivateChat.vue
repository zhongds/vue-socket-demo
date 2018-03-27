<template>
  <div class="chat">
    <div class="title">
      <span class="left pointer" @click="goHome">返回</span>
      <span>{{ chatUser }}</span>
    </div>
    <chat-content :data="contentData" :username="username" :isPrivate="true"></chat-content>
    <div class="bottom">
      <input type="text" @keyup.enter="chatInputEnter" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChatContent from './ChatContent'
import { addPrivateMessage } from '@/socket'

export default {
  name: 'private-chat',
  components: {
    'chat-content': ChatContent,
  },
  props: {
    chatUser: String,
  },
  beforeCreate() {
    if(!this.$store.state.username) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    chatInputEnter(e) {
      const value = e.target.value.trim();
      if (value) {
        const data = {
          chatUser: this.chatUser,
          username: this.username,
          message: value
        };
        this.$socket.emit('new private message', data);
        addPrivateMessage(data);
      }
      e.target.value = '';
    },
  },
  computed: {
    ...mapState({
      username: 'username',
      contentData(state) {
        return state.private[this.chatUser] || []
      }
    })
  }
}
</script>
  
<style scoped>
  @import './style.css';
</style>
