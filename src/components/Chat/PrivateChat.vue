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
  data() {
    return {
      contentData: []
    }
  },
  mounted() {
    this.$socket.on('new private message', (data) => {
      console.log('private message');
      this.contentData.push({
        type: 'chat-content',
        username: data.username,
        message: data.message
      })
    });
  },

  beforeDestroy() {
    console.log('private chat destroy');
    // remove all events listeners
    this.$socket.off();
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
  }
}
</script>
  
<style scoped>
  @import './style.css';
</style>
