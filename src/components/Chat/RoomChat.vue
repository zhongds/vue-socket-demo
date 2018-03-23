<template>
  <div class="chat">
    <div class="title">
      <span class="left pointer" @click="goHome">{{username}}</span>
      <span>{{ roomName }} (<span>{{ roomData && roomData.numUsers || 0 }}</span>)</span>
      <span class="right pointer" @click="test">详情</span>
    </div>
    <chat-content :data="roomData && roomData.data || []"></chat-content>
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
      this.$router.push('/');
    },
    chatInputEnter(e) {
      const value = e.target.value.trim();
      if (value) {
        this.$socket.emit('new message', value);
      }
      e.target.value = '';
    },
    test() {
      // this.$socket.emit('new message', {
      //   roomName: 'ttttttttt', 
      //   message: 'just test', 
      //   username: '11111'
      // });
      // this.$store.commit('addPublicMessage', {
      //   roomName: '11112321',
      //   numUsers: 10,
      //   data:{
      //     tt: 'sfaa'
      //   }
      // })
      // this.$store.commit('changePublic');
      // this.$store.commit('setUsername', {name: '123'});
    }
  },
  computed: {
    ...mapState({
      username: state => {
        console.log('change username');
        return state.username
      },
      roomData(state) {
        console.log('this', this);
        console.log('roomName', this.roomName);
        console.log('data', state.public);
        console.log('state', state);
        return state.public && state.public[this.roomName]
      }
    })
  }
}
</script>
  
<style scoped>
  @import './style.css';
</style>
