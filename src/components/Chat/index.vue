<template>
  <div class="chat">
    <div class="title">
      <span class="left pointer" @click="goHome">返回</span>
      <span v-if="isPrivate">{{ chatUser }}</span>
      <span v-else>{{ roomName }} (<span>{{ numUsers }}</span>)</span>
      <span v-if="!isPrivate" class="right pointer">详情</span>
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
  name: 'chat',
  components: {
    'chat-content': ChatContent,
  },
  props: {
    isPrivate: Boolean,
    chatUser: String,
  },
  beforeCreate() {
    if(!this.$store.state.username) {
      this.$router.push({name: 'login'})
    }
  },
  data() {
    return {
      roomName: '',
      numUsers: 0,
      contentData: []
    }
  },
  mounted() {
    this.$socket.on('join room', (data) => {
      this.numUsers = data.numUsers;
      this.roomName = data.roomName;
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
    this.$socket.on('new private message', (data) => {
      // this.showChatContent(data);
      this.contentData.push({
        type: 'chat-content',
        username: data.username,
        message: data.message
      })
    });
    this.$socket.on('new message', (data) => {
      // this.showChatContent(data);
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
        this.$socket.emit('new message', value);
        e.target.value = '';        
      }
    },
    showChatContent(data) {
      console.log('this', this);
      var liEl = document.createElement('li');
      liEl.classList.add('row');
      var spanEl1 = document.createElement('span');
      spanEl1.classList.add('username');
      spanEl1.innerText = data.username;
      liEl.appendChild(spanEl1);
      var spanEl2 = document.createElement('span');
      spanEl2.classList.add('messageBody');
      spanEl2.innerText = data.message;
      liEl.appendChild(spanEl2);
      // ref在第二次的时候失效，没找到元素，原因未知
      document.querySelector('.chat .content').appendChild(liEl);
    },
    showTip(content) {
      var liEl = document.createElement('li');
      liEl.classList.add('row');
      liEl.classList.add('tip');
      liEl.innerText = content;
      document.querySelector('.chat .content').appendChild(liEl);
    }
  },
  computed: {
    ...mapState([
      'username',
    ])
  }
}
</script>

<style scoped>
  .title {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #eae7e7;
    overflow: hidden;
  }

  .pointer {
    cursor: pointer;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .bottom input {
    padding: 5px 0;
    width: 100%;
    font-size: 16px;
    outline: 0;
    border: 0;
    border-top: 1px solid #eae7e7;
  }
</style>
