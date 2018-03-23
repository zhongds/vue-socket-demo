<template>
  <div class="private-chat">
    <div class="title">
      <span class="left pointer" @click="goHome">返回</span>
      <span>{{ chatUser }}</span>
    </div>
    <chat-content :data="contentData"></chat-content>
    <div class="bottom">
      <input type="text" @keyup.enter="chatInputEnter" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChatContent from './ChatContent'

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
        this.$socket.emit('new private message', {
          chatUser: this.chatUser,
          username: this.username,
          message: value
        });
      }
      e.target.value = '';
    },
  },
  computed: {
    ...mapState({
      username: state => state.username,
      contentData: state => state.private[this.chatUser] || []
    })
  }
}
</script>
  
<style scoped>
  @import './style.css';
</style>
