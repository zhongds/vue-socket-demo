<template>
  <div class="chat">
    <div class="title">
      <span class="left pointer" @click="goHome">返回</span>
      <span>{{ roomName }} (<span>{{ roomData.numUsers || 0 }}</span>)</span>
      <span class="right pointer">详情</span>
    </div>
    <chat-content :data="roomData.data || []" :username="username" :isPrivate="false"></chat-content>
    <div class="bottom">
      <input type="text" @keyup.enter="chatInputEnter" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChatContent from './ChatContent'

export default {
  name: 'room-chat',
  components: {
    'chat-content': ChatContent,
  },
  props: {
    roomName: String,
  },
  beforeCreate() {
    if(!this.$store.state.username) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    goHome() {
      this.$socket.emit('leave room');
      // 离开房间后删除聊天记录
      // this.$store.commit('deletePublicMessage', this.roomName);
      this.$router.push('/');
    },
    chatInputEnter(e) {
      const value = e.target.value.trim();
      if (value) {
        this.$socket.emit('new message', value);
      }
      e.target.value = '';
    },
  },
  computed: {
    ...mapState({
      username: state => {
        return state.username
      },
      roomData(state) {
        console.log('============room chat');
        return state.public[this.roomName] || {}
      }
    })
  }
}
</script>
  
<style scoped>
  @import './style.css';
</style>
