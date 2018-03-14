<template>
  <div class="chat">
    <div class="title">
      <span class="left pointer" @click="goHome">返回</span>
      <span v-if="isPrivate">{{ chatUser }}</span>
      <span v-else>{{ roomName }} (<span>{{ roomNums }}</span>)</span>
      <span v-if="!isPrivate" class="right pointer">详情</span>
    </div>
    <ul class="content" ref="content">

    </ul>
    <div class="bottom">
        <input type="text" @keyup.enter="showChatContent" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'chat',
  props: {
    isPrivate: Boolean,
    chatUser: String,
    roomName: String,
  },
  beforeCreate() {
    if(!this.$store.state.username) {
      this.$router.push({name: 'login'})
    }
  },
  data() {
    return {
      numUsers: 0
    }
  },
  mounted() {
    this.$socket.on('join room', function (data) {
      console.log('===', data);
      this.numUsers = data.numUsers;
    })
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    showChatContent(e) {
      console.log('event', e);
      const value = e.target.value.trim();
      if (value) {
        var liEl = document.createElement('li');
        liEl.classList.add('row');
        var spanEl1 = document.createElement('span');
        spanEl1.classList.add('username');
        spanEl1.innerText = this.username;
        liEl.appendChild(spanEl1);
        var spanEl2 = document.createElement('span');
        spanEl2.classList.add('messageBody');
        spanEl2.innerText = value;
        liEl.appendChild(spanEl2);
        this.$refs['content'].appendChild(liEl);
        e.target.value = '';
      }
    }
  },
  computed: {
    roomNums() {
      return this.numUsers;
    },
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

  .content {
    height: 100%;
    overflow: auto;
  }
</style>

<style>
  .row {
    overflow: hidden;
    padding: 5px 0;
  }

  .username {
    font-weight: bold;
    font-size: 16px;
    color: #4CAF50;
    width: calc(20% - 20px);
    float: left;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .messageBody {
    white-space: normal;
    word-wrap: break-word;
    width: 80%;
    float: right;
  }
</style>



