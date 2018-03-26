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
        <div class="person" v-for="chatUser in Object.keys(privateChatContent)" :key="chatUser" @click="chatToUser(chatUser)">
          <div class="chatuser ellipsis" :title="chatUser">{{ chatUser }}</div>
          <div class="message ellipsis">{{ privateChatContent[chatUser][privateChatContent[chatUser].length - 1].message }}</div>
        </div>
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
  mounted() {
    this.$socket.on('connect', () => {
      console.log(this.$socket.id); // 'G5p5...'
    });
  },
  methods: {
    clickChatRoom(e) {
      const target = e.target;
      if(target.tagName === 'SPAN') {
        const roomName = target.innerHTML;
        this.$router.push({name: 'chat', query: {roomName}})
        this.$socket.emit('join room', {
          username: this.username,
          roomName,
        })
      }
    },
    chatToUser(chatUser) {
      this.$router.push({name: 'private-chat', query: {chatUser}});
    }
  },
  computed: mapState({
    username: 'username',
    privateChatContent(state) {
      console.log('private chat', state.private); 
      return state.private
    },
  })
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

  .person {
    padding: 10px 0;
    overflow: hidden;
  }

  .chatuser {
    font-weight: bold;
    float: left;
    width: 15%;
    padding-left: 10PX;
    box-sizing: border-box;
  }
  .message {
    color: #ccc;
    float: left;
    width: 85%;
  }
  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

</style>
