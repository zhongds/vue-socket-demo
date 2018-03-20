<template>
  <div class="home">
    <header>欢迎您, <span>{{ username }}</span></header>
    <div class="content">
      <div class="rooms">
        <div class="title">房间</div>
        <div class="chat-rooms" @click.stop.prevent="clickChatRoom">
          <span name="1">聊天室1</span>
          <span name="2">聊天室2</span>
          <span name="3">聊天室3</span>
        </div>
      </div>
      <div class="private-chat">

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  beforeCreate() {
    if(!this.$store.state.username) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    clickChatRoom(e) {
      const target = e.target;
      if(target.tagName === 'SPAN') {
        const roomName = target.innerHTML;
        this.$router.push({name: 'chat'})
        this.$socket.emit('join room', {
          username: this.username,
          roomName,
        })
      }
    }
  },
  computed: mapState([
    'username',
  ])
}
</script>

<style scoped>
  .home {
    height: 100%;
  }
  header {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #eae7e7;
    overflow: hidden;
  }

  .content {
    height: calc(100% - 42px);
  }

  .rooms {
    padding-bottom: 10px;
    border-bottom: 1px solid #eae7e7;
  }

  .title {
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    display: block;
  }

  .chat-rooms span {
    color: #00BCD4;
    margin: 15px;
    cursor: pointer;
  }

  .private-chat {
    height: calc(100% - 80px);
    width: 100%;
    overflow: auto;
  }
</style>
