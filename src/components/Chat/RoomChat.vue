<template>
  <div class="chat">
    <div class="title">
      <span class="left pointer" @click="goHome">返回</span>
      <span>{{ roomName }} (<span>{{ numUsers }}</span>)</span>
      <span class="right pointer">详情</span>
    </div>
    <chat-content :data="contentData"></chat-content>
    <div class="bottom">
      <input type="text" @keyup.enter="chatInputEnter" />
    </div>
  </div>
</template>

<script>
import ChatContent from './ChatContent'

export default {
  name: 'room-chat',
  components: {
    'chat-content': ChatContent,
  },
  props: {
    roomName: String,
  },
  data() {
    return {
      numUsers: 0,
      contentData: []
    }
  },
  mounted() {
    this.$socket.on('join room', (data) => {
      this.numUsers = data.numUsers;
      this.contentData.push({
        type: 'tip',
        message: `${data.username} join room`
      })
    });
    this.$socket.on('leave room', (data) => {
      this.contentData.push({
        type: 'tip',
        message: `${data.username} leave room`
      })
      this.numUsers = data.numUsers;
    });
    this.$socket.on('new message', (data) => {
      this.contentData.push({
        type: 'chat-content',
        username: data.username,
        message: data.message
      })
    });

    this.$socket.on('disconnect', () => {
      this.contentData.push({
        type: 'tip',
        message: `${this.username} have been remove chat room`
      })
    });

    this.$socket.on('reconnect', () => {
      this.contentData.push({
        type: 'tip',
        message: `${this.username} have been reconnected`
      })
    });
  },

  beforeDestroy() {
    console.log('chat room destroy');
    // remove all events listeners
    this.$socket.off();
  },
  methods: {
    goHome() {
      this.$socket.emit('leave room');
      this.$router.push('/');
    },
    chatInputEnter(e) {
      const value = e.target.value.trim();
      if (value) {
        !this.isPrivate && this.$socket.emit('new message', value);
      }
      e.target.value = '';
    },
  }
}
</script>
  
<style scoped>
  @import './style.css';
</style>
